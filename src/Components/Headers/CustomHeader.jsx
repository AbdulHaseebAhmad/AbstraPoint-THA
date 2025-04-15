import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faClose, faEdit, faSort, faSortAlphaUp, faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";
import "./header.scss";
import { updateColumnHeader } from "../../db/dexieDB";
import {  useSelector } from "react-redux";

export default function CustomHeader({ displayName , column , progressSort }) {
  const inputRef = useRef();
  const [editTitle, setEditTitle] = useState(false);
  const [headerName, setHeaderName] = useState(displayName);
  const sheetId = useSelector((state)=>state.ui.sheetId);
  const [sortState, setSortState] = useState(null);  

   const editTitleHandle = () => {
    setEditTitle(!editTitle);
  };

  const confirmTitleHandle = async () => {
    const newTitle = inputRef.current.value;
    if(newTitle !== ""){
      setHeaderName(newTitle);
      await updateColumnHeader(sheetId,displayName,newTitle);
      window.location.reload();
    }
    setEditTitle(false);
  };

  useEffect(() => {
    const listener = () => setSortState(column.getSort());
    column.addEventListener('sortChanged', listener);
    return () => column.removeEventListener('sortChanged', listener);
  }, [column]);

  const handleSort = (e) => {
    e.stopPropagation();
    progressSort(e.target);  
  };


  return (
    <div className="header-container">
      {!editTitle ? (
        <div className="header">
          <div>{headerName}</div>
          {displayName !== 'Status' && displayName !== 'Notes' && displayName !== 'Pin' && <><FontAwesomeIcon
            icon={faEdit}
            onClick={editTitleHandle}
            className="icon"
            title="Click to edit"
          />
          <div className="sort-icon">
            {sortState === 'asc' ? (
              <FontAwesomeIcon icon={faSortUp} className="icon" title="Click to sort descending" onClick={handleSort}/>
            ) : sortState === 'desc' ? (
              <FontAwesomeIcon icon={faSortDown} className="icon" title="Click to sort ascending" onClick={handleSort}/>
            ) : (
              <FontAwesomeIcon icon={faSortAlphaUp} className="icon" title="Click to sort ascending" onClick={handleSort}/>
            )}
          </div></>}
        </div>
      ) : (
        <div className="header">
          <input type="text" className="input" ref={inputRef} placeholder="Add a new header" defaultValue={displayName}/>
          <FontAwesomeIcon
            icon={faClose}
            onClick={editTitleHandle}
            className="icon delete"
            title="Click to cancel"
          />
          <FontAwesomeIcon
            icon={faCheck}
            onClick={confirmTitleHandle}
            className="icon confirm"
            title="Click to submit"
          />
        </div>
      )}
    </div>
  );
}
