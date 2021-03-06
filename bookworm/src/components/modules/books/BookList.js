import React, { useState, useEffect } from "react";
import { deleteBook, getAllBooks } from "../../../data/BookManager";
import { getUserById } from "../../../data/UserManager";
import { useHistory } from "react-router-dom";
import { BookCard } from "./BookCard";
import { addBook2Lib, getUsersLibrary } from "../../../data/LibManager";
import "./BookList.css";

export const BookList = () => {
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState([]);
  // const [lib, setLib] = useState([]);

  const history = useHistory();
  const currentUserId = parseInt(sessionStorage.getItem("bookworm_user"));
  // const currentBook = 

  const getBooks = () => {
    return getAllBooks().then((booksFromAPI) => {
      //trying to sort books by title here. Not quite working.
      return getUsersLibrary(currentUserId).then((filterLib) => {
        const x = booksFromAPI.filter(book => {return !filterLib.find(libItem =>{return libItem.bookId === book.id})})
        setBooks(x)
      })
    })
  };

  const getCurrentUser = () => {
    getUserById(currentUserId).then((user) => {
      setUser(user);
    });
  };


  const handleAddBooks = (bookId) => {
    const libObject = {
      bookId: bookId,
      userId: currentUserId,
      status: "plan to read",
    };
    addBook2Lib(libObject).then(getBooks);
  };

  const handleDeleteBooks = (id) => {
    deleteBook(id).then(() => getAllBooks().then(setBooks));
  };

  useEffect(() => {
    getBooks().then(getCurrentUser);
  }, []);

  return (
    <>
      <div className="pageHead-container"> 
      <span className="bookList-Spacing"></span>
      <span className="page-title">Browse Books</span>
      <div className="addButton-container">
        <button
          type="button"
          className="add-button"
          onClick={() => {
            history.push("/bookdata/add");
          }}
        >
          New Book
        </button>
      </div>
      </div>

      <div className="container-bookCards">
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            handleDeleteBooks={handleDeleteBooks}
            handleAddBooks={handleAddBooks}
            user={user}
          />
        ))}
      </div>
    </>
  );
};
