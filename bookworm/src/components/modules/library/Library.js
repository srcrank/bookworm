import React, { useState, useEffect } from "react";
import { LibraryCard } from "./LibraryCard";
import {
  getUsersLibrary,
  deleteBookInLib,
  getLibrary,
  getLibItemById,
  updateLibItem,
} from "../../../data/LibManager";
import { useHistory } from "react-router-dom";
import { deleteBook, getBookById } from "../../../data/BookManager";

export const Library = () => {
  const [libItems, setLib] = useState([]);
  const [books, setBooks] = useState([]);

  const history = useHistory();
  const currentUserId = parseInt(sessionStorage.getItem("bookworm_user"));

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

  const handleDeleteLibItem = (libId) => {
    deleteBookInLib(libId).then(getUserLib);
  };

  const editLibStatus = (evt, libId) => {
    const newStatus = evt.target.value;
    return getLibItemById(libId)
      .then((result) => {
        result[0].status = newStatus;
        return result;
      })
      .then((libItem) => {
        return updateLibItem(libItem, libId);
      })
      .then(getUserLib);
  };

  useEffect(() => {
    getUserLib();
  }, []);

  return (
    <>
      <div className="container-libCards">
        {books.map((book) => (
          <LibraryCard
            key={book.id}
            book={book}
            handleDeleteLibItem={handleDeleteLibItem}
            editLibStatus={editLibStatus}
          />
        ))}
      </div>
    </>
  );
};
