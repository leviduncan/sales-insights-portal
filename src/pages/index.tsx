import React, { useState, useEffect } from "react";
import '@/app/globals.css'
import Navbar from "@/components/Navbar";
import Filters from "@/components/Filters";
import SalesChart from "@/components/SalesChart";
import TopProductChart from "@/components/TopProductChart";
import SalesByRegion from "@/components/SalesByRegion";
import SalesByProduct from "@/components/SalesByProduct"; 
import UnitsSoldOverTime from "@/components/UnitsSoldOverTime";
import SalesVsProfit from "@/components/SalesVsProfit";
import COGSVS from "@/components/COGSVS";
import ProfitByProduct from "@/components/ProfitByProduct";
import TotalIncomeCard from "@/components/TotalIncomeCard";
import TotalProfitCard from "@/components/TotalProfitCard";
import TopProductsCard from "@/components/TopProductsCard";


export default function FinancialDashboard() {
  const [data, setData] = useState<any[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>("All");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [minDate, setMinDate] = useState<Date | null>(null);
  const [maxDate, setMaxDate] = useState<Date | null>(null);

  useEffect(() => {
    fetch("/api/financial-data") // Replace with actual API endpoint
      .then((res) => res.json())
      .then((data: any[]) => {
        setData(data);
        if (data.length > 0) {
          const parsedDates = data.map((item) => parseDate(item["Date"]));
          setMinDate(new Date(Math.min(...parsedDates.map((d) => d.getTime()))));
          setMaxDate(new Date(Math.max(...parsedDates.map((d) => d.getTime()))));
        }
      });
  }, []);

  // Convert dataset date format to JS Date object
  const parseDate = (dateStr: string): Date => {
    const [month, day, year] = dateStr.split("/").map(Number);
    return new Date(year, month - 1, day); // month is zero-based in JS Dates
  };

  // Apply filters
  const filteredData = data.filter((item) => {
    const itemDate = parseDate(item["Date"]);
    const matchesRegion = selectedRegion === "All" || item["Country"] === selectedRegion;
    const matchesDate = (!startDate || itemDate >= startDate) && (!endDate || itemDate <= endDate);

    return matchesRegion && matchesDate;
  });

  return (
    <div className="min-h-screen bg-gray-100 text-dark dark:bg-dark dark:text-light">
      <Navbar />
      <div className="max-w-6xl mx-auto p-5">
        <Filters 
          data={data} 
          selectedRegion={selectedRegion} 
          setSelectedRegion={setSelectedRegion}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          minDate={minDate}
          maxDate={maxDate}
        />
        <TotalIncomeCard data={filteredData} />
        <TotalProfitCard data={filteredData} />
        <TopProductsCard data={filteredData} />
        <SalesChart data={filteredData.map(item => ({ ...item, Sales: item["Sales"], MonthName: item["Month Name"] }))} selectedRegion={selectedRegion} />
        <TopProductChart data={filteredData.map(item => ({ ...item, Product: item["Product"], Sales: item["Sales"]}))} />
        <SalesByRegion data={filteredData} />
        <SalesByProduct data={filteredData} />
        <ProfitByProduct data={filteredData} />
        <UnitsSoldOverTime data={filteredData} />
        <SalesVsProfit data={filteredData} />
        <COGSVS data={filteredData} />
      </div>
    </div>
  );
}
