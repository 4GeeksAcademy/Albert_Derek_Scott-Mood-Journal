import React, { useState, useContext } from "react";
import JournalListSideBarTest from "../component/journalListSideBarTest.js";
import RichEditorExample from "../component/richEditorExample.js";
import { Context } from "../store/appContext";
import MoodSelector from "../component/moodSelector.js";

//import "../../styles/Journal.css";

const moodOptions = [
  {
    id: 1,
    name: "Happy",
    description:
      "Feeling joyful and uplifted, a state of general contentment and well-being.",
  },
  {
    id: 2,
    name: "Sad",
    description:
      "Feeling down, blue, or unhappy, often with a decrease in energy or motivation.",
  },
  {
    id: 3,
    name: "Anxious",
    description:
      "Feeling worried, nervous, or uneasy, typically about an imminent event or something with an uncertain outcome.",
  },
  {
    id: 4,
    name: "Angry",
    description:
      "Feeling or showing strong annoyance, displeasure, or hostility.",
  },
];

const Journal = () => {
  const { store, actions } = useContext(Context);
  const [editorContent, setEditorContent] = useState("");
  const [moodContent, setMoodContent] = useState("");

  const handleMoodChange = (selectedMoodId) => {
    setMoodContent(selectedMoodId);
    console.log(`Selected mood ID: ${selectedMoodId}`); // Optional: for debugging
  };

  const handleSubmit = () => {
    // Create the journal object
    const journal = {
      content: editorContent,
      mood_id: parseInt(moodContent, 10), // parse moodContent to ensure it's an integer
    };

    // Call the action to save the journal entry
    actions.submitJournal(journal);

    console.log(editorContent);
    console.log(moodContent);
  };

  return (
    <div className="journal-body container-fluid">
      {/* Your existing layout and components */}
      <div className="row">
        <div className="col-md-3 side-bar vh-100 overflow-auto">
          <JournalListSideBarTest />
        </div>
        <div className="col-md-9 d-flex justify-content-center">
          <div className="row justify-content-center" style={{ width: "100%" }}>
            <div className="col-md-4">
              <div className="editorContainer text-center">
                <h1 className="mb-4">Journal</h1>
                <RichEditorExample onContentChange={setEditorContent} />
                <div className="d-flex justify-content-end mt-3">
                  <MoodSelector
                    moods={moodOptions}
                    onMoodChange={handleMoodChange}
                  />
                  <button
                    onClick={handleSubmit}
                    type="button"
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journal;
