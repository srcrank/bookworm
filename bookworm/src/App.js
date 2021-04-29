import logo from './logo.svg';
import './App.css';
import { Route, Redirect } from "react-router-dom"
import { NavBar } from "./components/nav/NavBar"
import { Login } from "./components/auth/Login"
import { Register } from "./components/auth/Register"

export const Bookworm = () => (
  <>
  <Route
    render={() => {
      if (sessionStorage.getItem("bookworm_user")) {
        return (
          <>
            <NavBar />
          </>  
        )
      } else {
        return <Redirect to="/login" />
      }
    }}
    />


  <Route path="/login">
      <Login />
    </Route>
    <Route path="/register">
      <Register />
    </Route>
  </>
)
