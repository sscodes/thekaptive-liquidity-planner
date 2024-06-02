export interface RowDataType {
  id: string;
  parentId: string | null;
  value: string[];
  isTotal: boolean;
}

export interface RowsType {
  'Liquid funds': RowDataType;
  'Cashbox-Bank': RowDataType;
  Inflow: RowDataType;
  Sales: RowDataType;
  'Loan disbursement': RowDataType;
  'Private deposits/equity': RowDataType;
  'Other incoming payments': RowDataType;
  'Other income': RowDataType;
  'Cash in (total)': RowDataType;
  Outflow: RowDataType;
  'Use of goods/materials': RowDataType;
  'Heating, electricity, water, gas': RowDataType;
  'Personnel costs': RowDataType;
  'Room costs / rent': RowDataType;
  'Marketing and advertisement': RowDataType;
  'Vehicle costs (operational)': RowDataType;
  'Traveling expenses': RowDataType;
  'Telephone, Fax, Internet': RowDataType;
  'Office supplies, packaging': RowDataType;
  'Repairs, maintenance': RowDataType;
  'Insurance (company)': RowDataType;
  'Contributions and fees': RowDataType;
  Leasing: RowDataType;
  'Advice and bookkeeping': RowDataType;
  'Cost of capital / interest': RowDataType;
  'Repayment (loan)': RowDataType;
  'Cash out (total)': RowDataType;
  Total: RowDataType;
  Cumulative: RowDataType;
  'Credit line': RowDataType;
  'Credit line overdraft': RowDataType;
}

export type CellType = {
  type: string;
  text: string;
  className?: string;
  columnId?: string;
};

export type RowType = {
  rowId: string;
  cells: CellType[];
  height: number;
};
