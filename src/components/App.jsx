import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Header from "./Header";
import Footer from "./Footer";
import CreateArea from "./CreateArea";
import Note from "./Note";

function App() {
  const [notes, setNotes] = useState([]);

  // Load saved notes from local storage and delete them if older than 24 hours
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("notesData"));
    if (savedData) {
      const { notes, timestamp } = savedData;
      const currentTime = new Date().getTime();
      if (currentTime - timestamp > 24 * 60 * 60 * 1000) {
        localStorage.removeItem("notesData");
        setNotes([]);
      } else {
        setNotes(notes);
      }
    }
  }, []);

  // Save notes to local storage whenever they change
  useEffect(() => {
    const data = { notes, timestamp: new Date().getTime() };
    localStorage.setItem("notesData", JSON.stringify(data));
  }, [notes]);

  // Add a new note with priority
  function addNote(newNote) {
    setNotes((prevNotes) => [...prevNotes, newNote]);
  }

  // Delete a note based on its index
  function deleteNote(id) {
    setNotes((prevNotes) => prevNotes.filter((_, index) => index !== id));
  }

  // Clear all notes and remove them from local storage
  function clearAllNotes() {
    setNotes([]);
    localStorage.removeItem("notesData");
  }

  // Handle Drag & Drop to rearrange notes
  function onDragEnd(result) {
    if (!result.destination) return;
    const reorderedNotes = [...notes];
    const [movedItem] = reorderedNotes.splice(result.source.index, 1);
    reorderedNotes.splice(result.destination.index, 0, movedItem);
    setNotes(reorderedNotes);
  }

  return (
    <div className="container">
      <Header />
      <div className="hero">
        <h1>To-Do List</h1>
        <p>Stay productive with your personal to-do list ✨</p>
      </div>
      
      {/* Create note area */}
      <CreateArea onAdd={addNote} />

      {/* Clear All button */}
      <button className="clear-btn" onClick={clearAllNotes}>Clear All</button>

      {/* Drag & Drop Context for Notes */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="notes">
          {(provided) => (
            <div className="notes-container" {...provided.droppableProps} ref={provided.innerRef}>
              {notes.map((note, index) => (
                <Draggable key={index} draggableId={index.toString()} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {/* Individual Note Component */}
                      <Note 
                        key={index} 
                        id={index} 
                        title={note.title} 
                        content={note.content} 
                        priority={note.priority} 
                        onDelete={deleteNote} 
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <Footer />
    </div>
  );
}

export default App;
