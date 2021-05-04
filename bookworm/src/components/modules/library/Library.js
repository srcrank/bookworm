import React, { useState, useEffect } from 'react';
import { LibraryCard } from './LibraryCard'
import { deleteBookInLib, getAllBooks } from '../../../data/LibManager'
import { useHistory } from 'react-router-dom';

export const Library = () => {
    const [libItems, setLib] = useState([]);

    const history = useHistory();

    const getLibrary = () => {
        return getAllArticles()
            .then(articlesFromAPI => {
                setArticles(articlesFromAPI)
            });
    };

    const handleDeleteArticle = (id) => {
        deleteArticle(id)
            .then(() => getAllArticles()
                .then(setArticles))
    };

    useEffect(() => {
        getArticles();
    }, []);

    return (
        <>

            <section className="section-content">
                <button type="button"
                    className="btn"
                    onClick={() => { history.push("/articles/create") }}>
                    Add Article
                </button>
            </section>


            <div className="conatiner-cards">
                {articles.map(library =>
                    <LibraryCard key={article.id} article={article} handleDeleteArticle={handleDeleteArticle} />)}
            </div>
        </>
    )
};