import React from "react";
import { BoxPlotController, BoxPlot } from "chartjs-chart-box-and-violin-plot";



interface AverageDiscountBySegmentProps {
  data: any[];
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

  return <div className="bg-gray-800 p-4 rounded-lg"><BoxPlot data={chartData} /></div>;
}

export default AverageDiscountBySegment