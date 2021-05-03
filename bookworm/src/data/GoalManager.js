const remoteURL = "http://localhost:8088"

export const getGoalById = (id) => {
    return fetch (`${remoteURL}/goals/${id}?_expand=user`)
    .then(res => res.json())
}

export const getAllGoals = () => {
    return fetch (`${remoteURL}/goals?_expand=user`)
    .then(res => res.json())
}

export const addGoal = (newGoals) => {
    return fetch(`${remoteURL}/goals/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newGoals)
    }).then(response => response.json())
}

export const updateGoal = (editedGoal) =>{
    return fetch(`${remoteURL}/goals/${editedGoal.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedGoal)
    }).then(data => data.json())
}

export const updateCompleteGoal = (editedGoal) =>{
    return fetch(`${remoteURL}/goals/${editedGoal.isCompleted}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedGoal)
    }).then(data => data.json())
}

export const deleteGoal = (id) => {
    return fetch(`${remoteURL}/goals/${id}`, {
        method: "DELETE"
    }).then(result => result.json())
}