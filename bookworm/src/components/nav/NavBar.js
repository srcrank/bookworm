import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import Logo from "./BKWRMwormlogo.png";

export const NavBar = () => {
  return (
    <div className="navbar-container">
      
      <div className="logo-container">
      <Link to="/">
        <img
          className="logo-nav"
          src={Logo}
          alt="logo"
        />
      </Link>
      </div>

    <ul className="navbar">
      {/* <div className="navBar-container">  */}
      <li className="navbar__item active">
        <Link className="navbar__link" to="/">
          Goals
        </Link>
      </li>
      <li className="navbar__item">
        <Link className="navbar__link" to="/library">
          My Library
        </Link>
      </li>

      <li className="navbar__item">
        <Link className="navbar__link" to="/recommend">
          Recommend
        </Link>
      </li>
      <li className="navbar__item">
        <Link className="navbar__link" to="/bookdata">
          Books
        </Link>
      </li>
      </ul>

      <div className="logout-container">
      <ul className="navbar__logout">
        <Link className="navbar__linkLogout" to="/login">
          Log Out
        </Link>
      </ul>
      </div>

    </div>
  );
};

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
