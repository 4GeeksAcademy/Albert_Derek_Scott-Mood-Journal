import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";

import "../../styles/index.css"; // Adjust this path to match your project structure

function JournalListSideBarTest() {
  return (
    <Sidebar>
      <Menu
        menuItemStyles={{
          button: {
            [`&.active`]: {
              backgroundColor: "#13395e",
              color: "#b6c8d9",
            },
          },
        }}
      >
        <MenuItem component={<Link to="/journal" />}>Today </MenuItem>
        <div className="sticky-btn">
          <MenuItem component={<Link to="/journal" />}> Calendar </MenuItem>
        </div>

        <MenuItem component={<Link to="/journal" />}> Calendar </MenuItem>
        <MenuItem component={<Link to="/journal" />}> E-commerce </MenuItem>
      </Menu>
    </Sidebar>
  );
}

export default JournalListSideBarTest;
