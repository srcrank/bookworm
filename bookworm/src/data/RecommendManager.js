const remoteURL = "http://localhost:8088"

// fetch calls used to grab data 
export const getAllRecommendations = () => {
    return fetch(`${remoteURL}/recommend?_expand=user`)
        .then(result => result.json())
}

//fetch call to delete messages from database
export const deleteRec = (id) => {
    return fetch(`${remoteURL}/recommend/${id}`, {
        method: "DELETE"
    }).then(result => result.json())
}

//fetch call which will get recommendations by Id
export const getRecById = (id) => {
    return fetch(`${remoteURL}/recommend/${id}`)
        .then(res => res.json())
}

//fetch to add recommendations to the forum
export const addRec = (newRec) => {
    return fetch(`${remoteURL}/recommend`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newRec)
    }).then(response => response.json())
}

//fetch to edit the contents of a recommendation
export const updateRec  = (editedRec) => {
    return fetch(`${remoteURL}/recommend/${editedRec.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedRec)
    }).then(data => data.json());
}

//fetch to find recs by the user that posted them. 
export const getRecByUser = (userId) => {
    return fetch(`${remoteURL}/recommend/?userId=${userId}&_expand=user`)
        .then(res => res.json())
}