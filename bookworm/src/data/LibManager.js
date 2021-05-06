const remoteURL = "http://localhost:8088"

//fetches the Library, all lib items
export const getLibrary = () => {
    return fetch (`${remoteURL}/library`)
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