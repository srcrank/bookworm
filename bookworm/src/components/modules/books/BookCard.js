import React from "react";
import { useHistory } from "react-router-dom";
import './BookCard.css'

export const BookCard = ({ book, handleDeleteBooks, handleAddBooks, user }) => {
  const history = useHistory();
  if (user.isAdmin) {
    return (
      <div className="bookCard">
        <h3>
          <span className="BookTitle">{book.title}</span>
        </h3>
        <p className="book-AuthorName">{book.author}</p>
        <div className="button-container">
        {/* add and if statement here so that only admins can delete or edit books */}
        <button className="book-button" type="button"
          onClick={() => history.push(`/bookdata/${book.id}/edit`)}
        >
          <div className="tooltip">
            <span class="tooltiptext-Edit">Edit</span>
            <i className="fas fa-pen"></i>
            </div>
        </button>
        {/* add an if statement here so that only admins can delete or edit books */}
        <button className="book-button" type="button" onClick={() => handleDeleteBooks(book.id)}>
        <div className="tooltip">
            <span class="tooltiptext-Del">Delete</span>
            <i className="fas fa-trash-alt"></i>
            </div>
        </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="bookCard">
        <h3>
          <span className="BookTitle">{book.title}</span>
        </h3>
        <p className="book-AuthorName">{book.author}</p>
        <div className="button-container">
        <button className="book-button" type="button" onClick={() => handleAddBooks(book.id)}>
          {" "}
          Add to Library{" "}
        </button>
        </div>
      </div>
    );
  }
};
