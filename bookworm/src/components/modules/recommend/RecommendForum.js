import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { deleteRec, getAllRecommendations } from '../../../data/RecommendManager'
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

    useEffect(() => {
        getRecs()
    }, [])

    return (
        <>
            <div className="recContainer-Cards">
                <div className="recScreen">
                {recommendations.map(rec => 
                   <RecCard key={rec.id} message={rec} handleDeleteRec={handleDeleteRec} />
                    )}
              </div>
              <div className="section-content">
                  <RecForm />
                  
                {/* <button type="button" className="add-recButton" onClick={() => { history.push("/recommend/add")}}>
                    + recommend
                </button> */}
            </div>
            </div>            
        </>
    )
}

