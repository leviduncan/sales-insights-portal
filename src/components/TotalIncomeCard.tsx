import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import FinCard from "./FinCard";

export default function TotalIncomeCard({ data }) {
  

  return (
    <FinCard title="Total Income" data={data} valueKey="Sales" />
  );
}
