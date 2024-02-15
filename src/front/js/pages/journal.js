import React from "react";
import JournalListSideBar from "../component/journalListSideBar.js";
// import TextEditor from "../component/textEditor.js";
import RichEditorExample from "../component/richEditorExample.js";

const Journal = () => (
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-3 vh-100 overflow-auto">
        <JournalListSideBar />
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
