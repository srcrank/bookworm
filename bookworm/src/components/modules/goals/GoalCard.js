//these are how the goals will be displayed on the page. Each card will hold the goal information.

import React from "react";
import "./Goals.css";
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
        <p>Notes: {goal.description}</p>
        {goal.isCompleted === true ? (
          ""
        ) : (
          <p>Completion Goal: {goal.completion}</p>
        )}
        {goal.userId === currentUser && goal.isCompleted === false ? (
          <button
            type="button"
            onClick={() => history.push(`/goals/${goal.id}/edit`)}
          >
            {" "}
            ~ edit{" "}
          </button>
        ) : (
          ""
        )}
        {goal.userId === currentUser ? (
          <button type="button" onClick={() => handleDeleteGoal(goal.id)}>
            {" "}
            - delete
          </button>
        ) : (
          ""
        )}
        {goal.userId === currentUser && goal.isCompleted === false ? (
          <button type="button" onClick={() => handleCompleteGoal(goal)}>
            Complete
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
