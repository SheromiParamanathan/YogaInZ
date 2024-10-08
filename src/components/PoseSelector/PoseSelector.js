// src/components/PoseSelector/PoseSelector.js
import React from "react";
import "./PoseSelector.css"; // Ensure this CSS file exists for styling

// Step 1: Define the mapping from English to Sanskrit names
const poseNames = {
  Tree: "Vrksasana",
  Chair: "Utkatasana",
  Cobra: "Bhujangasana",
  Warrior: "Virabhadrasana",
  Dog: "Adho Mukha Svanasana",
  Shoulderstand: "Sarvangasana",
  Triangle: "Trikonasana",
};

const PoseSelector = ({ poseList, currentPose, setCurrentPose }) => {
  return (
    <div className="pose-selector">
      {poseList.map((pose) => (
        <button
          key={pose}
          className={`pose-button ${currentPose === pose ? "active" : ""}`}
          onClick={() => setCurrentPose(pose)}
        >
          {/* Step 2: Display the Sanskrit name */}
          {poseNames[pose] || pose}
        </button>
      ))}
    </div>
  );
};

export default PoseSelector;
