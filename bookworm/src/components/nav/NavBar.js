import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"
import "./BKWRMlogo.png"

export const NavBar = () => {
  return (
    <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">Goals</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/library">My Library</Link>
            </li>
            <li className="navbar__item">
            <a href="/" className="logo-text">BKWRM</a>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/recommend">Recommend</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/bookdata">Books</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__linkLogout" to="/login">Logout</Link>
            </li>
        </ul>
  )
}


/*
<nav className="navBar">

<ul className="">
  <li className="navItem">
    <Link className="navLink" to="/">Goals</Link>
  </li>
  <li className="navItem">
    <Link className="navLink" to="/library">My Library</Link>
  </li>
  <li className="navItem">
    <Link className="navLink" to="/recommend">Recommend</Link>
  </li>
  <li className="navItem">
    <Link className="navLink" to="/books">Books</Link>
  </li>
</ul>
</nav>
*/