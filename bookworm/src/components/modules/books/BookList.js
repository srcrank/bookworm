import React, { useState, useEffect } from "react";
import { deleteBook, getAllBooks } from "../../../data/BookManager"
import { getUserById } from "../../../data/UserManager"
import { useHistory } from "react-router-dom";
import { BookCard } from "./BookCard"
import { addBook2Lib } from "../../../data/LibManager";

export const BookList = () => {
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState([]);
  const [lib, setLib] = useState([]);

  const history = useHistory();
  const currentUserId = parseInt(sessionStorage.getItem("bookworm_user"));


  const getBooks = () => {
    return getAllBooks().then((booksFromAPI) => {
      setBooks(booksFromAPI);
    });
  };

  const getCurrentUser = () => { 
    getUserById(currentUserId).then((user) => {
        setUser(user)
    }) 
  }

  const handleAddBooks = () =>{
    addBook2Lib(currentUserId).then((user) => {
      setLib(user)
    })
  }

  const handleDeleteBooks = (id) => {
    deleteBook(id).then(() => getAllBooks().then(setBooks));
  };

  useEffect(() => {
    getBooks().then(getCurrentUser);
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
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            handleDeleteBooks={handleDeleteBooks}
            user={user}
          />
        ))}
      </div>
    </>
  );
};