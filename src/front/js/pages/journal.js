import React from "react";
import JournalListSideBar from "../component/journalListSideBar.js";
import TextEditor from "../component/textEditor.js";

export default function Journal() {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 vh-100 overflow-auto">
          <JournalListSideBar />
        </div>

        {/* Main Content */}
        <div className="col-md-9">
          <h1>Journal</h1>
          <div className="editorContainer">
            <TextEditor />
          </div>

          {/* Additional content goes here */}
        </div>
      </div>
    </div>
  );
}
