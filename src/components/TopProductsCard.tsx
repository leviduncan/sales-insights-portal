import React from "react";

interface TopProductsCardProps {
  data: any[];
}

function TopProductsCard({ data }: TopProductsCardProps) {
  // Aggregate data by product
  const productStats = data.reduce((acc, item) => {
    const product = item["Product"];
    const revenue = parseFloat(item["Sales"]?.replace(/[$,]/g, "").trim() || "0");
    const salesCount = parseInt(item["Units Sold"]?.replace(/[$,]/g, "").trim() || "0", 10);

    // Ensure Profit is properly cleaned and converted
    let profit = item["Profit"] ? item["Profit"].toString().trim().replace(/[$,]/g, "") : "0";
    let profitValue = parseFloat(profit);

    if (Number.isNaN(profitValue)) {
      profitValue = 0;
    }

    if (!acc[product]) {
      acc[product] = { revenue: 0, sales: 0, profit: 0 };
    }

    acc[product].revenue += revenue;
    acc[product].sales += salesCount;
    acc[product].profit += profitValue;

    return acc;
  }, {} as Record<string, { revenue: number; sales: number; profit: number }>);

  // Sort products by revenue
  const sortedProducts = Object.entries(productStats)
    .sort((a, b) => b[1].revenue - a[1].revenue)
    .slice(0, 5); // Top 5 products

  // Extract date range from dataset
  const dates = data.map((item) => new Date(item["Date"]));
  const minDate = new Date(Math.min(...dates.map((d) => d.getTime())));
  const maxDate = new Date(Math.max(...dates.map((d) => d.getTime())));

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });

  return (
    <div className="col-span-2 row-start-4 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm">
      <h3 className="text-gray-500 text-sm">Top Products Performance</h3>
      <div className="mt-3">
        {sortedProducts.map(([product, stats], index) => (
          <div
            key={product}
            className={`flex justify-between py-2 border-b last:border-none ${
              index === 0 ? "text-green-500 font-bold" : "text-gray-300"
            }`}
          >
            <span className="text-sm">{product}</span>
            <div className="text-sm flex space-x-4">
              <span>💰 ${stats.revenue.toFixed(2)}</span>
              <span>📦 {stats.sales} Sales</span>
              <span>📈 ${stats.profit.toFixed(2)} Profit</span>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-400 mt-2">
        From {formatDate(minDate)} - {formatDate(maxDate)}
      </p>
    </div>
  );
}

export default TopProductsCard;
