import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { updateGoal, getGoalById } from "../../../data/GoalManager";
import { getAllGoals } from "../../../data/GoalManager";
import { getAllUsers } from "../../../data/UserManager";
import "./GoalEditForm.css";

export const GoalEditForm = () => {
  const [goal, setGoal] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { goalId } = useParams();
  const history = useHistory();

  const [users, setUsers] = useState([]);

  const handleFieldChange = (evt) => {
    const stateToChange = { ...goal };
    let selectedVal = evt.target.value;
    if (evt.target.id.includes("Id")) {
      selectedVal = parseInt(selectedVal);
    }
    // look in the animal object copy and find the id of the key we are looking for
    stateToChange[evt.target.id] = selectedVal;
    setGoal(stateToChange);
  };

  const updateExistingGoal = (evt) => {
    evt.preventDefault();
    setIsLoading(true);

    // This is an edit, so we need the id
    const editedGoal = {
      id: goalId,
      name: goal.name,
      description: goal.description,
      completion: goal.completion,
      userId: goal.userId,
      isCompleted: false,
    };

    const userId = goal.userId;

    if (userId === 0) {
      window.alert("Please fill out all fields");
    } else {
      updateGoal(editedGoal).then(
        () => history.push("/") //! Something Here
      );
    }
  };

  useEffect(() => {
    getGoalById(goalId).then((goal) => {
      setGoal(goal);
      setIsLoading(false);
    });
  }, [goalId]);

  useEffect(() => {
    getAllUsers().then((usersFromAPI) => {
      setUsers(usersFromAPI);
    });
  }, []);

  return (
    <>
      <form className="goalForm">
      <h2 className="goalForm_title">Edit your Goal</h2>
            <div className="goalForm-style">
        <fieldset>
          <div className="formgrid">
            <label htmlFor="name">Goal Name:</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={handleFieldChange}
              id="name"
              value={goal.name}
            />

            <label htmlFor="description">Notes:</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={handleFieldChange}
              id="description"
              value={goal.description}
            />

            {/* DATE EDITING */}
            <label htmlFor="completion">Completion Goal</label>
            <input
              type="date"
              required
              className="form-control"
              onChange={handleFieldChange}
              id="completion"
              value={goal.completion}
            />

            {/* <select
              value={task.userId}
              name="userId"
              id="userId"
              onChange={handleFieldChange}
              className="form-control" >
              <option value="0">Select a user</option>
              {users.map(u => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
            <label htmlFor="user">Task Posted By: </label> */}
          </div>
          <div className="goalFormButton-container">
            <button
              type="button"
              disabled={isLoading}
              onClick={updateExistingGoal}
              className="editGoal-button"
            >
              Save
            </button>
          </div>
        </fieldset>
        </div>
      </form>
    </>
  );
};
