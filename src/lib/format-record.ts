import { FinancialRecord as PrismaRecord } from "@prisma/client";
import { FinancialRecord, FinancialRecordWithId } from "@/types/financial";
import { Decimal } from "@prisma/client/runtime/library";

function formatMoney(value: Decimal | number): string {
  const num = value instanceof Decimal ? value.toNumber() : value;
  return `$${num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatDate(date: Date): string {
  const d = new Date(date);
  const month = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  const year = d.getUTCFullYear();
  return `${month}/${day}/${year}`;
}

export function toFinancialRecord(db: PrismaRecord): FinancialRecord {
  return {
    Segment: db.segment,
    Country: db.country,
    Product: db.product,
    "Discount Band": db.discountBand,
    "Units Sold": formatMoney(db.unitsSold),
    "Manufacturing Price": formatMoney(db.manufacturingPrice),
    "Sale Price": formatMoney(db.salePrice),
    "Gross Sales": formatMoney(db.grossSales),
    Discounts: formatMoney(db.discounts),
    Sales: formatMoney(db.sales),
    COGS: formatMoney(db.cogs),
    Profit: formatMoney(db.profit),
    Date: formatDate(db.date),
    "Month Number": String(db.monthNumber),
    "Month Name": db.monthName,
    Year: String(db.year),
  };
}

export function toFinancialRecordWithId(db: PrismaRecord): FinancialRecordWithId {
  return {
    id: db.id,
    ...toFinancialRecord(db),
  };
}
