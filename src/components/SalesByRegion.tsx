import React from "react";
import { Bar } from "react-chartjs-2";
import { FinancialRecord } from "@/types/financial";

interface SalesByRegionProps {
  data: FinancialRecord[];
}

export default function SalesByRegion({ data }: SalesByRegionProps) {
  const salesByRegion = data.reduce((acc, item) => {
    const region = item["Country"];
    const salesValue = item["Sales"]?.replace(/[$,]/g, "");

    if (salesValue) {
      acc[region] = (acc[region] || 0) + parseFloat(salesValue);
    }

    return acc;
  }, {} as Record<string, number>);

  const chartData = {
    labels: Object.keys(salesByRegion),
    datasets: [
      {
        label: "Total Sales by Region",
        data: Object.values(salesByRegion),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return <div className="bg-white dark:bg-gray-900 p-4 rounded-3xl shadow-sm"><Bar data={chartData} /></div>;
}
