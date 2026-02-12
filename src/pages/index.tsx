import React, { useState, useEffect } from "react";
import { FinancialRecord } from "@/types/financial";
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
import Branch from "@/components/Branch";


export default function FinancialDashboard() {
  const [data, setData] = useState<FinancialRecord[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>("All");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [minDate, setMinDate] = useState<Date | null>(null);
  const [maxDate, setMaxDate] = useState<Date | null>(null);

  useEffect(() => {
    fetch("/api/financial-data") // Replace with actual API endpoint
      .then((res) => res.json())
      .then((data: FinancialRecord[]) => {
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

  // Branch Flag
  const branch_flag: string = "";

  return (
    <div className="min-h-screen bg-gray-100 text-dark dark:bg-dark dark:text-light">
      <Navbar />
      {branch_flag && <Branch branch={branch_flag} />}
      <div className="max-w-8x1 mx-auto p-5">
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
        <div className="grid grid-cols-5 grid-rows-5 gap-4">
          <TotalIncomeCard data={filteredData} />
          <TotalProfitCard data={filteredData} />
          <SalesByProduct data={filteredData} />
          <ProfitByProduct data={filteredData} />
          <SalesChart data={filteredData} />
          <TopProductsCard data={filteredData} />
        </div>
        <TopProductChart data={filteredData} />
        <SalesByRegion data={filteredData} />
        <UnitsSoldOverTime data={filteredData} />
        <SalesVsProfit data={filteredData} />
        <COGSVS data={filteredData} />
      </div>
    </div>
  );
}
// Just a quick note - nothing to see here...