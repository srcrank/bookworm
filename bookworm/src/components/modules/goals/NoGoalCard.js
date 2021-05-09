//No goal? no problem. 

import React from "react";
import "./Goals.css";

export const NoGoalCard = () => {

    return (
        <div className="noGoal-card">
          <p>You have no goals yet. </p>
          <p>Click "+goal" to get started!</p>
        </div>
      );
};
