import React from "react";
import { Scatter } from "react-chartjs-2";
import { FinancialRecord } from "@/types/financial";

interface DiscountImpactChartProps {
    data: FinancialRecord[];
}

export default function DiscountImpactChart({ data }: DiscountImpactChartProps) {
    if (!data || data.length === 0) return <div>No data available</div>;

    // Log the data for debugging
    console.log("Discount data:", data);

    const discountImpact = data
        .map(item => {
            const discountValue = item["Discounts"]?.replace(/[%]/g, "");  //Remove percentage sign
            const salesValue = item["Sales"]?.replace(/[$,]/g, ""); // Remove dollar and commas

            if (discountValue && salesValue) {
                return {
                    x: parseFloat(discountValue),
                    y: parseFloat(salesValue),
                };
            }

            return null;
        })
        .filter(Boolean); // Remove null values

    // Log the transformed data for debugging
    console.log("First data entry:", data[0]);
    console.log("Transformed Discount Impact Data:", discountImpact);

    const chartData = {
        datasets: [
            {
                label: "Discount Impact on Sales",
                data: discountImpact,
                backgroundColor: "rgba(255, 206, 86, 0.6)",
                borderColor: "rgba(255, 206, 86, 1)",
                borderWidth: 1,
            }
        ],
    };

    return (
        <div className="bg-gray-800 p-4 rounded-full">
            <Scatter data={chartData} />
        </div>
    );
}
