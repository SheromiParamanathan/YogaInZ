import React, { useState } from "react";

import { poseInstructions } from "../../utils/data";

import "./Instructions.css";

export default function Instructions({ currentPose }) {
  const [instructions, setInsntructions] = useState(poseInstructions);

  return (
    <div>
      <h4>Instructions</h4>
      <div className="instructions-container">
        <ul className="instructions-list">
          {instructions[currentPose].map((instruction) => {
            return <li className="instruction">{instruction}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}
