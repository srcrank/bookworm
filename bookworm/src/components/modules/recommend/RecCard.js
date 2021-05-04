//these cards will return Dom representation of recs. 
//why isn't message a taco??
import React from "react";
import { useHistory } from "react-router-dom";

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
        <div className="card">
            <div className="card-content">
            <div className="nameplate">
                {message.user.id !== currentUser
                    ?<>
                    <h2 className="card-name">{message.user.name}</h2>
                    {/* <h2 className="timestamp">@{recHour}{recSun}:</h2> */}
                    <space></space>
                    <h1 className="message">{message.message}</h1>
                    </>
                    :<>
                    <h2 className="card-username">{message.user.name}</h2>
                    {/* <h2 className="timestamp">@{recHour}{recSun}:</h2> */}
                    <space></space>
                    <h1 className="userMessage">{message.message}</h1>
                    </>
                }
                </div>
                <br></br>
                {/*This is a conditional to determine who is viewing the recs*/}
                    {message.userId === currentUser ? 
                <>
                    <button type="button" onClick={() => history.push(`/recommend/${message.id}/edit`)}> ~ edit </button>
                    <button type="button" onClick={() => handleDeleteRec(message.id)}>delete</button>
                </>
                : null
                }
            </div>
        </div>
    )
};