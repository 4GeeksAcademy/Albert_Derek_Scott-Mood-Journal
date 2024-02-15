import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../img/SerenityScribe.png";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">
        <img src={Logo} width="30" height="30" alt="Logo" />
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <a className="nav-link" href="/register/">
              Register
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/login/">
              Login
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
