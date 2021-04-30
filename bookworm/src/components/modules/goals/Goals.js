//this module will render all of the user's goals onto one page. 

import React, { useState, useEffect } from 'react';
import { GoalCard } from './GoalCard'
import { deleteGoal, getAllGoals, updateGoal } from '../../../data/GoalManager'
import { useHistory } from 'react-router-dom'

export const Goals = () => {
    const [Goals, setGoals] = useState([]);

    const history = useHistory();

    const currentUser = JSON.parse(sessionStorage.getItem("bookworm_user"))

    const getGoals = () => {
        return getAllGoals()
            .then(goalsFromAPI => {
                setGoals(goalsFromAPI)
            });
    };

    const handleDeleteGoal = (id) => {
        deleteGoal(id)
            .then(() => getAllGoals().then(setGoals))
    };

    const handleCompleteGoal = (goal => {
        let incompleteGoal = {...goal}
        const completeGoal = {
            id: incompleteGoal.id,
            userId: currentUser,
            name: incompleteGoal.name,
            description: incompleteGoal.description,
            completion: incompleteGoal.completion,
            isCompleted: true
        }
        updateGoal(completeGoal).then(()=> getAllGoals().then(setGoals))
    })

    useEffect(()=> {
        getGoals();
    }, []);

    return (
        <>
            <div className="goalContainer-Cards">
                {Goals.map(goal => 
                    <GoalCard key={goal.id} goal={goal} handleCompleteGoal={handleCompleteGoal} handleDeleteGoal={handleDeleteGoal} 
                    />)}
            </div>
            <section className="goalSection-content">
                <button type="button" className="btn" onClick={() => { history.push("/goals/create") }}>
                    +goal
                </button>
            </section>
        </>
    )
}