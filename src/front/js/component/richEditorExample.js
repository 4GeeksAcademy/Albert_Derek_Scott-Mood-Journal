import React, { useState, useRef, useEffect } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import "draft-js/dist/Draft.css"; // Make sure to import Draft.css
import "../../styles/richEditorExample.css"; // Adjust the path as necessary

// Custom styles for blocks
const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
  }
}

// Button component for styles
const StyleButton = ({ onToggle, style, active, label }) => {
  const handleToggle = (e) => {
    e.preventDefault();
    onToggle(style);
  };

  let className = "RichEditor-styleButton";
  if (active) {
    className += " RichEditor-activeButton";
  }

  return (
    <span className={className} onMouseDown={handleToggle}>
      {label}
    </span>
  );
};

// Block style controls
const BlockStyleControls = ({ editorState, onToggle }) => {
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  const BLOCK_TYPES = [
    { label: "Title Syle", style: "header-one" },
    // { label: "H2", style: "header-two" },
    // { label: "H3", style: "header-three" },
    // { label: "H4", style: "header-four" },
    // { label: "H5", style: "header-five" },
    // { label: "H6", style: "header-six" },
    // { label: "Blockquote", style: "blockquote" },
    // { label: "UL", style: "unordered-list-item" },
    // { label: "OL", style: "ordered-list-item" },
    // { label: "Code Block", style: "code-block" },
  ];

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

// Inline style controls
const InlineStyleControls = ({ editorState, onToggle }) => {
  const currentStyle = editorState.getCurrentInlineStyle();
  const INLINE_STYLES = [
    { label: "Bold", style: "BOLD" },
    { label: "Italic", style: "ITALIC" },
    { label: "Underline", style: "UNDERLINE" },
    { label: "Monospace", style: "CODE" },
  ];

  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

// Main editor component
const RichEditorExample = ({ onContentChange, initialContent }) => {
  const [editorState, setEditorState] = useState(() => {
    if (initialContent) {
      const content = convertFromRaw(JSON.parse(initialContent));
      return EditorState.createWithContent(content);
    }
    return EditorState.createEmpty();
  });
  const editorRef = useRef(null);

  const focusEditor = () => {
    editorRef.current.focus();
  };

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const toggleBlockType = (blockType) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const toggleInlineStyle = (inlineStyle) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  useEffect(() => {
    if (initialContent) {
      const contentState = convertFromRaw(JSON.parse(initialContent));
      if (!editorState.getCurrentContent().equals(contentState)) {
        const newEditorState = EditorState.push(editorState, contentState, 'insert-characters');
        setEditorState(EditorState.moveFocusToEnd(newEditorState));
      }
    }
  }, [initialContent]);

  const onChange = (newEditorState) => {
    setEditorState(newEditorState);
    const contentRaw = convertToRaw(newEditorState.getCurrentContent());
    onContentChange(JSON.stringify(contentRaw));
  };

  let className = "RichEditor-editor";
  const contentState = editorState.getCurrentContent();
  if (!contentState.hasText()) {
    if (contentState.getBlockMap().first().getType() !== "unstyled") {
      className += " RichEditor-hidePlaceholder";
    }
  }

  return (
    <div className="RichEditor-root">
      <BlockStyleControls
        editorState={editorState}
        onToggle={toggleBlockType}
      />
      <InlineStyleControls
        editorState={editorState}
        onToggle={toggleInlineStyle}
      />
      <div className={className} onClick={focusEditor}>
        <Editor
          blockStyleFn={getBlockStyle}
          customStyleMap={styleMap}
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          onChange={onChange}
          placeholder="Tell a story..."
          ref={editorRef}
          spellCheck={true}
        />
      </div>
    </div>
  );
};

export default RichEditorExample;
