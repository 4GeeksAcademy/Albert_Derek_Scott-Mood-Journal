import React, { useState } from "react";
import "../../styles/index.css";

function JournalListSideBar() {
  // State to manage sidebar visibility
  const [isVisible, setIsVisible] = useState(true);

  // Function to toggle the sidebar visibility
  const toggleSidebar = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      {/* Button to toggle the sidebar */}
      <button onClick={toggleSidebar} className="toggle-sidebar-btn">
        {isVisible ? "Hide Sidebar" : "Show Sidebar"}
      </button>

      {/* Sidebar */}
      <div
        className={`sidebar-sticky ${
          !isVisible ? "hidden" : "side-bar-visible"
        }`}
      >
        <ul className="nav flex-column">
          <li className="nav-item">
            <a className="nav-link" href="#">
              Link 1
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Link 2
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Link 3
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default JournalListSideBar;
