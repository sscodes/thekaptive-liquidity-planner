import { Box } from '@mui/material';
import {
  CellChange,
  Id,
  MenuOption,
  ReactGrid,
  TextCell,
} from '@silevis/reactgrid';
import { useEffect, useState } from 'react';
import { HEADER_VALUES } from '../../Constants/Constants';
import {
  generateColumn,
  generateHeaderRow,
  generateRow,
} from '../../Helpers/Helper';
import { RowType, RowsType } from '../../Types/Types';
import {
  useColourPicker,
  useColourPickerModalStore,
  useDataStore,
} from '../../Zustand/Store';
import './FinancialLiquidityTable.css';

const FinancialLiquidityTable = () => {
  const HEADER: RowType = generateHeaderRow();
  const initColumns = () => {
    let cols = [];
    for (let i in HEADER.cells) {
      cols.push(generateColumn(HEADER.cells[i].text));
    }
    return cols;
  };
  const { data, setData } = useDataStore((state) => state);
  const setShow = useColourPickerModalStore((state) => state.setShow);
  const { colour, background } = useColourPicker((state) => state);

  const [columns, setColumns] = useState(initColumns);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    let rows: RowType[] = [HEADER];
    for (let i in data) {
      rows.push(generateRow(i, data[i as keyof RowsType], HEADER));
    }
    setRows(rows);
  }, [data]);

  const handleColumnResize = (ci: Id, width: number) => {
    setColumns((prevColumns) => {
      const columnIndex = prevColumns.findIndex((el) => el.columnId === ci);
      const resizedColumn = prevColumns[columnIndex];
      const updatedColumn = { ...resizedColumn, width };
      prevColumns[columnIndex] = updatedColumn;
      return [...prevColumns];
    });
  };

  const handleContextMenu = (
    selectedRowIds: Id[],
    // @ts-ignore
    selectedColIds: Id[],
    // @ts-ignore
    selectionMode: SelectionMode,
    menuOptions: MenuOption[]
  ): MenuOption[] => {
    if (selectedRowIds.includes('header')) {
      menuOptions = [
        ...menuOptions,
        {
          id: 'color-picker',
          label: 'Change Header Colour',
          handler: () => {
            setShow();
          },
        },
      ];
    }
    return menuOptions;
  };

  const handleChanges = (changes: CellChange<TextCell>[]) => {
    let col = HEADER_VALUES.indexOf(changes[0].columnId.toString()) - 1;
    let row = changes[0].rowId.toString();
    let tempData = JSON.parse(JSON.stringify(data));
    tempData[row].value[col] = changes[0].newCell.text;
    console.log(tempData);
    setData(tempData);
  };

  return (
    <Box className='table'>
      <style>
        {`
          .col-header-cell {
            background-color: ${background};
            font-weight: 700;
            display: flex;
            justify-content: center;
          }

          .rg-cell.rg-text-cell.valid.col-header-cell{
            color: ${colour};
          }
        `}
      </style>
      <ReactGrid
        columns={columns}
        rows={rows}
        stickyLeftColumns={1}
        stickyRightColumns={1}
        stickyTopRows={1}
        enableRowSelection
        enableFillHandle
        onColumnResized={handleColumnResize}
        // @ts-ignore
        onContextMenu={handleContextMenu}
        onCellsChanged={handleChanges}
      />
    </Box>
  );
};

export default FinancialLiquidityTable;
