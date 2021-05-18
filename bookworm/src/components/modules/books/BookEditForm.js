// Authored by: Sidney Crandall
// Edit Form for users to edit the articles that have been posted.

import React, { useState, useEffect } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { updateBook, getBookById } from "../../../data/BookManager";
import { getAllUsers } from "../../../data/UserManager";
import "./BookEditForm.css"

export const BookEditForm = () => {
  const [book, setBook ] = useState({});

    // isLoading and setIsLoading are used to keep click events from occurring until all data fields are filled out. set to false. 
  const [isLoading, setIsLoading] = useState(false);

  const { bookId } = useParams();
  const history = useHistory();

  const [users, setUsers] = useState([]);

  const handleFieldChange = evt => {
    const stateToChange = { ...book };
    let selectedVal = evt.target.value
    if (evt.target.id.includes("Id")) {
      selectedVal = parseInt(selectedVal)
    }
    // looking for the id of the correct key
    stateToChange[evt.target.id] = selectedVal
    setBook(stateToChange);
  };

  const updateExistingBook = evt => {
    evt.preventDefault()
        setIsLoading(true);

    // Making an edit so id is necessary. 
    const editedBook = {
      id: bookId,
      title: book.title,
      author: book.author
    };

    const nullTitle = book.title
    const nullAuthor = book.author
    if (nullTitle && nullAuthor === "") {
        window.alert("Please fill out all fields.")
    }
    else {
        updateBook(editedBook)
            .then(() => history.push("/bookdata"))
    }
  }

  // The effect of the state
  useEffect(() => {
    getBookById(bookId)
      .then(book => {
        setBook(book);
            setIsLoading(false);
      });
  }, [bookId]);

  //is this necessary?
  useEffect(() => {
    getAllUsers()
      .then(usersFromAPI => {
        setUsers(usersFromAPI)
      });
  }, []);

  // Fieldset used to Edit articles by title, link, and synopsis.
  return (
    <>
      <form className="book-EditForm">
            <h2 className="bookForm-title">Edit Book</h2>
<div className="form-style">
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title </label>
                    <input type="text" id="title" onChange={handleFieldChange} required autoFocus className="form-control" placeholder="Book Title" value={book.title} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="author">Author </label>
                    <input type="text" id="author" onChange={handleFieldChange} required autoFocus className="form-control" placeholder="Author" value={book.author} />
                </div>
            </fieldset>

            <button className="add-button"
                onClick={updateExistingBook} disabled={isLoading}>
                Update Book
            </button>
            </div>
        </form>
    </>
    )
}