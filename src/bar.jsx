import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const SalesBarChart = () => {
  const [chartData, setChartData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setChartData(data);

        const uniqueCategories = ["All", ...new Set(data.map((item) => item.category))];
        setCategories(uniqueCategories);
      });
  }, []);


  if (chartData.length === 0) return <p>Loading...</p>;


  let displayedData;
  if (selectedCategory === "All") {
    const aggregated = Object.values(
      chartData.reduce((acc, item) => {
        if (!acc[item.category]) {
          acc[item.category] = { category: item.category, price: 0 };
        }
        acc[item.category].price += item.price;
        return acc;
      }, {})
    );
    displayedData = aggregated;
  } else {
    displayedData = chartData
      .filter((item) => item.category === selectedCategory)
      .map((item) => ({
        category: item.title,
        price: item.price,
      }));
  }

  return (
    <div
      style={{
        width: "90%",
        maxWidth: "800px",
        margin: "40px auto",
        padding: "20px",
        border: "2px solid black",
        borderRadius: "10px",
        boxSizing: "border-box",
        backgroundColor: "#fff",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Price by Category
      </h2>

     
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <label htmlFor="category" style={{ marginRight: "10px" }}>
          Filter by Category:
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

     
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={displayedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" interval={0} angle={-45} textAnchor="end" height={80} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="price" fill="#8884d8" isAnimationActive={true} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesBarChart;
