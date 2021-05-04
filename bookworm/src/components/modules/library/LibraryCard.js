//displays books added to library by putting book data into a card. 

import React from "react";
import { useHistory } from "react-router-dom"

export const LibraryCard = ({ libItem, handleDeleteBookInLib }) => { 

    //const currentUser = JSON.parse(sessionStorage.getItem("nutshell_user"))

    //const history = useHistory();
    
    return (
    <div className="library-card">
    <div className="libraryCard-content">
        <span className="card-articleName">{libItem.title}</span>
            <p>{libItem.author}</p>
            <select name="status" className="status-dropdown">
                <option value="reading">reading</option>
                <option value="completed">completed</option>
                <option value="on hold">on hold</option>
                <option value="plan to read">plan to read</option>
                </select>
            <button type="button" onClick={() => handleDeleteBookInLib(libItem.id)}>delete</button>
         </div>
    </div>
    )
} 