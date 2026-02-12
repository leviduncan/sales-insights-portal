"use client"
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { FinancialRecord } from "@/types/financial";

export default function FinancialDashboard() {
  const [data, setData] = useState<FinancialRecord[]>([]);
  const [selectedRegion, setSelectedRegion] = useState("All");

  useEffect(() => {
    fetch("/api/financial-data") // Replace with actual API endpoint
      .then((res) => res.json())
      .then((data: FinancialRecord[]) => setData(data));
  }, []);

  const filteredData = selectedRegion === "All" ? data : data.filter(item => item["Country"] === selectedRegion);

  console.log("Filtered Data:", filteredData);
  console.log("Type of filteredData:", typeof filteredData);
  console.log("Is filteredData an array?", Array.isArray(filteredData));

  const salesByMonth = filteredData?.reduce((acc, item) => {
    const month = item["Month Name"];
    acc[month] = (acc[month] || 0) + parseFloat(item["Sales"]?.replace(/[$,]/g, "") ?? 0);
    return acc;
  }, {} as Record<string, number>) ?? {};

  // const salesByMonth = filteredData?.reduce((acc, item) => {
  //   const month = item["Month Name"];
  //   acc[month] = (acc[month] || 0) + parseFloat(item["Sales"].replace(/[$,]/g, ""));
  //   return acc;
  // }, {} as Record<string, number>) ?? {};

  const profitByMonth = filteredData.reduce((acc, item) => {
    const month = item["Month Name"];
    acc[month] = (acc[month] || 0) + parseFloat(item["Profit"].replace(/[$,]/g, ""));
    return acc;
  }, {} as Record<string, number>);

  const chartData = {
    labels: Object.keys(salesByMonth),
    datasets: [
      {
        label: "Sales Over Time",
        data: Object.values(salesByMonth),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
      },
      {
        label: "Profit Over Time",
        data: Object.values(profitByMonth),
        backgroundColor: "rgba(192, 75, 75, 0.2)",
        borderColor: "rgba(192, 75, 75, 1)",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">FinSight Analytics</h1>
      <div className="mb-4">
        <label className="mr-2">Filter by Region:</label>
        <select
          className="border p-2"
          onChange={(e) => setSelectedRegion(e.target.value)}
          value={selectedRegion}
        >
          <option value="All">All</option>
          {[...new Set(data.map(item => item["Country"]))].map(region => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>
      </div>
      <div className="chart-container bg-white p-4 rounded-lg shadow-lg">
        <Line data={chartData} />
      </div>
    </div>
  );
}
