// src/pages/Yoga/Yoga.js
import * as poseDetection from "@tensorflow-models/pose-detection";
import * as tf from "@tensorflow/tfjs";
import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import Advantages from "../../components/Advantages/Advantages";
import AppBar from "../../components/AppBar/AppBar";
import Descriptions from "../../components/Descriptions/Descriptions";
import Instructions from "../../components/Instrctions/Instructions";
import PoseSelector from "../../components/PoseSelector/PoseSelector";
import { POINTS, keypointConnections } from "../../utils/data";
import { drawPoint, drawSegment } from "../../utils/helper";
import { count } from "../../utils/music";
import { poseImages } from "../../utils/pose_images";
import "./Yoga.css";

let skeletonColor = "rgb(255,255,255)";
let poseList = [
  "Tree",
  "Chair",
  "Cobra",
  "Warrior",
  "Dog",
  "Shoulderstand",
  "Triangle",
];

let interval;
let flag = false;

function Yoga() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [startingTime, setStartingTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [poseTime, setPoseTime] = useState(0);
  const [bestPerform, setBestPerform] = useState(0);
  const [currentPose, setCurrentPose] = useState("Tree");
  const [isStartPose, setIsStartPose] = useState(false);

  useEffect(() => {
    const timeDiff = (currentTime - startingTime) / 1000;
    if (flag) {
      setPoseTime(timeDiff);
    }
    if (timeDiff > bestPerform) {
      setBestPerform(timeDiff);
    }
  }, [currentTime]);

  useEffect(() => {
    setCurrentTime(0);
    setPoseTime(0);
    setBestPerform(0);
  }, [currentPose]);

  const CLASS_NO = {
    Chair: 0,
    Cobra: 1,
    Dog: 2,
    No_Pose: 3,
    Shoulderstand: 4,
    Triangle: 5,
    Tree: 6,
    Warrior: 7,
  };

  function get_center_point(landmarks, left_bodypart, right_bodypart) {
    let left = tf.gather(landmarks, left_bodypart, 1);
    let right = tf.gather(landmarks, right_bodypart, 1);
    const center = tf.add(tf.mul(left, 0.5), tf.mul(right, 0.5));
    return center;
  }

  function get_pose_size(landmarks, torso_size_multiplier = 2.5) {
    let hips_center = get_center_point(
      landmarks,
      POINTS.LEFT_HIP,
      POINTS.RIGHT_HIP
    );
    let shoulders_center = get_center_point(
      landmarks,
      POINTS.LEFT_SHOULDER,
      POINTS.RIGHT_SHOULDER
    );
    let torso_size = tf.norm(tf.sub(shoulders_center, hips_center));
    let pose_center_new = get_center_point(
      landmarks,
      POINTS.LEFT_HIP,
      POINTS.RIGHT_HIP
    );
    pose_center_new = tf.expandDims(pose_center_new, 1);

    pose_center_new = tf.broadcastTo(pose_center_new, [1, 17, 2]);
    let d = tf.gather(tf.sub(landmarks, pose_center_new), 0, 0);
    let max_dist = tf.max(tf.norm(d, "euclidean", 0));

    let pose_size = tf.maximum(
      tf.mul(torso_size, torso_size_multiplier),
      max_dist
    );
    return pose_size;
  }

  function normalize_pose_landmarks(landmarks) {
    let pose_center = get_center_point(
      landmarks,
      POINTS.LEFT_HIP,
      POINTS.RIGHT_HIP
    );
    pose_center = tf.expandDims(pose_center, 1);
    pose_center = tf.broadcastTo(pose_center, [1, 17, 2]);
    landmarks = tf.sub(landmarks, pose_center);

    let pose_size = get_pose_size(landmarks);
    landmarks = tf.div(landmarks, pose_size);
    return landmarks;
  }

  function landmarks_to_embedding(landmarks) {
    landmarks = normalize_pose_landmarks(tf.expandDims(landmarks, 0));
    let embedding = tf.reshape(landmarks, [1, 34]);
    return embedding;
  }

  const runMovenet = async () => {
    const detectorConfig = {
      modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER,
    };
    const detector = await poseDetection.createDetector(
      poseDetection.SupportedModels.MoveNet,
      detectorConfig
    );
    const poseClassifier = await tf.loadLayersModel(
      "https://models.s3.jp-tok.cloud-object-storage.appdomain.cloud/model.json"
    );
    const countAudio = new Audio(count);
    countAudio.loop = true;
    interval = setInterval(() => {
      detectPose(detector, poseClassifier, countAudio);
    }, 100);
  };

  const detectPose = async (detector, poseClassifier, countAudio) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      let notDetected = 0;
      const video = webcamRef.current.video;
      const pose = await detector.estimatePoses(video);
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      try {
        const keypoints = pose[0].keypoints;
        let input = keypoints.map((keypoint) => {
          if (keypoint.score > 0.4) {
            if (
              !(keypoint.name === "left_eye" || keypoint.name === "right_eye")
            ) {
              drawPoint(ctx, keypoint.x, keypoint.y, 8, "rgb(255,255,255)");
              let connections = keypointConnections[keypoint.name];
              try {
                connections.forEach((connection) => {
                  let conName = connection.toUpperCase();
                  drawSegment(
                    ctx,
                    [keypoint.x, keypoint.y],
                    [
                      keypoints[POINTS[conName]].x,
                      keypoints[POINTS[conName]].y,
                    ],
                    skeletonColor
                  );
                });
              } catch (err) {}
            }
          } else {
            notDetected += 1;
          }
          return [keypoint.x, keypoint.y];
        });
        if (notDetected > 4) {
          skeletonColor = "rgb(255,255,255)";
          return;
        }
        const processedInput = landmarks_to_embedding(input);
        const classification = poseClassifier.predict(processedInput);

        classification.array().then((data) => {
          const classNo = CLASS_NO[currentPose];
          console.log(data[0][classNo]);
          if (data[0][classNo] > 0.97) {
            if (!flag) {
              countAudio.play();
              setStartingTime(new Date(Date()).getTime());
              flag = true;
            }
            setCurrentTime(new Date(Date()).getTime());
            skeletonColor = "rgb(0,255,0)";
          } else {
            flag = false;
            skeletonColor = "rgb(255,255,255)";
            countAudio.pause();
            countAudio.currentTime = 0;
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  function startYoga() {
    setIsStartPose(true);
    runMovenet();
  }

  function stopPose() {
    setIsStartPose(false);
    clearInterval(interval);
  }
  const username = "Sheromi";
  const handleLogout = () => {
    // Navigate to the login page (update with your navigation logic)
    window.location.href = "/"; // Example navigation
  };

  if (isStartPose) {
    return (
      <div>
        <AppBar username={username} onLogout={handleLogout} />{" "}
        <div className="yoga-container">
          {/* Include the AppBar here */}
          <div className="performance-container">
            <div className="pose-performance">
              <h4>Pose Time: {poseTime.toFixed(2)} s</h4>
            </div>
            <div className="pose-performance">
              <h4>Best: {bestPerform.toFixed(2)} s</h4>
            </div>
          </div>
          <div className="webcam-canvas-container">
            <Webcam
              width="640px"
              height="480px"
              ref={webcamRef}
              className="webcam"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                padding: "0px",
              }}
            />
            <canvas
              ref={canvasRef}
              width="640px"
              height="480px"
              className="canvas"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
              }}
            ></canvas>
          </div>
          <div>
            <img
              src={poseImages[currentPose]}
              alt={currentPose}
              className="pose-img"
            />
          </div>
          <button onClick={stopPose} className="secondary-btn">
            Stop Pose
          </button>
          <Descriptions currentPose={currentPose} />
          <Instructions currentPose={currentPose} />
          <Advantages currentPose={currentPose} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <AppBar username={username} onLogout={handleLogout} />{" "}
      <div className="yoga-container">
        {/* Include the AppBar here */}
        <h2>Select Your Pose</h2>
        <PoseSelector
          poseList={poseList}
          currentPose={currentPose}
          setCurrentPose={setCurrentPose}
        />
        {/* <Instructions /> */}
        <div>
          <img
            src={poseImages[currentPose]}
            alt={currentPose}
            className="pose-img"
          />
        </div>
        <button onClick={startYoga} className="primary-btn">
          Start
        </button>
      </div>
    </div>
  );
}

export default Yoga;
