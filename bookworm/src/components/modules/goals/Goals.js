//this module will render all of the user's goals onto one page.

import React, { useState, useEffect } from "react";
import { GoalCard } from "./GoalCard";
import { NoGoalCard } from "./NoGoalCard";
import {
  deleteGoal,
  getAllGoals,
  getGoalByUser,
  updateGoal,
} from "../../../data/GoalManager";
import { useHistory } from "react-router-dom";
import "./Goals.css";

export const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [completedGoals, setcompletedGoals] = useState([]);
  const [notCompletedGoals, setnotCompletedGoals] = useState([]);

  const history = useHistory();

  const currentUser = JSON.parse(sessionStorage.getItem("bookworm_user"));

  const getUserGoals = (currentUser) => {
    const completeGoals = [];
    const incompleteGoals = [];
    return getGoalByUser(currentUser).then((goalsFromAPI) => {
      goalsFromAPI.forEach((goal) => {
        if (goal.isCompleted) {
          completeGoals.push(goal);
        } else {
          incompleteGoals.push(goal);
        }
      });
      setcompletedGoals(completeGoals);
      setnotCompletedGoals(incompleteGoals);
      setGoals(goalsFromAPI);
    });
  };

  //delete goals button
  const handleDeleteGoal = (id) => {
    deleteGoal(id).then(() => getUserGoals(currentUser));
  };

  //switch goal from incomplete to complete. Is this where I might be able to push the goals to a separate tab for completed goals?
  const handleCompleteGoal = (goal) => {
    let incompleteGoal = { ...goal };
    const completeGoal = {
      id: incompleteGoal.id,
      userId: currentUser,
      name: incompleteGoal.name,
      description: incompleteGoal.description,
      completion: incompleteGoal.completion,
      isCompleted: true,
    };
    updateGoal(completeGoal).then(() => getUserGoals(currentUser));
  };

  useEffect(() => {
    getUserGoals(currentUser);
  }, [currentUser]);

  return (
    <>
      <section className="goalSection-content">
        <button
          type="button"
          className="goal-button"
          onClick={() => {
            history.push("/goals/create");
          }}
        >
          + add goal
        </button>
      </section>
      {goals.length > 0 ? ( 
        <div className="goalCard-Section"> 
          <div className="goalContainer-Cards">
            {completedGoals.map((completeGoal) => (
              <GoalCard
                key={completeGoal.id}
                goal={completeGoal}
                handleDeleteGoal={handleDeleteGoal}
              />
            ))}
          </div>
          <div className="goalIncompleteContainer-Cards">
            {notCompletedGoals.map((incompleteGoal) => (
              <GoalCard
                key={incompleteGoal.id}
                goal={incompleteGoal}
                handleCompleteGoal={handleCompleteGoal}
                handleDeleteGoal={handleDeleteGoal}
              />
            ))}
          </div>
        </div>
      ) : (
        <NoGoalCard />
      )} 


    </>
  );
};
