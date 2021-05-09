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

export const Goals = () => {
  const [goals, setGoals] = useState([]);

  const history = useHistory();

  const currentUser = JSON.parse(sessionStorage.getItem("bookworm_user"));

  const getUserGoals = (currentUser) => {
    return getGoalByUser(currentUser).then((goalsFromAPI) => {
      setGoals(goalsFromAPI);
    });
  };

  //delete goals button
  const handleDeleteGoal = (id) => {
    deleteGoal(id).then(() => getGoalByUser().then(setGoals));
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
    updateGoal(completeGoal).then(() => getGoalByUser().then(setGoals));
  };

  useEffect(() => {
    getUserGoals(currentUser);
  }, [currentUser]);

  return (
    <>
      {goals.length > 0 ? (
        <div className="goalContainer-Cards">
          {goals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              handleCompleteGoal={handleCompleteGoal}
              handleDeleteGoal={handleDeleteGoal}
            />
          ))}
        </div>
      ) : (
        <NoGoalCard />
      )}
      <section className="goalSection-content">
        <button
          type="button"
          className="btn"
          onClick={() => {
            history.push("/goals/create");
          }}
        >
          +goal
        </button>
      </section>
    </>
  );
};
