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
          edit
        </button>
        {/* add an if statement here so that only admins can delete or edit books */}
        <button className="book-button" type="button" onClick={() => handleDeleteBooks(book.id)}>
          delete
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
