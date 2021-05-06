const remoteURL = "http://localhost:8088"

export const getAllUsers = () => {
    //gets all users from database.json
    return fetch  (`${remoteURL}/users`)
    .then(res => res.json())
}




export const getUserById = (id) => {
    //gets the user by a specific ID
    return fetch (`${remoteURL}/users/${id}`)
    .then(res => res.json())
}
