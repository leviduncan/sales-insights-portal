import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import FinCard from "./FinCard";

export default function TotalProfitCard({ data }) {

  return (
    <FinCard title="Total Profit" data={data} valueKey="Profit" />
  );
}
