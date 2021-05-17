import logo from './logo.svg';
import './App.css';
import { Route, Redirect } from "react-router-dom"
import { NavBar } from "./components/nav/NavBar"
import { ApplicationViews } from "./components/ApplicationViews"
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
            <ApplicationViews />
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


//<div>Icons made by <a href="https://www.flaticon.com/authors/dmitri13" title="dmitri13">dmitri13</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>