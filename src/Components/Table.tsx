import { useEffect, useState } from 'react';
import {
  ReactGrid,
  Column,
  Row,
  CellChange,
  Cell,
  TextCell,
} from '@silevis/reactgrid';
import '@silevis/reactgrid/styles.css';
import { HEADER } from '../Data/Data';

// type CustomTextCell = { columnId?: string; text: string; type: string };

const Table = ({ data }) => {
  const generateColumn = (val: string) => {
    return { columnId: val, width: 240, resizable: true };
  };
  const generateRow = (val: string, data) => {
    let cells = [];
    let j = 0;
    for (let i in HEADER.cells) {
      if(j===0){
        cells.push({
          columnId: HEADER.cells[i].text,
          text: val,
          type: 'text',
        });
      }
      else if (data.value.length > 0)
        cells.push({
          columnId: HEADER.cells[i].text,
          text: data.value[j-1].toString(),
          type: 'text',
        });
      else
        cells.push({ columnId: HEADER.cells[i].text, text: '', type: 'text' });
      j++;
    }
    return {
      rowId: val,
      cells,
    };
  };
  const [columns, setColumns] = useState(() => {
    let cols = [];
    for (let i in HEADER.cells) {
      cols.push(generateColumn(HEADER.cells[i].text));
    }
    console.log(cols);
    return cols;
  });
  const [rows, setRows] = useState([]);

  useEffect(() => {
    let rows = [HEADER];
    for (let i in data) {
      rows.push(generateRow(i, data[i]));
    }
    console.log(rows);
    setRows(rows);
  }, [data]);

  return (
    <div className='App'>
      <ReactGrid columns={columns} rows={rows} />
    </div>
  );
};

export default Table;
