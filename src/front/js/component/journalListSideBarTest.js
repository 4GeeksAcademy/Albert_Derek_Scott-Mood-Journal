import React, { useState, useEffect, useRef } from "react";
import "../../styles/index.css"; // Ensure your CSS file is imported
import SlidingPanel from "react-sliding-side-panel";

function JournalListSideBarTest() {
  const [openPanel, setOpenPanel] = useState(false);
  const panelRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setOpenPanel(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <button onClick={() => setOpenPanel(true)}>Open</button>
      <SlidingPanel type={"left"} isOpen={openPanel} size={30}>
        <div ref={panelRef}>
          <div className={openPanel ? "side-bar-visible" : ""}>
            My Panel Content
            <button onClick={() => setOpenPanel(false)}>Close</button>
          </div>
        </div>
      </SlidingPanel>
    </div>
  );
}

export default JournalListSideBarTest;
