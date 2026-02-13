import React from "react";
import { BoxPlot } from "chartjs-chart-box-and-violin-plot";
import { FinancialRecord } from "@/types/financial";

interface AverageDiscountBySegmentProps {
  data: FinancialRecord[];
}

function AverageDiscountBySegment({ data }: AverageDiscountBySegmentProps) {
  const discountBySegment = data.reduce((acc, item) => {
    const segment = item["Segment"];
    const discountValue = item["Discounts"]?.replace(/[%]/g, "");

    if (discountValue) {
      if (!acc[segment]) acc[segment] = [];
      acc[segment].push(parseFloat(discountValue));
    }

    return acc;
  }, {} as Record<string, number[]>);

  const chartData = {
    labels: Object.keys(discountBySegment),
    datasets: [
      {
        label: "Average Discount by Segment",
        data: Object.values(discountBySegment),
      },
    ],
  };

  return <div className="bg-gray-800 p-4 rounded-full">BP<BoxPlot data={chartData} /></div>;
}

export default AverageDiscountBySegment