import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import {dkeeper} from "/Users/apple/Desktop/internet_computer_projects/dkeeper/src/declarations/dkeeper";

function App() {

  const [notes, setNotes] = useState([]);

  React.useEffect(() => {
    fetchData();
    console.log(notes, 'reload');
  }, [])
  
  async function fetchData(){
    const notes = await dkeeper.getNotes()
    setNotes(notes)
  }
  
  function addNote(newNote) {
    setNotes(prevNotes => {
      dkeeper.creatNeote(newNote.title, newNote.content)
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    dkeeper.deleteNote(id);
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });

  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
