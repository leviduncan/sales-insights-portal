export interface FinancialRecord {
  Segment: string;
  Country: string;
  Product: string;
  "Discount Band": string;
  "Units Sold": string;
  "Manufacturing Price": string;
  "Sale Price": string;
  "Gross Sales": string;
  Discounts: string;
  Sales: string;
  COGS: string;
  Profit: string;
  Date: string;
  "Month Number": string;
  "Month Name": string;
  Year: string;
}

export interface FinancialRecordWithId extends FinancialRecord {
  id: number;
}

export interface FinancialRecordInput {
  segment: string;
  country: string;
  product: string;
  discountBand: string;
  unitsSold: number;
  manufacturingPrice: number;
  salePrice: number;
  grossSales: number;
  discounts: number;
  sales: number;
  cogs: number;
  profit: number;
  date: string;
}
