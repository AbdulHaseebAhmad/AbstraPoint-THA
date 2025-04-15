import Dexie from 'dexie';
import createEmptySheetsArray from '../Templates/Template';
const db = new Dexie('sheetsApp');

db.version(1).stores({
    sheets: 'id',  
});

export const addSheet = async () => {
    const sheet = createEmptySheetsArray();
    await db.sheets.add(sheet);
    return sheet.id;
};
  

export const getSheet = async (id) => {
    const sheet = await db.sheets.get(id);
    return sheet;
}

export const deleteSheet = async (id) => {
    await db.sheets.delete(id);
}

export const renameSheet = async (id,name) => {
    if(name !== ''){
        await db.sheets.update(id,{
            sheetName:name,
        })
    }
}

export const updateRowAuthor = async (sheetId, rowid, newAuthor) => {
    await db.sheets.where('id').equals(sheetId).modify(sheet => {
      sheet.rows = sheet.rows.map(row => {
        if (row.id === rowid) {
          return {
            ...row,
            Status: {
              ...row.Status,
              Author: newAuthor
            }
          };
        }
        return row;
      });
    });
  };

export const updateRowStatus = async (sheetId, rowid, newStatus) => {
    await db.sheets.where('id').equals(sheetId).modify(sheet => {
      sheet.rows = sheet.rows.map(row => {
        if (row.id === rowid) {
          return {
            ...row,
            Status: {
              ...row.Status,
              'Read Status': newStatus
            }
          };
        }
        return row;
      });
    });
  };
export const updateRowNotes = async (sheetId, rowid, newNote) => {
    await db.sheets.where('id').equals(sheetId).modify(sheet => {
      sheet.rows = sheet.rows.map(row => {
        if (row.id === rowid) {
          return {
            ...row,
            Notes: newNote
          };
        }
        return row;
      });
    });
  };
  export const updateColumnHeader = async (sheetId, oldHeader, newHeader) => {
    await db.sheets.where('id').equals(sheetId).modify(sheet => {
      sheet.rows = sheet.rows.map(row => {
        const { [oldHeader]: ol, ...remaining } = row;
          return { [newHeader]: ol, ...remaining };
      });
    });
  };
  
  

export default db;

