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

/*
{
  "id": 1,
  "userId": 1,
  "bookId": 1,
  "status": "plan to read"
},
{
  "id": 1,
  "title": "A Strange Country",
  "author": "Muriel Barbery"
},

  const getUserLib = () => {
    return getUsersLibrary(currentUserId).then((results) => {
      if (results.length > 0) {
        let promises = results.map((item) => {
          return getBookById(item.bookId).then((bookData) => {
            bookData.status = item.status;
            bookData.libId = item.id;
            return bookData;
          });
        });
        Promise.all(promises).then((bookData) => {
          setBooks(bookData);
        });
      } else {
      }
    });
  };
*/


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
          new book
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
