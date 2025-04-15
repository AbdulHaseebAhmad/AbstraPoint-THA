import React, { useRef, useState } from "react";
import "./NoteCell.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faCheck, faEdit, faX } from "@fortawesome/free-solid-svg-icons";
import { updateRowNotes } from "../../db/dexieDB";
import { useSelector } from "react-redux";

export default function CustomNotesCell({note,id}) {
    const noteRef = useRef();
  const [editNote, setEditNote] = useState(false);
  const [currentNote,setCurrentNote] = useState(note);
  const sheetId = useSelector((state)=>state.ui.sheetId);

  const onSaveHandle = async () => {
    const newNote = noteRef.current.value;
    if(newNote !== ''){
        setCurrentNote(newNote)
        await updateRowNotes(sheetId,id,newNote)
      }
    setEditNote(false);
    }

    const toggleEdit = () => {
        setEditNote(!editNote)
    }
  return (
    <div className="note-cell-wrapper">
      {editNote ? (
        <div className="note-cell-container">
          <textarea type="textbox" ref={noteRef} defaultValue={currentNote} />
            <div className="note-cell-actions">
                <FontAwesomeIcon icon={faCheck} onClick={onSaveHandle} style={{color:'green',cursor:'pointer'}} title='Save New Note' />
                <FontAwesomeIcon icon={faX} onClick={toggleEdit} style={{color:'red',cursor:'pointer'}} title='Cancel Edit'/>            
            </div>
        </div>
      ) : (
          <div className="note-preview-container">
            <p>{currentNote}</p>
            <FontAwesomeIcon className="edit-icon" onClick={toggleEdit} icon={faEdit} style={{ alignSelf:'end',cursor:'pointer'}} title="Click To Edit"/>
        </div>
      )}
    </div>
  );
}
