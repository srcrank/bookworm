import React, { useState, useEffect } from "react";
import { deleteBook, getAllBooks } from "../../../data/BookManager"
import { useHistory } from "react-router-dom";
import { BookCard } from "./BookCard"


export const BookList = () => {
  const [books, setBooks] = useState([]);

  const history = useHistory();

  const getBooks = () => {
    return getAllBooks().then((booksFromAPI) => {
      setBooks(booksFromAPI);
    });
  };

  const handleDeleteBooks = (id) => {
    deleteBook(id).then(() => getAllBooks().then(setBooks));
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <>
      <section className="event-section-content">
        <button
          type="button"
          className="btn"
          onClick={() => {
            history.push("/bookdata/add");
          }}
        >
          + book
        </button>
      </section>

      <div className="container-bookCards">
        {books.map((book, index) => (
          <BookCard
            key={book.id}
            book={book}
            handleDeleteEvent={handleDeleteBooks}
            index={index}
          />
        ))}
      </div>
    </>
  );
};