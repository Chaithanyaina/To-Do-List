import React from "react";
import Note from "./Note";

const notes = [
  { title: "Project Ideas", content: "Build a to-do app, portfolio, or weather app." },
  { title: "Reminders", content: "Buy groceries, complete assignments, and work out." },
  { title: "Goals for 2025", content: "Become a full-stack developer, get a job at FAANG, and travel." }
];

function NotesGrid() {
  return (
    <div className="notes-container">
      {notes.map((note, index) => (
        <Note key={index} title={note.title} content={note.content} />
      ))}
    </div>
  );
}

export default NotesGrid;
