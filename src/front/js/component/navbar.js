
import React, { useContext, useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../img/SerenityScribe.png";
import { Context } from "../store/appContext";
import { affirmations } from '../../../data/positiveAffirmations';



export const Navbar = () => {
  const navigate = useNavigate();
  const { store } = useContext(Context);
  const [currentAffirmation, setCurrentAffirmation] = useState(affirmations[0]);

let fullName = ""
if(store.user !== null) {
fullName = store.user.full_name
};

useEffect(() => {
  const intervalId = setInterval(() => {
    setCurrentAffirmation(affirmations[Math.floor(Math.random() * affirmations.length)]);
  }, 10000);


  return () => clearInterval(intervalId);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
    window.location.href = "/login";
  };
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
      <div className="ms-auto">
        {!sessionStorage.getItem("token") ? (
          <>
            <Link to="/login">
              <button className="btn btn-primary">Login</button>
            </Link>
            <Link to="/register">
              <button className="btn btn-secondary">Register</button>
            </Link>
          </>
        ) : (
          <div className="nav-item dropdown">
             <div className="navbar-banner">
              {currentAffirmation.description}
            </div>
            <button
              className="btn btn-primary dropdown-toggle"
              id="navbarDropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {fullName || 'Profile'}
            </button>
            <ul
              className="dropdown-menu"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <li>
                <Link className="dropdown-item" to="/journal">
                  Journal
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/profile">
                  Settings
                </Link>
              </li>
              <li>
                <button className="dropdown-item" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};