import { HEADER_VALUES } from '../Constants/Constants';
import { CellType, RowDataType, RowType, RowsType } from '../Types/Types';

const generateHeaderCell: (text: string) => CellType = (text: string) => {
  return {
    type: 'text',
    text: text,
    className: 'col-header-cell',
    style: {
      fontSize: '1.7em',
    },
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
        style: {
          fontSize: '1.4em',
          background: !rowData.parentId ? '#D6D6D6' : '',
        },
        className: `row-header-cell ${
          rowData.isTotal || !rowData.parentId ? 'total' : ''
        }`,
      });
    } else if (rowData.value.length > 0)
      cells.push({
        columnId: HEADER.cells[i].text,
        text: rowData.value[j - 1],
        type: 'text',
        className: `data-cell ${
          rowData.isTotal || !rowData.parentId ? 'total' : ''
        }`,
        style: {
          background: !rowData.parentId ? '#D6D6D6' : '',
        },
      });
    else
      cells.push({
        columnId: HEADER.cells[i].text,
        text: '',
        type: 'text',
        className: `data-cell ${
          rowData.isTotal || !rowData.parentId ? 'total' : ''
        }`,
        style: {
          background: !rowData.parentId ? '#D6D6D6' : '',
        },
      });
    j++;
  }
  return {
    rowId: val,
    cells,
    height: 47,
  };
};

const convertDataToInteger = (data: string) => {
  if (data.length === 0) return 0;
  const withoutThousandsSeparator = data.replace(/\./g, '');
  const withStandardDecimalSeparator = withoutThousandsSeparator.replace(
    ',',
    '.'
  );
  const number = parseFloat(withStandardDecimalSeparator);
  return Math.round(number);
};

export const generateBarChartData = (
  nameList: string[],
  inflowList: string[],
  outflowList: string[]
) => {
  let inflow = inflowList.map((val: string) => convertDataToInteger(val));
  let outflow = outflowList.map((val: string) => convertDataToInteger(val));
  let data = [];
  for (let index = 0; index < nameList.length; index++) {
    data.push({
      name: nameList[index],
      inflow: inflow[index],
      outflow: outflow[index],
    });
  }
  return data;
};

export const generateLineChartData = (
  nameList: string[],
  values: string[],
  paramName: string
) => {
  let numValues = values.map((val: string) => convertDataToInteger(val));
  let data = [];
  for (let index = 0; index < nameList.length; index++) {
    data.push({
      name: nameList[index],
      [paramName]: numValues[index],
    });
  }
  return data;
};

export const getGraphData = (data: RowsType) => {
  const namesList = HEADER_VALUES.slice(1, HEADER_VALUES.length - 1);
  let length = namesList.length;
  let chartData = [
    generateLineChartData(
      namesList,
      data['Cashbox-Bank']['value'].slice(0, length),
      'Cashbox/bank'
    ),
    generateLineChartData(
      namesList,
      data['Credit line overdraft']['value'].slice(0, length),
      'Credit line overdraft'
    ),
    generateBarChartData(
      namesList,
      data['Cash in (total)']['value'].slice(0, length),
      data['Cash out (total)']['value'].slice(0, length)
    ),
  ];
  return chartData;
};
