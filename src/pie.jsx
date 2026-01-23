import { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
} from "recharts";

const PieChartComponent = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        const tempData = Object.values(
          data.reduce((acc, item) => {
            if (!acc[item.category]) {
              acc[item.category] = {
                category: item.category,
                price: 0,
              };
            }
            acc[item.category].price += item.price;
            return acc;
          }, {})
        );

        setChartData(tempData);
      });
  }, []);

  if (chartData.length === 0) return <p>Loading...</p>;

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

  return (
    <div

      style={{
        width: "100%",
        maxWidth: "600px",
        margin: "0 auto",
        textAlign: "center",
        padding: "20px",
        border: "3px solid #8884d8", // <-- Border color and thickness
        borderRadius: "16px",        // <-- Rounded corners
        boxShadow: "0 8px 20px rgba(0,0,0,0.1)", // Optional: subtle shadow
        backgroundColor: "#fff",     // Optional: white background
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Category Distribution</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="price"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={111}
            label
          >
            {chartData.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;