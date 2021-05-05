//logged in user can edit their own recommendations

import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getRecById, updateRec } from '../../../data/RecommendManager'


export const RecEditForm = () => {

    // props set for State to set to edit the message.
    const [ recommend, setRecommendation ] = useState({});

    // Variables set in order to hold the info until further notice
    const [ isLoading, setIsLoading ] = useState(false);

    // params set to help grab the message from the db and edit the correct info
    const { recId } = useParams();

    // variable declared to use useHistory() to tell where to render after the action is taken
    const history = useHistory();

    // event to control the change of editing the message
    const handleFieldChange = event => {
        const stateToChange = { ...recommend };
        let selectedVal = event.target.value
            if (event.target.id.includes("Id")) {
                selectedVal = parseInt(selectedVal)
            }
            // Look into messages copy it, find the id we are wishing to edit.
            stateToChange[event.target.id] = selectedVal
                setRecommendation(stateToChange);
            };
    
    // 
    const updateExistingRec = evt => {
        evt.preventDefault()
            setIsLoading(true);

    //argument passed in fetch call called in to edit the db   
    const editedMessage = {
        id: recId,
        message: recommend.message,
        userId: recommend.userId,
        recipientId: recommend.recipientId,
        timestamp: recommend.timestamp
    };

    // after the message is updated re-render to the list without refresh
    updateRec(editedMessage)
        .then(() => history.push("/recommend"));
    };

    // The action that is taken after all the above is run.   
    useEffect(() => {
        getRecById(recId)
            .then(rec => {
                setRecommendation(rec);
                    setIsLoading(false)
            })  
    }, [recId]);

    return (
        <>
            <form className="recForm">
            <h3 className="recForm-title">
                edit recommendation
            </h3>
                <textarea type="text" 
                required onChange={handleFieldChange} 
                id="message" 
                value={recommend.message}/>
            </form>

            <button type="button" disabled={isLoading}
              onClick={updateExistingRec}
              className="btn btn-primary">
                  + save change
            </button>
        </>
    )
};

