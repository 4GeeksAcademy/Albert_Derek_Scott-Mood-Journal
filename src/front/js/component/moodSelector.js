import React, { useState, useEffect } from "react";

const MoodSelector = ({ onMoodChange, moods, initialMoodId }) => {
  // Accept onMoodChange as a prop
  // State to keep track of the selected mood
  const [selectedMoodId, setSelectedMoodId] = useState(null);

  useEffect(() => {
    setSelectedMoodId(initialMoodId);
  }, [initialMoodId]);

  // Handler for when a new mood is selected from the dropdown
  const handleMoodChange = (event) => {
    const id = Number(event.target.value);
    setSelectedMoodId(id);
    onMoodChange(id); // Call onMoodChange with the selected mood's ID
  };

  // Find the selected mood object from the moods array
  const selectedMood = moods.find((mood) => mood.id === selectedMoodId);

  return (
    <div>
      <select
        onChange={handleMoodChange}
        value={selectedMoodId || ""}
        style={{
          margin: "10px 0",
          width: "100%",
          fontFamily: "inherit",
          fontSize: "inherit",
          cursor: "inherit",
          lineHeight: "inherit",
          background:
            "linear-gradient(45deg, rgb(255, 107, 107), rgb(255, 166, 158), rgb(255, 211, 182))",
          border: "none",
          borderRadius: "5px",
        }}
      >
        <option value="">Select your mood</option>
        {moods.map((mood) => (
          <option key={mood.id} value={mood.id}>
            {mood.name}
          </option>
        ))}
      </select>
      {selectedMood && (
        <div>
          <h2>{selectedMood.name}</h2>
          <p>{selectedMood.description}</p>
        </div>
      )}
    </div>
  );
};

export default MoodSelector;
