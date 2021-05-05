import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { getAllUsers } from '../../../data/UserManager'
import { addRec } from '../../../data/RecommendManager'

export const RecForm = () => {
    const currentUser = JSON.parse(sessionStorage.getItem("bookworm_user"))
    
    const [recommendation, setRecommendation] = useState({
        userId: parseInt(sessionStorage.getItem("bookworm_user")),
        message: "",
        timestamp: new Date().toLocaleString()
    })

    const [users, setUsers] = useState([]);

    const [isLoading, setIsLoading] = useState(false)

    const history = useHistory();

    const handleControlledInputChange = (event) => {
        const newRec = { ...recommendation }
        let selectedVal = event.target.value
        if (event.target.id.includes('Id')) {
            selectedVal = parseInt(selectedVal)
        }
        newRec[event.target.id] = selectedVal
        setRecommendation(newRec)
    } 

    const handleClickSaveRec = (event) => {
        event.preventDefault()
        addRec(recommendation).then(() => history.push("/recommend"))
    }

    useEffect(() => {
        getAllUsers().then(usersFromAPI => {
            setUsers(usersFromAPI)
        })
        setIsLoading(false)
    }, [])

    return (
        <form className="recForm">
            <h3 className="recForm-title">
                have a recommendation?
            </h3>
        <textarea type="textarea" id="message" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="say something!" />
            
        <button className="btn btn-primary" onClick={handleClickSaveRec} disabled={isLoading}>
                recommend!
                </button>

        </form>
    )
}