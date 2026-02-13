import React from "react";
import FinCard from "./FinCard";
import { FinancialRecord } from "@/types/financial";

export default function TotalIncomeCard({ data }: { data: FinancialRecord[] }) {
  

  return (
    <FinCard title="Total Income" data={data} valueKey="Sales" />
  );
}
