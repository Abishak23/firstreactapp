import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
  LabelList,
} from "recharts";

const ChartComponent = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => {
        const top5Products = data
          .sort((a, b) => b.price - a.price)
          .slice(0, 5)
          .map(item => ({
            product: item.title,
            price: item.price,
          }));

        setChartData(top5Products);
      });
  }, []);

  if (chartData.length === 0) return <p>Loading...</p>;

  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#a28fd0"];

  return (
    <div
      style={{
        width: "90%",
        maxWidth: "900px",
        margin: "40px auto",
        padding: "20px",
        border: "2px solid #8884d8",
        borderRadius: "15px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h3
        style={{
          textAlign: "center",
          marginBottom: "30px",
          fontSize: "24px",
          fontWeight: "bold", // Make title bold
          color: "#333",
        }}
      >
        Top 5 Priced Products
      </h3>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="4 4" stroke="#ccc" />
          <XAxis
            dataKey="product"
            interval={0}
            tick={{
              fontSize: 14,
              fill: "#555",
              fontWeight: "bold", // Make X-axis labels bold
            }}
            tickFormatter={(value) =>
              value.length > 12 ? value.slice(0, 12) + "…" : value
            }
          />
          <YAxis
            tick={{ fontSize: 14, fill: "#555", fontWeight: "bold" }} // Bold Y-axis
            axisLine={{ stroke: "#8884d8" }}
            tickLine={{ stroke: "#8884d8" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              border: "1px solid #8884d8",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              padding: "10px",
              fontWeight: "bold", // Tooltip values bold
            }}
          />
          <Bar dataKey="price" radius={[10, 10, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
            {/* Show values on top of bars */}
            <LabelList
              dataKey="price"
              position="top"
              style={{ fontWeight: "bold", fill: "#333" }} // Bold values
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartComponent;
