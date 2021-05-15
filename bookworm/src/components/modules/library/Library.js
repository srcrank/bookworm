import React, { useState, useEffect } from 'react';
import { LibraryCard } from './LibraryCard'
import { getUsersLibrary, deleteBookInLib,  } from '../../../data/LibManager'
import { useHistory } from 'react-router-dom';
import { deleteBook, getBookById } from '../../../data/BookManager';


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
                bookData.status = item.status
                bookData.libId = item.id
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

//DISPLAY STATUS OF BOOK ITEMS
    // const getStatus = () => {
    //   return getStatusFromLib(currentUserId).then((results) =>)
    // }

    // const getBooksInLib = () => {
    //     console.log('Start Get Books', libItems)
        
    //     libItems.map(libItem => {return getBookById(libItem.bookId).then(res => console.log("res", res))})  .then(getBooksInLib())
    // }

    const handleDeleteLibItem = (libId) => {
      deleteBookInLib(libId).then(getUserLib)
    }

    const editLibStatus = (value, libId) => {
      console.log({value: value, libId: libId})
    }

    useEffect(() => {
        getUserLib();
    }, []);

    return (
        <>
            <div className="container-libCards">
                {books.map(book =>
                    <LibraryCard 
                    key={book.id} book={book} handleDeleteLibItem={handleDeleteLibItem} 
                    editLibStatus={editLibStatus}/>
                    )}
            </div>
        </>
    )
};