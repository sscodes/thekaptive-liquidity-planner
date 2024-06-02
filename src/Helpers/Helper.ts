import { HEADER_VALUES } from '../Constants/Constants';
import { CellType, RowDataType, RowType, RowsType } from '../Types/Types';

const generateHeaderCell: (text: string) => CellType = (text: string) => {
  return {
    type: 'text',
    text: text,
    className: 'col-header-cell',
  };
};

export const generateHeaderRow = () => {
  let cells: CellType[] = [];
  HEADER_VALUES.forEach((value, _i) => {
    cells.push(generateHeaderCell(value));
  });
  return {
    rowId: 'header',
    cells,
    height: 74,
  };
};

export const getRowHeaders = (data: RowsType) => {
  let rowHeaders = [];
  for (let key in data) {
    rowHeaders.push(key);
  }
  return rowHeaders;
};

export const generateColumn = (val: string) => {
  if (val.length === 0) return { columnId: val, width: 320, resizable: true };
  return { columnId: val, width: 120, resizable: true };
};

export const generateRow = (
  val: string,
  rowData: RowDataType,
  HEADER: RowType
) => {
  let cells = [];
  let j = 0;
  for (let i in HEADER.cells) {
    if (j === 0) {
      cells.push({
        columnId: HEADER.cells[i].text,
        text: val,
        type: 'text',
        className: 'row-header-cell',
      });
    } else if (rowData.value.length > 0)
      cells.push({
        columnId: HEADER.cells[i].text,
        text: rowData.value[j - 1],
        type: 'text',
        className: 'data-cell',
      });
    else
      cells.push({
        columnId: HEADER.cells[i].text,
        text: '',
        type: 'text',
        className: 'data-cell',
      });
    j++;
  }
  return {
    rowId: val,
    cells,
    height: 47,
  };
};
