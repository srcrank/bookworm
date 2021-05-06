import React from "react"
import { useHistory } from "react-router-dom"


export const BookCard = ({ book, handleDeleteBooks }) => {
    const history = useHistory();
    return (
    <div className="bookCard">
        <h3><span className="BookTitle">
          {book.title}
        </span></h3>
        <p className="book-AuthorName">{book.author}</p>
        <button type="button" onClick={() => history.push(`/library`)}> Add to Library </button>
{/* add and if statement here so that only admins can delete or edit books */}
        <button type="button" onClick={() => history.push(`/bookdata/${book.id}/edit`)}> Edit </button>
{/* add an if statement here so that only admins can delete or edit books */}
          <button type="button" onClick={() => handleDeleteBooks(book.id)}>DELETE</button>
      </div>
  );
}

