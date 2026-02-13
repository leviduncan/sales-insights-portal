import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FinancialRecord } from "@/types/financial";

interface FiltersProps {
  data: FinancialRecord[];
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
  startDate: Date | null;
  setStartDate: (date: Date | null) => void;
  endDate: Date | null;
  setEndDate: (date: Date | null) => void;
  minDate: Date | null;
  maxDate: Date | null;
}

export default function Filters({
  data,
  selectedRegion,
  setSelectedRegion,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  minDate,
  maxDate
}: FiltersProps) {
  if (!data) return <div>No data available</div>;

  // Extract unique regions (countries)
  const regions = [...new Set(data.map(item => item["Country"]))];

  return (
    <div className="mb-4 flex flex-col lg:flex-row lg:space-x-4 space-around lg:items-center shadow-sm bg-white dark:bg-gray-900 p-4 rounded-full">
      {/* Region Filter */}
      <div className="mb-4 lg:mb-0">
        <label className="mr-2">Filter by Region:</label>
        <select
          className="border p-2 bg-gray-100 text-secondary dark:bg-dark rounded-full"
          onChange={(e) => setSelectedRegion(e.target.value)}
          value={selectedRegion}
        >
          <option value="All">All</option>
          {regions.map(region => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>
      </div>

      {/* Date Range Picker */}
      <div className="flex items-start sm:items-center flex-col sm:flex-row">
        <label className="mr-2">Filter by Date Range:</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          minDate={minDate ?? undefined}
          maxDate={maxDate ?? undefined}
          className="border p-2 bg-gray-100 text-secondary dark:bg-dark rounded-full"
          placeholderText="Start Date"
        />
        <span className="mx-2  text-secondary ">to</span>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={(startDate || minDate) ?? undefined}
          maxDate={maxDate ?? undefined}
          className="border p-2 bg-gray-100 text-secondary dark:bg-dark rounded-full"
          placeholderText="End Date"
        />
      </div>
    </div>
  );
}
