import React, { useState, useEffect } from 'react';
import { LibraryCard } from './LibraryCard'
import { getUsersLibrary, deleteBookInLib } from '../../../data/LibManager'
import { useHistory } from 'react-router-dom';
import { getAllBooks, getBookById } from '../../../data/BookManager';


export const Library = () => {
    const [libItems, setLib] = useState([]);
    const [books, setBooks] = useState([]);

    const history = useHistory();
    const currentUserId = parseInt(sessionStorage.getItem("bookworm_user"));


    const getUserLib = () => {
        return getUsersLibrary(currentUserId).then((results) => {
          if (results.length > 1) {
            let promises = results.map((item) => {
              return getBookById(item.bookId).then((bookData) => {
                console.log('Res: ', bookData);
                return bookData;
              });
            });
            Promise.all(promises).then((bookData) => {
              console.log('Promise All: ', bookData);
              setBooks(bookData);
            });
          } else {
          }
        });
      };

    const getBooksInLib = () => {
        console.log('Start Get Books', libItems)
        
        libItems.map(libItem => {return getBookById(libItem.bookId).then(res => console.log("res", res))})
    }

    const handleDeleteLibItem = console.log("delete!")

    useEffect(() => {
        getUserLib().then(getBooksInLib());
    }, []);

    return (
        <>

            {/* <section className="section-content">
                <button type="button"
                    className="btn"
                    onClick={() => { history.push("/library/add") }}>
                    + book
                </button>
            </section> */}


            <div className="container-libCards">
                {books.map(book =>
                    <LibraryCard 
                    key={book.id} book={book} handleDeleteLibItem={handleDeleteLibItem} />
                    )}
            </div>
        </>
    )
};