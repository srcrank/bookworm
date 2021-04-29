import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = (props) => {
  return (
    <nav className="nav-bar">

      <ul className="">
        <li className="nav-item">
          <Link className="nav-link" to="/">Goals</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/library">My Library</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/recommend">Recommend</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/books">Books</Link>
        </li>
      </ul>
    </nav>
  )
}
