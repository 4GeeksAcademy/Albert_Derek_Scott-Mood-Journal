import React, { useState } from "react";
import JournalListSideBarTest from "../component/journalListSideBarTest.js";
import RichEditorExample from "../component/richEditorExample.js";

const Journal = () => {
  const [editorContent, setEditorContent] = useState("");

  const handleSubmit = () => {
    console.log(editorContent);
  };

  return (
    <div className="journal-body container-fluid">
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
