import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { deleteRec, getAllRecommendations, addRec } from '../../../data/RecommendManager'
import { RecCard } from './RecCard'
import { RecForm } from './RecForm'
import './RecForum.css'

export const RecList = () => {
    const [recommendations, setRecommendation] = useState([]);

    const history = useHistory();

    const getRecs = () => {
        return getAllRecommendations().then(recsFromAPI => {
            setRecommendation(recsFromAPI)
        })   
    }

    const handleDeleteRec = (id) => {
        deleteRec(id).then(() => 
        getAllRecommendations().then(setRecommendation))
    }

    const handleClickSaveRec = (event) => {
        const message = document.getElementById("message").value
        const newRec = {
            userId: parseInt(sessionStorage.getItem("bookworm_user")),
            message: message,
            timestamp: new Date().toLocaleString()
        }
        event.preventDefault()
        addRec(newRec).then(getRecs)
        document.getElementById("message").value = ""
    }

    useEffect(() => {
        getRecs()
    }, [])

    return (
        <>
        <div className="recPage-Head">
      <span className="recPage-title">Recommendation Forum</span>
      <span className="recDescription">Chat with other users and get some new book recommendations!</span>
    </div>
            <div className="recContainer-Cards">
                <div className="recScreen">
                {recommendations.map(rec => 
                   <RecCard key={rec.id} message={rec} handleDeleteRec={handleDeleteRec} />
                    )}
              </div>
              <div className="section-content">
                  <RecForm handleClickSaveRec={handleClickSaveRec}/>
                  
                {/* <button type="button" className="add-recButton" onClick={() => { history.push("/recommend/add")}}>
                    + recommend
                </button> */}
            </div>
            </div>            
        </>
    )
}

