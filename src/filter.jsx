import { useEffect, useState } from "react";
import ChartComponent from "./barchar";
import PieChartComponent from "./pie";
import SalesBarChart from "./bar";
import CategoryDropdown from "./filter";

function App() {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  const categories = [...new Set(data.map((item) => item.category))];

  const filteredData =
    selectedCategory === "all"
      ? data
      : data.filter((item) => item.category === selectedCategory);

  return (
    <>
      <CategoryDropdown
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#1e40af", color: "#fff" }}>
            <th>Product Name</th>
            <th>Category</th>
            <th>Price ($)</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.map((item, index) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.category}</td>
              <td>{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <ChartComponent data={filteredData} />
      <PieChartComponent data={filteredData} />
      <SalesBarChart data={filteredData} />
    </>
  );
}

export default App;
