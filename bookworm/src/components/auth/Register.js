import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { authApi, userStorageKey } from "./authSettings"
import "./Register.css"

export const Register = () => {

    const [registerUser, setRegisterUser] = useState({ })
    const [conflictDialog, setConflictDialog] = useState(false)

    const history = useHistory()

    const handleInputChange = (event) => {
        const newUser = { ...registerUser }
        newUser[event.target.id] = event.target.value
        setRegisterUser(newUser)
    }

    const existingUserCheck = () => {
        
        return fetch(`${authApi.localApiBaseUrl}/${authApi.endpoint}?email=${registerUser.email}`)
            .then(res => res.json())
            .then(user => !!user.length)
    }

    const handleRegister = (e) => {
        e.preventDefault()

        existingUserCheck()
            .then((userExists) => {
                if (!userExists) {
                    fetch(`${authApi.localApiBaseUrl}/${authApi.endpoint}`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            firstName: `${registerUser.firstName}`,
                            lastName: `${registerUser.lastName}`,
                            email: registerUser.email,
                            isAdmin: false

                        })
                    })
                        .then(res => res.json())
                        .then(createdUser => {
                            if (createdUser.hasOwnProperty("id")) {
                                sessionStorage.setItem(userStorageKey, createdUser.id)
                                history.push("/")
                            }
                        })
                }
                else {
                    setConflictDialog(true)
                }
            })

    }

    return (
        <main style={{ textAlign: "center" }}>

            <dialog className="dialog dialog--password" open={conflictDialog}>
                <div>Account with that email address already exists</div>
                <button className="button--close" onClick={e => setConflictDialog(false)}>Close</button>
            </dialog>

            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Register an Account</h1>
                <fieldset>
                    {/* <label htmlFor="firstName"> First Name </label> */}
                    <input type="text" name="firstName" id="firstName" className="loginForm-control" placeholder="First name" required autoFocus value={registerUser.firstName} onChange={handleInputChange} />
                </fieldset>
                <fieldset>
                    {/* <label htmlFor="lastName"> Last Name </label> */}
                    <input type="text" name="lastName" id="lastName" className="loginForm-control" placeholder="Last name" required value={registerUser.lastName} onChange={handleInputChange} />
                </fieldset>
                <fieldset>
                    {/* <label htmlFor="inputEmail"> Email address </label> */}
                    <input type="email" name="email" id="email" className="loginForm-control" placeholder="Email address" required value={registerUser.email} onChange={handleInputChange} />
                </fieldset>
                <fieldset>
                    <button className="login-button" type="submit"> Sign up </button>
                </fieldset>
            </form>
            <section className="link--signUp">
                <p>Already have an account?{` `}</p>
                <Link className= "signUp-Link" to="/login">{" "}Log In</Link>
            </section>
        </main>
    )
}

