import React, { useState, useRef } from "react";
import "./SheetBar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faPlus,
  faTrash,
  faClose,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { addSheet, deleteSheet, renameSheet } from "../../db/dexieDB";
import { useLiveQuery } from "dexie-react-hooks";
import db from "../../db/dexieDB";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSheetId, setPinnedRow } from "../../Redux/UI/UiSlice";

export default function SheetBar() {
  const localSheets = useLiveQuery(() => db.sheets.toArray(), []);
  const [editIndex, setEditIndex] = useState(null);
  const inputRef = useRef(null);
  const sheetId = useSelector((state) => state.ui.sheetId);

  const dispatch = useDispatch();

  const editTitleHandle = (index) => {
    setEditIndex(index);
  };

  const confirmTitleHandle = (id) => {
    const name = inputRef.current.value;
    renameSheet(id, name);
    setEditIndex(null);
  };

  const toggleSheet = (id) => {
    dispatch(setCurrentSheetId(id));
    dispatch(setPinnedRow(null))
  };

  const addSheetHandle = async () => {
    const response = await addSheet();
    dispatch(setCurrentSheetId(response));
  }
  return (
    <div className="sheetbar-wrapper">
      <div className="sheetbar-container">
        {localSheets?.length > 0 &&
          localSheets.map(({ id, sheetName }, index) => (
            <button
              className="sheetbar-button"
              key={index}
              onClick={() => toggleSheet(id)}
              style={{ background: sheetId === id && "#FBB957",color: sheetId === id && "white" }}
            >
              {editIndex != index ? (
                <>
                  <p>
                    {sheetName && sheetName !== ""
                      ? sheetName
                      : `Sheet ${index + 1}`}
                  </p>
                  <FontAwesomeIcon
                    icon={faEdit}
                    style={{ fontSize: "14px",color:sheetId === id && 'white' }}
                    title="Rename Sheet"
                    className="edit-icon"
                    onClick={() => editTitleHandle(index)}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    style={{ fontSize: "14px" }}
                    className="delete-icon"
                    title="Delete Sheet"
                    onClick={() => deleteSheet(id)}
                  />
                </>
              ) : (
                <>
                  <div className="header">
                    <input
                      type="text"
                      className="input"
                      ref={inputRef}
                      placeholder="Add a new Sheet Name"
                      defaultValue={
                        sheetName ? sheetName : `Sheet ${index + 1}`
                      }
                    />
                    <FontAwesomeIcon
                      icon={faClose}
                      onClick={() => setEditIndex(null)}
                      className="icon delete"
                      title="Click to cancel"
                    />
                    <FontAwesomeIcon
                      icon={faCheck}
                      onClick={() => confirmTitleHandle(id)}
                      className="icon confirm"
                      title="Click to submit"
                    />
                  </div>
                </>
              )}
            </button>
          ))}
        <button className="" onClick={addSheetHandle}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </div>
  );
}

