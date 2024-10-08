import React, { useState } from "react";

import { poseDescriptions } from "../../utils/data";

import "./Descriptions.css";

export default function Descriptions({ currentPose }) {
  const [descriptions, setDescriptions] = useState(poseDescriptions);

  return (
    <div>
      <h4>Descriptions</h4>
      <div className="descriptions-container">
        <ul className="descriptions-list">
          {descriptions[currentPose].map((description) => {
            return <li className="description">{description}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}
