import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface FiltersProps {
  data: any[];
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
    <div className="mb-4 flex space-x-4 items-center">
      {/* Region Filter */}
      <div>
        <label className="mr-2">Filter by Region:</label>
        <select 
          className="border p-2 bg-white text-secondary dark:bg-dark rounded-lg"
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
      <div>
        <label className="mr-2">Filter by Date Range:</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          minDate={minDate}
          maxDate={maxDate}
          className="border p-2 bg-white text-secondary dark:bg-dark rounded-lg"
          placeholderText="Start Date"
        />
        <span className="mx-2  text-secondary ">to</span>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate || minDate}
          maxDate={maxDate}
          className="border p-2 bg-white text-secondary dark:bg-dark rounded-lg"
          placeholderText="End Date"
        />
      </div>
    </div>
  );
}
