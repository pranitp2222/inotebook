import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    // const s1 = {
    //     "name" : "pranit",
    //     "class" : "5b"
    // }

    // const [state, setState] = useState(s1);
    // const update = () => {
    //     setTimeout(() => {
    //         setState({
    //             "name" : "Larry",
    //             "class" : "6a"
    //         })
    //     }, 1000);
   // }
   const host = "http://localhost:5050"
   const noteInitial = []
const [notes, setNotes] = useState(noteInitial)

const getNote = async () =>{
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
      });
      const result = await response.json()
      console.log(result)
      setNotes(result)
}

const addNote = async (title, description, tag) =>{
    const response = await fetch(`${host}/api/notes/addnotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token" : localStorage.getItem('token')
        },
        body: JSON.stringify({title, description, tag})
      });
      const note = await response.json()
      setNotes(notes.concat(note))
      console.log(note)
      
    
}
const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
      });
      const json = response.json();
      console.log(json)
    console.log("Deleting the note with id" + id)
    const newNotes = notes.filter((note) => {return note._id !== id})
    setNotes(newNotes);
}

const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({title, description, tag})
      });
      const json = await response.json()
      console.log(json) 
    let newNotes = JSON.parse(JSON.stringify(notes))
    console.log("NewNote", newNotes)
 for (let index = 0; index < newNotes.length; index++) {
    const element = newNotes[index];
    if(element._id === id){
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
    }
    setNotes(newNotes);
    
 }
}

    return (
        <NoteContext.Provider value = {{notes, addNote, deleteNote, editNote, getNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;