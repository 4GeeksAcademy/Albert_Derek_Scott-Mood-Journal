import React from "react";
// import JournalListSideBar from "../component/journalListSideBar.js";
import JournalListSideBarTest from "../component/journalListSideBarTest.js";
// import TextEditor from "../component/textEditor.js";
import RichEditorExample from "../component/richEditorExample.js";

const Journal = () => (
  <div className="journal-body container-fluid ">
    <div className="row">
      <div className="side-bar vh100 overflow-auto">
        {/* <JournalListSideBar /> */}
        <JournalListSideBarTest />
      </div>
      <div className="col-md-9">
        <div className="editorContainer justify-content-center align-text-center">
          <h1 className="mb-4">Journal</h1>
          {/* <TextEditor /> */}
          <RichEditorExample />
          <div className="d-flex justify-content-end">
            <button type="button" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Journal;
