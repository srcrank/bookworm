const remoteURL = "http://localhost:8088"

export const getBookById = (id) => {
    //fetch call to grab books by their id.
    return fetch(`${remoteURL}/bookdata/${id}?_expand=`)
    .then(res =>res.json())
}

export const getAllBooks = () => {
    //fetch call that will display all of the books
    return fetch(`${remoteURL}/bookdata/?_expand=`)
    .then(result => result.json())
}

export const addBook = (newBook) => {
    //fetch call which will allow users to add books to the database
    return fetch(`${remoteURL}/bookdata`, {
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newBook)
    }).then(getAllBooks()).catch(err => console.error("An error occurred adding new book", err))
}

export const updateBook = (editedBook) => {
    //this is the fetch call which will allow for admins to edit book entries in the DB
    return fetch(`${remoteURL}/bookdata/${editedBook.id}`, {
        method: "PUT",
        headers: {
            "Content=Type": "application/json"
        },
        body: JSON.stringify(editedBook)
    }).then(res => res.json())
}

export const deleteBook = (id) => {
    //fetch call which will allow for admins to delete book entries in the DB
    return fetch (`${remoteURL}/bookdata/${id}`, {
        method: "DELETE"
    }).then(res => res.json())
}