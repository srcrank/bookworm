import React, { useState, useEffect } from "react";
import { deleteBook, getAllBooks } from "../../../data/BookManager"
import { getUserById } from "../../../data/UserManager"
import { useHistory } from "react-router-dom";
import { BookCard } from "./BookCard"
import './BookList.css'


export const BookList = () => {
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState([]);

  const history = useHistory();
  const currentUserId = parseInt(sessionStorage.getItem("bookworm_user"));

  const getBooks = () => {
    return getAllBooks().then((booksFromAPI) => {
      //trying to sort books by title here. Not quite working. 
      const sortBooks = booksFromAPI.sort((a, b) => {
        return a.title-b.title
      })
      setBooks(sortBooks);
    });
  };

  const getCurrentUser = () => { 
    getUserById(currentUserId).then((user) => {
        setUser(user)
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
        
        <span className="page-title">Browse Books</span>
        <div className="addButton-container">
        <button
          type="button"
          className="add-button"
          onClick={() => {
            history.push("/bookdata/add");
          }}
        >
          new book
        </button>
        </div>



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