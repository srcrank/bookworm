//these are how the goals will be displayed on the page. Each card will hold the goal information.

import React from "react";
import "./GoalCard.css";
import { useHistory } from "react-router-dom";

export const GoalCard = ({ goal, handleDeleteGoal, handleCompleteGoal }) => {
  const currentUser = JSON.parse(sessionStorage.getItem("bookworm_user"));

  const history = useHistory();
  return (
    <div className="goal-card">
      <div className="goalCard-content">
        <h3>
          <span className="goalCard-Name">{goal.name}</span>
        </h3>
        <p className="goalCard-Description">Notes: {goal.description}</p>
        {goal.isCompleted === true ? (
          ""
        ) : (
          <p>Completion Goal: {goal.completion}</p>
        )}
      </div>
      <div className="goalButton-container">
        {goal.userId === currentUser && goal.isCompleted === false ? (
          <button
            className="goal-button"
            type="button"
            onClick={() => history.push(`/goals/${goal.id}/edit`)}
          >
            <div className="tooltip">
            <span class="tooltiptext-Edit">Edit</span>
            <i className="fas fa-pen"></i>
            </div>
          </button>
        ) : (
          ""
        )}
        {goal.userId === currentUser ? (
          <button
            className="goal-button"
            type="button"
            onClick={() => handleDeleteGoal(goal.id)}
          >
            <div className="tooltip">
            <span class="tooltiptext-Del">Delete</span>
            <i className="fas fa-trash-alt"></i>
            </div>
          </button>
        ) : (
          ""
        )}
        {goal.userId === currentUser && goal.isCompleted === false ? (
          <button
            className="goal-button"
            type="button"
            onClick={() => handleCompleteGoal(goal)}
          >
            <div className="tooltip">
            <span className="tooltiptext-Complete">Complete</span>
            <i class="fas fa-check"></i>
            </div>
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
