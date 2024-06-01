import { ReactGrid } from '@silevis/reactgrid';
import '@silevis/reactgrid/styles.css';
import { useState } from 'react';
import { HEADER } from '../Constants/Constants';
import { generateColumn, generateRow } from '../Helpers/Helper';
import { RowsType } from '../Types/Types';

const Table = ({ data }: { data: RowsType }) => {
  const initColumns = () => {
    let cols = [];
    for (let i in HEADER.cells) {
      cols.push(generateColumn(HEADER.cells[i].text));
    }
    return cols;
  };

  const initRows = () => {
    let rows = [HEADER];
    for (let i in data) {
      rows.push(generateRow(i, data[i as keyof RowsType]));
    }
    return rows;
  };

  const [columns, setColumns] = useState(initColumns);
  const [rows, setRows] = useState(initRows);

  return (
    <div className='App'>
      <ReactGrid columns={columns} rows={rows} />
    </div>
  );
};

export default Table;
