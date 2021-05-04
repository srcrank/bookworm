const remoteURL = "http://localhost:8088"

//fetches books by their ID
export const getBookById = (id) => {
    return fetch (`${remoteURL}/bookdata/${id}?_expand`)
    .then(res => res.json())
}

//fetches all books in the API
export const getAllBooks = () => {
    return fetch (`${remoteURL}/bookdata?_expand`)
    .then(res => res.json())
}

//fetches the specific Library tied to the user
export const getLibByUser = (userId) => {
    return fetch (`${remoteURL}/library/${userId}?_expand`)
    .then(res => res.json())
}

//will post books to user's list
export const addBook2Lib = (newBook2Lib) => {
    return fetch(`${remoteURL}/library/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newBook2Lib)
    }).then(response => response.json())
}


export const updateLib = (editedLib) =>{
    return fetch(`${remoteURL}/library/${editedLib.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedLib)
    }).then(data => data.json())
}

export const deleteBookInLib = (id) => {
    return fetch(`${remoteURL}/library/${id}`, {
        method: "DELETE"
    }).then(result => result.json())
}