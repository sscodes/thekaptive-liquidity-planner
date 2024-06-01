export interface RowDataType {
  id: string;
  parentId: string;
  value: number[];
}

export interface RowsType {
  LiquidFunds: RowDataType;
  'Cashbox-Bank': RowDataType;
  Inflow: RowDataType;
  Sales: RowDataType;
  LoanDisbursement: RowDataType;
  PrivateDepositsEquity: RowDataType;
  OtherIncomingPayments: RowDataType;
  OtherIncome: RowDataType;
  Outflow: RowDataType;
  UseOfGoodsMaterials: RowDataType;
  HeatingElectricityWaterGas: RowDataType;
  PersonnelCosts: RowDataType;
  RoomCostsRent: RowDataType;
  MarketingAdvertisement: RowDataType;
  VehicleCostsOperational: RowDataType;
  TravelingExpenses: RowDataType;
  TelephoneFaxInternet: RowDataType;
  OfficeSuppliesPackaging: RowDataType;
  RepairsMaintenance: RowDataType;
  InsuranceCompany: RowDataType;
  ContributionsFees: RowDataType;
  Leasing: RowDataType;
  AdviceBookkeeping: RowDataType;
  CostOfCapitalInterest: RowDataType;
  RepaymentLoan: RowDataType;
}
