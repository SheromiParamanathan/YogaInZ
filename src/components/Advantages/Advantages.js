import React, { useState } from "react";

import { poseAdvantages } from "../../utils/data";

import "./Advantages.css";

export default function Advantages({ currentPose }) {
  const [advantages, setAdvantages] = useState(poseAdvantages);

  return (
    <div>
      <h4>Advantages</h4>
      <div className="advantages-container">
        <ul className="advantages-list">
          {advantages[currentPose].map((instruction) => {
            return <li className="advantage">{instruction}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}
