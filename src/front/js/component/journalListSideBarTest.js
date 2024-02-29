import React, { useContext, useEffect, useState } from "react";
import { Sidebar, Menu } from "react-pro-sidebar";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import "../../styles/index.css"; // Ensure this path is correct

function JournalListSideBar() {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getJournal();
  }, []);

  return (
    <Sidebar>
      <Menu>
        {store.journals.map((journal) => (
          <Link key={journal.id} to={`/journal/${journal.id}`}>
            <div>{new Date(journal.created_at).toLocaleDateString()}</div>
          </Link>
        ))}
      </Menu>
    </Sidebar>
  );
}

export default JournalListSideBar;
