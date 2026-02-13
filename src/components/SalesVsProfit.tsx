import React from "react";
import { Scatter } from "react-chartjs-2";
import { FinancialRecord } from "@/types/financial";

interface SalesVsProfitProps {
  data: FinancialRecord[];
}

export default function SalesVsProfit({ data }: SalesVsProfitProps) {
  const scatterData = data.map(item => {
    const salesValue = item["Sales"]?.replace(/[$,]/g, "");
    const profitValue = item["Profit"]?.replace(/[$,]/g, "");

    if (salesValue && profitValue) {
      return {
        x: parseFloat(salesValue),
        y: parseFloat(profitValue),
      };
    }

    return null;
  }).filter(Boolean);

  const chartData = {
    datasets: [
      {
        label: "Sales vs Profit",
        data: scatterData,
        backgroundColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  return <div className="col-span-4 xl:col-span-2 xl:row-span-2  bg-white dark:bg-gray-900 p-4 rounded-3xl shadow-sm"><Scatter data={chartData} /></div>;
}
