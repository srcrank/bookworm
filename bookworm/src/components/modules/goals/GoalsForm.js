//Creating goals on this module with a form. 

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { addGoal } from '../../../data/GoalManager';
import { getAllUsers } from '../../../data/UserManager';
import { getAllGoals } from '../../../data/GoalManager';

export const GoalForm = () => {
    const currentUser = JSON.parse(sessionStorage.getItem("bookworm_user"))
    const [goal, setGoals] = useState({
        name: "",
        description: "",
        completion: "",
        isCompleted: false,
        userId: currentUser
    });


    const [isLoading, setIsLoading] = useState(false);
    const [users,  setUsers] = useState([]);

    const history = useHistory();

    const handleControlledInputChange = (event) => {
        const newGoal = { ...goal }
        let selectedVal = event.target.value
        if (event.target.id.includes("Id")) {
            selectedVal = parseInt(selectedVal)
        }
        newGoal[event.target.id] = selectedVal
            setGoals(newGoal)
    }

    useEffect(() => {
        getAllUsers()
            .then(usersFromAPI => {
                setUsers(usersFromAPI)
        });
        setIsLoading(false)
}, []);

    const handleClickSaveTask = (event) => {
        event.preventDefault()

        const userId = goal.userId

        if (userId === 0 ) {
            window.alert("Please select an user")
        }
        else {
            addGoal(goal)
                .then(() => history.push("/")) //! Something Here
        }
    }

    return (
        <form className="goalForm">
            <h2 className="goalForm_title">Add New Goal</h2>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="name"> Name?? </label>
                    <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Goal" value={goal.name} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" id="description" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Description" value={goal.description} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="completion">Completion: </label>
                    <input type="date" id="completion" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Goal Date" value={goal.completion} />
                </div>
            </fieldset>

            {/* <fieldset>
                <div className="form-group">
                    <label htmlFor="user">Posted By: </label>
                    <select value={task.userId} name="userId" id="userId" onChange={handleControlledInputChange} className="form-control">
                        <option value="0">Select User</option>
                        {users.map(u => (
                            <option key={u.id} value={u.id}>
                                {u.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset> */}

            <button className="btn btn-primary"
                onClick={handleClickSaveTask} disabled={isLoading}>
                Save Goal
            </button>
        </form>
    )
}