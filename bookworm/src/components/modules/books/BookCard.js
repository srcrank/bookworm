import React from "react"
import { useHistory } from "react-router-dom"


export const BookCard = ({ books, handleDeleteBooks }) => {
    const history = useHistory();
    return (
    <div className="bookCard">
        <h3><span className="BookTitle">
          {books.title}
        </span></h3>
        <p className="book-AuthorName">{books.author}</p>
        <button type="button" onClick={() => history.push(`/library`)}> Add to Library </button>
{/* add and if statement here so that only admins can delete or edit books */}
        <button type="button" onClick={() => history.push(`/bookdata/${books.id}/edit`)}> Edit </button>
{/* add an if statement here so that only admins can delete or edit books */}
          <button type="button" onClick={() => handleDeleteBooks(books.id)}>DELETE</button>
      </div>
  );
}

