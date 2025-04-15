import React, { useRef } from "react";
import "./StatusCell.scss";
import { useSelector } from "react-redux";
import { updateRowAuthor, updateRowStatus } from "../../db/dexieDB";

export default function CustomStatusCell({id,Author,readStatus}) {
    const authorRef = useRef(null);
    const statusRef = useRef(null);
    const sheetId = useSelector((state)=>state.ui.sheetId);
     const onAuthorSelectHandle = async () => {
      const newAuthor = authorRef.current.value;
      await updateRowAuthor(sheetId,id, newAuthor);
    };

    const onStatusSelectHandle = async () => {
      const newStatus = statusRef.current.value;
      await updateRowStatus(sheetId,id, newStatus);
    };
   return (
    <div className="status-container">
      <div className="status-cell">
        <h3>Author</h3>
        <div className="select-container">
          <select ref={authorRef} onChange={onAuthorSelectHandle} name="Author" className="select" defaultValue={Author}>
            <option value="Romail">Romail</option>
            <option value="Thappar">Thappar</option>
            <option value="Rowlings">Rowlings</option>
            <option value="George">George</option>
          </select>
        </div>
      </div>
      <div className="status-cell">
        <h3>Read Status</h3>
        <div className="select-container">
          <select ref={statusRef} onChange={onStatusSelectHandle} name="Status" className="select" defaultValue={readStatus}>
            <option value="Read">Read</option>
            <option value="UnRead">UnRead</option>
            <option value="In-Progress">In-Progress</option>
            
          </select>
        </div>
      </div>
    </div>
  );
}
