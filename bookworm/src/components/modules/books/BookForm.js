//form to add books to DB
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { addBook } from '../../../data/BookManager';
import { getAllUsers } from '../../../data/UserManager';

// Timestamp details to give the articles a date for the database

export const BookForm = () => {

    //destructure for useState, which sets a variable and empty array to be used.
    const [book, setBook] = useState({
        title: "",
        author: ""
    });

    // isLoading and setIsLoading are used to hold off click events until
    // all data fields are entered. They are set to false initially.  
    const [isLoading, setIsLoading] = useState(false);

    // props used to identify the creator of the article.
    const [users, setUsers] = useState([]);

    // react native to render the previous page after an action.
    const history = useHistory();

    // click event used for the id of the user.
    const handleControlledInputChange = event => {
        const newBook = { ...book }
        let selectedVal = event.target.value
        if (event.target.id.includes("Id")) {
            selectedVal = parseInt(selectedVal)
        }
        newBook[event.target.id] = selectedVal
        setBook(newBook)
    }

    // click event used to ensure that all 
    // fields are filled in before adding the article to the dashboard
    // userId is invoked in order to pull the data from db 
    const handleClickSaveArticle = event => {
        event.preventDefault()
        const nullTitle = book.title
        const nullAuthor = book.author
        if (nullTitle && nullAuthor === "") {
            window.alert("Please fill out all fields.")
        }
        else {
            addBook(book)
                .then(() => history.push("/bookdata"))
        }
    }

    //gathers the users array for the db and parses thru it for form input
    useEffect(() => {
        getAllUsers()
            .then(usersFromAPI => {
                setUsers(usersFromAPI)
            });
        setIsLoading(false)
    }, []);

    // form for adding books to DB and Book Page
    return (
        <form className="bookForm">
            <h2 className="bookForm-title">Add a Book</h2>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" id="title" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Book Title" value={book.title} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="author">Author: </label>
                    <input type="text" id="author" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Author" value={book.author} />
                </div>
            </fieldset>

            <button className="addBtn"
                onClick={handleClickSaveArticle} disabled={isLoading}>
                + add book
            </button>
        </form>
    )
}