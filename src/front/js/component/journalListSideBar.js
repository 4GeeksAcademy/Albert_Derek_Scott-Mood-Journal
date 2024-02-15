// journalListSideBar.js
import React from "react";

function JournalListSideBar() {
  return (
    <div className="sidebar-sticky">
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
  );
}

export default JournalListSideBar;
