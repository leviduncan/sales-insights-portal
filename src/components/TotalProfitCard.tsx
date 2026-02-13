import React from "react";
import FinCard from "./FinCard";
import { FinancialRecord } from "@/types/financial";

export default function TotalProfitCard({ data }: { data: FinancialRecord[] }) {

  return (
    <FinCard title="Total Profit" data={data} valueKey="Profit" />
  );
}
