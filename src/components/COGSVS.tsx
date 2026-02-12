import React from "react";
import { Scatter } from "react-chartjs-2";
import { FinancialRecord } from "@/types/financial";

interface COGSVSProps {
  data: FinancialRecord[];
}

export default function COGSVS({ data }: COGSVSProps) {
  const scatterData = data.map(item => {
    const salesValue = item["Sales"]?.replace(/[$,]/g, "");
    const cogsValue = item["COGS"]?.replace(/[$,]/g, "");

    if (salesValue && cogsValue) {
      return {
        x: parseFloat(salesValue),
        y: parseFloat(cogsValue),
      };
    }

    return null;
  }).filter(Boolean);

  const chartData = {
    datasets: [
      {
        label: "COGS vs Sales",
        data: scatterData,
        backgroundColor: "rgba(153, 102, 255, 1)",
      },
    ],
  };

  return <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm"><Scatter data={chartData} /></div>;
}
