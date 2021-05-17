//these cards will return Dom representation of recs. 
//why isn't message a taco??
import React from "react";
import { useHistory } from "react-router-dom";
import "./RecCard.css"

// Export function to show the rec
export const RecCard = ({message, handleDeleteRec}) => {

    const history = useHistory()
    // let recDate = rec.timestamp
    // let recTime = recDate.split(" ");
    // let recSun = recTime.pop()
    // let recHour = recTime.slice(1).reverse().pop().split(":").slice(0,2).join(":")
    // console.log(recHour)
    // console.log(recSun)
    //variable declared to establish the authentication
    const currentUser = parseInt(sessionStorage.getItem("bookworm_user"));

    return (
        <div className="rec-Card" id="recScreenScroll">
            <div className="recCard-content">
            <div className="rec">
                {message.user.id !== currentUser
                    ?<>
                    <h4 className="card-name">{message.user.firstname} {message.user.lastname}: </h4>
                    {/* <h4 className="timestamp">@{recHour}{recSun}:</h4> */}
                    <span className="message">{message.message}</span>
                    </>
                    :<>
                    <h4 className="userName">{message.user.firstname} {message.user.lastname}: </h4>
                    {/* <h4 className="timestamp">@{recHour}{recSun}:</h4> */}
                    <span className="userMessage">{message.message}</span>
                    </>
                }
                </div>
                <br></br>
                {/*This is a conditional to determine who is viewing the recs*/}
                    {message.userId === currentUser ? 
                <>
                <div className="DeleteButton-Container">
                    <i id="recDeleteIcon" class="fas fa-trash-alt fa-2x" onClick={() => handleDeleteRec(message.id)}></i>
                    </div>
                </>
                : null
                }
            </div>
        </div>
    )
};