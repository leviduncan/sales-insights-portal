import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';

// Register Chart.js components
Chart.register(...registerables);

// Define the interface for each data item
interface ProductData {
  Product: string;
  Sales: string; // Assuming Sales is a string with commas and dollar signs
}

interface TopProductsChartProps {
  data: ProductData[]; // Use ProductData[] type for the data prop
}

export default function TopProductsChart({ data }: TopProductsChartProps) {
  if (!data || data.length === 0) return <div>No data available</div>;

  // Process the data to accumulate sales per product
  const topProducts = data.reduce((acc, item) => {
    const product = item["Product"];
    const salesValue = item["Sales"]?.replace(/[$,]/g, ""); // Removing commas and dollar signs

    if (salesValue) {
      acc[product] = (acc[product] || 0) + parseFloat(salesValue);
    }

    return acc;
  }, {} as Record<string, number>);

  // Sort the products by revenue and take the top 5
  const sortedProducts = Object.entries(topProducts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Prepare the chart data
  const chartData = {
    labels: sortedProducts.map(([product]) => product) as string[],
    datasets: [
      {
        label: "Top Products by Revenue",
        data: sortedProducts.map(([, revenue]) => revenue) as number[],
        backgroundColor: "rgba(34, 197, 94, 0.6)",
        borderColor: "rgba(34, 197, 94, 1)",
        borderWidth: 2,
      }
    ],
  };

  return <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm"><Bar data={chartData} /></div>;
}
