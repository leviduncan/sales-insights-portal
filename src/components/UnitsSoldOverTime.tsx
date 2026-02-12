import React from "react";
import { Line } from "react-chartjs-2";
import { FinancialRecord } from "@/types/financial";

interface UnitsSoldOverTimeProps {
  data: FinancialRecord[];
}

export default function UnitsSoldOverTime({ data }: UnitsSoldOverTimeProps) {
  const unitsSoldByMonth = data.reduce((acc, item) => {
    const month = item["Month Name"];
    const unitsValue = item["Units Sold"]?.replace(/[$,]/g, "");
    
    if (unitsValue) {
      acc[month] = (acc[month] || 0) + parseFloat(unitsValue);
    }
    
    return acc;
  }, {} as Record<string, number>);

  const chartData = {
    labels: Object.keys(unitsSoldByMonth),
    datasets: [
      {
        label: "Units Sold Over Time",
        data: Object.values(unitsSoldByMonth),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  return <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm"><Line data={chartData} /></div>;
}
