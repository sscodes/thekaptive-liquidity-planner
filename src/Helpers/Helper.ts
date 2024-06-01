import { HEADER } from '../Constants/Constants';
import { RowDataType, RowsType } from '../Types/Types';

export const getRowHeaders = (data: RowsType) => {
  let rowHeaders = [];
  for (let key in data) {
    rowHeaders.push(key);
  }
  return rowHeaders;
};

export const generateColumn = (val: string) => {
  return { columnId: val, width: 240, resizable: true };
};

export const generateRow = (val: string, rowData: RowDataType) => {
  let cells = [];
  let j = 0;
  for (let i in HEADER.cells) {
    if (j === 0) {
      cells.push({
        columnId: HEADER.cells[i].text,
        text: val,
        type: 'text',
      });
    } else if (rowData.value.length > 0)
      cells.push({
        columnId: HEADER.cells[i].text,
        text: rowData.value[j - 1].toString(),
        type: 'text',
      });
    else cells.push({ columnId: HEADER.cells[i].text, text: '', type: 'text' });
    j++;
  }
  return {
    rowId: val,
    cells,
  };
};
