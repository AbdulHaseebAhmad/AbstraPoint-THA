import React, { useEffect, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
ModuleRegistry.registerModules([AllCommunityModule]);
import CustomHeader from "../../Components/Headers/CustomHeader";
import CustomStatusCell from "../../Components/StatusCell/CustomStatusCell";
import CustomNotesCell from "../../Components/NotesCell/CustomNotesCell";
import { useLiveQuery } from "dexie-react-hooks";
import db from "../../db/dexieDB";
import { useSelector } from "react-redux";


export default function Table() {
  const sheetId = useSelector((state)=> state.ui.sheetId)
  const localSheet = useLiveQuery(() => db.sheets.get(sheetId), [sheetId]);  
  const pinnedRowId = useSelector((state)=>state.ui.pinnedRowId);
  const [rowData, setRowData] = useState();
  const [colDefs, setColDefs] = useState();
  const gridApiRef = useRef(null);
  const gridOptions = {
    domLayout: "autoHeight",
    rowHeight: 140,  
   };

  const onGridReady = (params) => {
  gridApiRef.current = params.api;}

  useEffect(() => {
    if (gridApiRef ) {
        if(localSheet?.rows && pinnedRowId !== null){
          const pinnedRows = localSheet.rows.filter(row => row.id === pinnedRowId);
          gridApiRef.current?.setGridOption('pinnedTopRowData', pinnedRows);
        }else{
          gridApiRef.current?.setGridOption('pinnedTopRowData', []);
        }

     
    }
  }, [gridApiRef, localSheet, pinnedRowId]);

    const pinnedrowHandle = (id) => {
      if (!gridApiRef) {
        return;
      };
      const pinnedRows = localSheet?.rows?.filter(row => row.id === id) ?? [];
      gridApiRef.current?.setGridOption('pinnedTopRowData', pinnedRows);
    };

  const col = [
    {
    field: "Pin",
    suppressMovable: true,
    width: 80,
    pinned: "left",
    cellRenderer:(params)=><button style={{height:'100%',width:'100%',background:'transparent',border:'none',cursor:'pointer'}} type='checkbox' onClick={()=>pinnedrowHandle(params.data.id)} />,
     cellStyle: {
      borderRight: "1px solid #ccc",
      textAlign:'center',
      lineHeight:'1.2',whiteSpace:'normal',
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      padding:0,
      margin:0,
    },
    resizable: false,
  },
  {
    field: "Status",
    suppressMovable: true,
    headerComponent: CustomHeader,
    cellRenderer: (params) => <CustomStatusCell id={params?.data?.id} Author={params?.data?.Status?.Author} readStatus={params?.data?.Status?.['Read Status']} />,
    sortable: true,
    pinned: "left",
    width: 200,
    cellStyle: {
      borderRight: "1px solid #ccc",
      padding: 0,
      margin: 0,
    },
  } ,{
    field: "Notes",
    suppressMovable: true,
    headerComponent: CustomHeader,
    pinned: "right",
    cellRenderer:(params)=><CustomNotesCell note={params?.data?.Notes} id={params?.data?.id} />,
    cellStyle: {
      borderLeft: "1px solid #ccc",
      padding:0,  
      margin: 0,
      whiteSpace: 'normal',
      textAlign:'center',
      lineHeight:'1.2'
   },
  }
  ];
  useEffect(()=>{
     setRowData(localSheet?.rows)
     let remaingColmuns = localSheet?.rows?.[0] ? Object.keys(localSheet?.rows[0]).filter((key)=> key !== 'id' && key !== 'Status' && key !== 'Notes' ).map((eachKey)=>{return {
      field: eachKey,
      headerComponent: CustomHeader,
      sortable: true,
      cellStyle: {
        borderRight: "1px solid #ccc",
        textAlign:'center',
        lineHeight:'1.2',
        whiteSpace:'normal',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
      },
      resizable: false,
    }}) : []
     setColDefs( [...col,...remaingColmuns]);
   },[localSheet])

  return (
    <div style={{ height: 500, width: "90%", margin: "auto", overflow:'scroll' }}>
      {localSheet?.rows?.[0] ? <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        gridOptions={gridOptions}
        onGridReady={onGridReady}
        getRowStyle={params => ({
          background: params.node.rowIndex % 2 === 0 ? '#FDF3DC' : '#FAEBC8',
          borderBottom: '2px solid #FFDAB9',  
        })}
      /> : <div>
        <p>No Data To Show, Kindly add a new sheet or choose an existing one</p></div>}
    </div>
  );
}







    