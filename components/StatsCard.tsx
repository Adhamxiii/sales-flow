import { ChartLine, CircleDollarSign, Handshake } from "lucide-react";
import React from "react";
import SingleStateCard from "./SingleStateCard";
import { useSalesStore } from "@/app/useSalesStore";

const StatsCard = () => {
  const { allSales } = useSalesStore();
  const closedSales = allSales.filter((sale) => sale.status === "Closed");
  const stats = [
    {
      title: "Total Sales",
      value: allSales
        .reduce((total, sale) => {
          const numericValue = parseFloat(
            sale.dealValue.replace(/[^0-9.-]+/g, "")
          );
          return total + numericValue;
        }, 0)
        .toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        }),
      icon: <CircleDollarSign />,
    },
    {
      title: "Deals in Progress",
      value: allSales
        .filter((sale) => sale.status === "In Progress")
        .length.toString(),
      icon: <Handshake />,
    },
    {
      title: "Conversion Rate",
      value:
        `${((closedSales.length / allSales.length) * 100).toFixed(2)} %` ||
        "0.00%",
      icon: <ChartLine />,
    },
  ];
  return (
    <div className="grid grid-cols-3 max-sm:grid-cols-1 mt-7 gap-6 p-6">
      {stats.map((stats, i) => (
        <SingleStateCard key={i} {...stats} />
      ))}
    </div>
  );
};

export default StatsCard;
