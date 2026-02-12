import React from "react";
import { Pie } from "react-chartjs-2";
import { FinancialRecord } from "@/types/financial";

interface SalesByProductProps {
  data: FinancialRecord[];
}

export default function SalesByProduct({ data }: SalesByProductProps) {
  const salesByProduct = data.reduce((acc, item) => {
    const product = item["Product"];
    const salesValue = item["Sales"]?.replace(/[$,]/g, "");

    if (salesValue) {
      acc[product] = (acc[product] || 0) + parseFloat(salesValue);
    }

    return acc;
  }, {} as Record<string, number>);

  const chartData = {
    labels: Object.keys(salesByProduct),
    datasets: [
      {
        label: "Total Sales by Product",
        data: Object.values(salesByProduct),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        borderColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        borderWidth: 1,
      },
    ],
  };

  return <div className="row-span-2 bg-white dark:bg-gray-900 p-4 rounded-3xl shadow-sm"><Pie data={chartData} /></div>;
}
