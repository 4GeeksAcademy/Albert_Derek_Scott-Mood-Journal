import React, { useContext, useEffect, useState } from "react";
import { Sidebar, Menu } from "react-pro-sidebar";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import "../../styles/index.css"; // Ensure this path is correct

function JournalListSideBar() {
  const { actions } = useContext(Context);
  const [journals, setJournals] = useState([]);

  useEffect(() => {
    actions
      .getJournal()
      .then((data) => {
        // Validate if data is an array before setting the state
        if (Array.isArray(data)) {
          setJournals(data);
        } else {
          // Log an error or handle this case appropriately
          console.error("Fetched data is not an array:", data);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch journals:", error);
      });
  }, [actions]);

  return (
    <Sidebar>
      <Menu>
        {journals.map((journal) => (
          <Link key={journal.id} to={`/journal/${journal.id}`}>
            <div>{new Date(journal.created_at).toLocaleDateString()}</div>
          </Link>
        ))}
      </Menu>
    </Sidebar>
  );
}

export default JournalListSideBar;
