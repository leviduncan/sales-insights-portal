import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { FinancialRecord } from "@/types/financial";

interface CardProps {
  title: string;
  data: FinancialRecord[];
  valueKey: keyof FinancialRecord;
  currency?: boolean;
}

export default function FinCard({ title, data, valueKey, currency = true }: CardProps) {
  // Organize data by month
  const dataByMonth = data.reduce((acc, item) => {
    const month = item["Month Name"];
    const value = parseFloat(item[valueKey]?.replace(/[$,]/g, "") || "0");

    acc[month] = (acc[month] || 0) + value;
    return acc;
  }, {} as Record<string, number>);

  const months = Object.keys(dataByMonth).sort((a, b) =>
    new Date(`1 ${a} 2020`).getMonth() - new Date(`1 ${b} 2020`).getMonth()
  );

  const currentMonth = months[months.length - 1];
  const previousMonth = months[months.length - 2];

  const currentValue = dataByMonth[currentMonth] || 0;
  const previousValue = dataByMonth[previousMonth] || 0;

  // Calculate percentage change
  const percentageChange =
    previousValue === 0 ? 0 : ((currentValue - previousValue) / previousValue) * 100;

  // Extract date range from dataset
  const dates = data.map((item) => new Date(item["Date"]));
  const minDate = new Date(Math.min(...dates.map((d) => d.getTime())));
  const maxDate = new Date(Math.max(...dates.map((d) => d.getTime())));

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });

  return (
    <div className="col-span-4 lg:col-span-1 lg:row-span-1 border-dark p-4 rounded-3xl shadow-sm bg-white text-dark dark:bg-gray-900 dark:text-light">
      <h3 className="text-secondary text-sm">{title}</h3>
      <p className="text-2xl font-bold">
        {currency ? `$${currentValue.toFixed(2)}` : currentValue.toFixed(2)}
      </p>
      <div className="flex items-center mt-1">
        {percentageChange >= 0 ? (
          <ArrowUp className="text-green-500 w-4 h-4" />
        ) : (
          <ArrowDown className="text-red-500 w-4 h-4" />
        )}
        <span
          className={`ml-1 text-sm ${percentageChange >= 0 ? "text-green-500" : "text-red-500"
            }`}
        >
          {percentageChange.toFixed(2)}% Compared to last month
        </span>
      </div>
      <p className="text-xs text-secondary mt-2">
        From {formatDate(minDate)} - {formatDate(maxDate)}
      </p>
    </div>
  );
}
