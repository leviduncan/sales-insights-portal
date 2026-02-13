import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

import { FinancialRecord } from "@/types/financial";

interface ProfitByProductProps {
  data: FinancialRecord[];
}

function ProfitByProduct({ data }: ProfitByProductProps) {
  console.log("ProfitByProduct Data:", data);

  const profitByProduct = data.reduce((acc, item) => {
    const product = item["Product"]?.trim(); // Ensure no spaces
    const profitValue = item["Profit"]?.replace(/[$,]/g, ""); // Remove $ and ,

    if (product && profitValue && !isNaN(parseFloat(profitValue))) {
      acc[product] = (acc[product] || 0) + parseFloat(profitValue);
    }

    return acc;
  }, {} as Record<string, number>);

  console.log("Processed Profit Data:", profitByProduct);

  if (Object.keys(profitByProduct).length === 0) {
    return <div>No data available for Profit by Product</div>;
  }

  const chartData = {
    labels: Object.keys(profitByProduct),
    datasets: [
      {
        label: "Profit by Product",
        data: Object.values(profitByProduct),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  return <div className="bg-white dark:bg-gray-900 p-4 rounded-3xl shadow-sm">
    <Bar data={chartData} />
  </div>;
}

export default ProfitByProduct