export const poseInstructions = {
  Tree: [
    "Stand tall and place one foot on the inner thigh of your opposite leg. Bring your hands together at your chest or raise them overhead, balancing on one leg.",
  ],
  Cobra: [
    "Lie face down, legs extended. Place your hands under your shoulders and gently lift your chest using your back muscles. Keep your elbows slightly bent.",
  ],
  Dog: [
    "Start on all fours. Lift your hips up and back, forming an inverted V-shape. Press your heels toward the ground and lengthen your spine.",
  ],
  Chair: [
    "Stand tall, feet together. Bend your knees as if sitting in a chair, keeping your arms raised and back straight. Hold for a few breaths.",
  ],
  Warrior: [
    "Step one foot forward into a lunge, with the back foot at an angle. Extend your arms overhead or out to the sides and bend the front knee.",
  ],
  Traingle: [
    "Stand with your feet wide apart. Extend your arms and lean sideways, placing one hand near your ankle while reaching the other arm up. Keep your chest open.",
  ],
  Shoulderstand: [
    "Lie on your back and lift your legs overhead. Use your hands to support your lower back and aim to align your legs vertically.",
  ],
};

export const poseAdvantages = {
  Tree: [
    "Enhances balance, concentration, and posture. Strengthens the legs, thighs, and spine. Can improve mental focus and is calming for the mind.",
  ],
  Cobra: [
    "Strengthens the spine, improves posture, and helps alleviate stress and fatigue. It also opens up the chest and lungs, which can be beneficial for breathing.",
  ],
  Dog: [
    "Stretches the hamstrings, calves, and spine. Strengthens the arms and legs, improves circulation, and calms the mind. It is also known to relieve back pain.",
  ],
  Chair: [
    "Strengthens the legs, ankles, and core. Enhances stability and stamina, and helps improve focus.",
  ],
  Warrior: [
    "Strengthens the legs, arms, and core. Increases stamina and endurance, and improves focus and balance.",
  ],
  Traingle: [
    "Stretches and strengthens the legs, knees, and ankles. Opens the chest and shoulders and can aid in digestion. Helps relieve stress and anxiety.",
  ],
  Shoulderstand: [
    "Improves blood circulation, strengthens the shoulders and neck, and helps calm the mind. Often used to relieve symptoms of anxiety and insomnia.",
  ],
};

export const poseDescriptions = {
  Tree: [
    "Enhances balance, concentration, and posture. Strengthens the legs, thighs, and spine. Can improve mental focus and is calming for the mind.",
  ],
  Cobra: [
    "Strengthens the spine, improves posture, and helps alleviate stress and fatigue. It also opens up the chest and lungs, which can be beneficial for breathing.",
  ],
  Dog: [
    "Stretches the hamstrings, calves, and spine. Strengthens the arms and legs, improves circulation, and calms the mind. It is also known to relieve back pain.",
  ],
  Chair: [
    "Strengthens the legs, ankles, and core. Enhances stability and stamina, and helps improve focus.",
  ],
  Warrior: [
    "Strengthens the legs, arms, and core. Increases stamina and endurance, and improves focus and balance.",
  ],
  Traingle: [
    "Stretches and strengthens the legs, knees, and ankles. Opens the chest and shoulders and can aid in digestion. Helps relieve stress and anxiety.",
  ],
  Shoulderstand: [
    "Improves blood circulation, strengthens the shoulders and neck, and helps calm the mind. Often used to relieve symptoms of anxiety and insomnia.",
  ],
};

export const POINTS = {
  NOSE: 0,
  LEFT_EYE: 1,
  RIGHT_EYE: 2,
  LEFT_EAR: 3,
  RIGHT_EAR: 4,
  LEFT_SHOULDER: 5,
  RIGHT_SHOULDER: 6,
  LEFT_ELBOW: 7,
  RIGHT_ELBOW: 8,
  LEFT_WRIST: 9,
  RIGHT_WRIST: 10,
  LEFT_HIP: 11,
  RIGHT_HIP: 12,
  LEFT_KNEE: 13,
  RIGHT_KNEE: 14,
  LEFT_ANKLE: 15,
  RIGHT_ANKLE: 16,
};

export const keypointConnections = {
  nose: ["left_ear", "right_ear"],
  left_ear: ["left_shoulder"],
  right_ear: ["right_shoulder"],
  left_shoulder: ["right_shoulder", "left_elbow", "left_hip"],
  right_shoulder: ["right_elbow", "right_hip"],
  left_elbow: ["left_wrist"],
  right_elbow: ["right_wrist"],
  left_hip: ["left_knee", "right_hip"],
  right_hip: ["right_knee"],
  left_knee: ["left_ankle"],
  right_knee: ["right_ankle"],
};
