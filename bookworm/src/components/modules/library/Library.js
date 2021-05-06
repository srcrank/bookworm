import React, { useState, useEffect } from 'react';
import { LibraryCard } from './LibraryCard'
import { getLibrary, deleteBookInLib, getAllBooks } from '../../../data/LibManager'
import { useHistory } from 'react-router-dom';

export const Library = () => {
    const [libItems, setLib] = useState([]);

    const history = useHistory();

    const getUserLib = () => {
       const allLibraries = getLibrary().then()
       const userLibrary = 
    }

    const handleDeleteLibItem = (id) => {
        deleteBookInLib(id)
            .then(() => getAllBooks()
                .then(setLib))
    };

    useEffect(() => {
        // getLibrary();
    }, []);

    return (
        <>

            <section className="section-content">
                <button type="button"
                    className="btn"
                    onClick={() => { history.push("/library/add") }}>
                    + book
                </button>
            </section>


            {/* <div className="conatiner-cards">
                {libItems.map(library =>
                    <LibraryCard key={library.id} article={library} handleDeleteArticle={handleDeleteLibItem} />)}
            </div> */}
        </>
    )
};