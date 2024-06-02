import { Box } from '@mui/material';
import { Id, MenuOption, ReactGrid } from '@silevis/reactgrid';
import { Dispatch, SetStateAction, useState } from 'react';
import {
  generateColumn,
  generateHeaderRow,
  generateRow,
} from '../../Helpers/Helper';
import { RowType, RowsType } from '../../Types/Types';
import './FinancialLiquidityTable.css';

const FinancialLiquidityTable = ({
  headerColour,
  headerBackground,
  data,
  setShowColourPickerModal,
}: {
  headerColour: string;
  headerBackground: string;
  data: RowsType;
  setShowColourPickerModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const HEADER: RowType = generateHeaderRow();
  const initColumns = () => {
    let cols = [];
    for (let i in HEADER.cells) {
      cols.push(generateColumn(HEADER.cells[i].text));
    }
    return cols;
  };

  const initRows = () => {
    let rows: RowType[] = [HEADER];
    for (let i in data) {
      rows.push(generateRow(i, data[i as keyof RowsType], HEADER));
    }
    return rows;
  };

  const [columns, setColumns] = useState(initColumns);
  const [rows, ] = useState(initRows);

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
            console.log('hello');
            setShowColourPickerModal(true);
          },
        },
      ];
    }
    return menuOptions;
  };

  return (
    <Box className='table'>
      <style>
        {`
          .col-header-cell {
            background-color: ${headerBackground};
            font-weight: 700;
            display: flex;
            justify-content: center;
          }

          .rg-cell.rg-text-cell.valid.col-header-cell{
            color: ${headerColour};
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
      />
    </Box>
  );
};

export default FinancialLiquidityTable;
