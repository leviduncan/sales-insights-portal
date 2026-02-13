import React from "react";
import { Line } from "react-chartjs-2";
import { FinancialRecord } from "@/types/financial";

interface SalesChartProps {
  data: FinancialRecord[];
}

export default function SalesChart({ data }: SalesChartProps) {
  if (!data || data.length === 0) return <div>No data available</div>;

  // Log the data for debugging
  console.log("Sales data:", data);

  const salesByMonth = data.reduce((acc, item) => {
    const month = item["Month Name"];
    const salesValue = item["Sales"]?.replace(/[$,]/g, ""); // Handle optional chaining

    if (salesValue) {
      acc[month] = (acc[month] || 0) + parseFloat(salesValue);
    }

    return acc;
  }, {} as Record<string, number>);

  // Log the sales data to check for any issues
  console.log("Sales by Month:", salesByMonth);

  const chartData = {
    labels: Object.keys(salesByMonth),
    datasets: [
      {
        label: "Sales Over Time",
        data: Object.values(salesByMonth),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
      }
    ],
  };

  // Check if the chart data is correctly formatted
  console.log("Chart Data:", chartData);

  return (
    <div className="col-span-4 lg:col-span-2 xl:col-span-1 row-span-1  bg-white dark:bg-gray-900 p-4 rounded-3xl shadow-sm">
      <Line data={chartData} />
    </div>
  );
}
