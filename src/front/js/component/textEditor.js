import React, { useState } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css"; // Import the default Draft.css styles
import "../../styles/Journal.css";

const TextEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onChange = (newState) => {
    setEditorState(newState);
  };

  return (
    <div className="text-editor-container">
      <div className="header">My Journal</div> {/* Example header */}
      <Editor
        editorState={editorState}
        onChange={onChange}
        className="editor"
      />
    </div>
  );
};

export default TextEditor;
