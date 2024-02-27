import React, {useContext}from "react";
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { notes , updateNote} = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
        <div className="d-flex">
            <h5 className="card-title align-items-center"> {notes.title}</h5>
            <i class="fa-solid fa-trash mx-2" onClick={() => {deleteNote(notes._id); props.showAlert("Note Deleted", "success");}}></i>
          <i class="fa-solid fa-file-pen mx-2" onClick={() => {updateNote(notes); props.showAlert("Note Updated", "success");}}></i>
        </div>
          
          <p className="card-text"> {notes.description}</p>
          
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
