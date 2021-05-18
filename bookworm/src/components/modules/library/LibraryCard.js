//displays books added to library by putting book data into a card. 

import React from "react";
import { useHistory } from "react-router-dom"
import "./LibraryCard.css"

export const LibraryCard = ({ book, handleDeleteLibItem, editLibStatus}) => { 

    //const currentUser = JSON.parse(sessionStorage.getItem("nutshell_user"))

    //const history = useHistory();
    
    return (
    <div className="library-card">
    <div className="libraryCard-content">
        
        <div className="bookDiv">
        <span className="library-bookName">{book.title}</span>
            <p className="library-authorName">{book.author}</p>
            </div>

            <div className="statusDiv">
            <select name="status" className="status-dropdown" value={book.status} onChange={(evt) => editLibStatus(evt, book.libId)} >
                <option value="reading">Reading</option>
                <option value="completed">Completed</option>
                <option value="on hold">On Hold</option>
                <option value="plan to read">Plan to Read</option>
                </select>
            <div className="libraryButton-container">
            <button className="library-button" type="button" onClick={() => handleDeleteLibItem(book.libId)}>
                <div className="tooltip">
                <span class="tooltiptext-Del">Delete</span>
                <i className="fas fa-trash-alt"></i>
                </div>
            </button>
            </div>
         </div>

         </div>
    </div>
    )
} 


//react set class based on value