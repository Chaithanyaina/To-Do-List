import React from "react";

function Note({ id, title, content, priority, onDelete }) {
  // Assign priority colors
  const priorityColors = {
    low: "#4CAF50",   // Green
    medium: "#FFC107", // Yellow
    high: "#F44336",  // Red
  };

  return (
    <div className="note" style={{ borderLeft: `8px solid ${priorityColors[priority] || "#ccc"}` }}>
      <h1>{title}</h1>
      <p>{content}</p>
      <button onClick={() => onDelete(id)}>🗑️</button>
    </div>
  );
}

export default Note;
