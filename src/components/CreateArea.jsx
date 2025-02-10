import React, { useState } from "react";

function CreateArea(props) {
  // State to store note details
  const [note, setNote] = useState({ title: "", content: "", priority: "low" });

  // Controls whether the note input area is expanded
  const [isExpanded, setIsExpanded] = useState(true);

  // Handles changes in the title and content fields
  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevNote) => ({ ...prevNote, [name]: value }));
  }

  // Sets the selected priority level
  function setPriority(priority) {
    setNote((prevNote) => ({ ...prevNote, priority }));
  }

  // Submits the note and resets the input fields
  function submitNote(event) {
    event.preventDefault();

    if (note.title.trim() || note.content.trim()) {
      props.onAdd(note); // Pass the note to the parent component
      setNote({ title: "", content: "", priority: "low" }); // Reset fields
      setIsExpanded(false); // Collapse the input area after submission
    }
  }

  return (
    <div className={`create-note ${isExpanded ? "expanded" : ""}`} onClick={() => !isExpanded && setIsExpanded(true)}>
      
      {/* When collapsed, show "Take a note..." placeholder */}
      {!isExpanded && (
        <input type="text" placeholder="Take a note..." readOnly />
      )}

      {/* When expanded, show title, content, and priority selection */}
      {isExpanded && (
        <>
          <input 
            name="title" 
            placeholder="Title" 
            value={note.title} 
            onChange={handleChange} 
          />
          <textarea 
            name="content" 
            placeholder="Write your note..." 
            value={note.content} 
            onChange={handleChange} 
          />

          {/* Priority Selection - User clicks a circle to set priority */}
          <div className="priority-selector">
            <div className="priority-option" onClick={() => setPriority("low")}>
              <div className={`circle ${note.priority === "low" ? "selected" : ""}`} style={{ background: "#4CAF50" }}></div>
              <span>Low Priority</span>
            </div>
            <div className="priority-option" onClick={() => setPriority("medium")}>
              <div className={`circle ${note.priority === "medium" ? "selected" : ""}`} style={{ background: "#FFC107" }}></div>
              <span>Medium Priority</span>
            </div>
            <div className="priority-option" onClick={() => setPriority("high")}>
              <div className={`circle ${note.priority === "high" ? "selected" : ""}`} style={{ background: "#F44336" }}></div>
              <span>High Priority</span>
            </div>
          </div>

          {/* Add Note Button */}
          <button onClick={submitNote}>+</button>
        </>
      )}
    </div>
  );
}

export default CreateArea;
