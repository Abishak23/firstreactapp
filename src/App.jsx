import { useEffect, useState } from "react";
import loader from "./assets/loadind.svg";
import ChartComponent from "./barchar";
import PieChartComponent from "./pie";
import SalesBarChart from "./bar";

function App() {
  const [column, setcolumn] = useState([]);

  useEffect(() => {git in
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setcolumn(data);
      });
  }, []);

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "30px",
    fontFamily: "Arial, sans-serif",
  };

  const thStyle = {
    backgroundColor: "#1e40af",
    color: "#ffffff",
    padding: "12px",
    border: "1px solid #cbd5e1",
    textAlign: "left",
  };

  const tdStyle = {
    padding: "12px",
    border: "1px solid #cbd5e1",
    color: "#1f2937",
  };

  return (
    <>
      <table style={tableStyle}>
        <tbody>
          <tr>
            <th style={thStyle}>Product Name</th>
            <th style={thStyle}>Category</th>
            <th style={thStyle}>Price ($)</th>
          </tr>

          {column.map((row, index) => (
            <tr
              key={row.id}
              style={{
                backgroundColor: index % 2 === 0 ? "#f8fafc" : "#ffffff",
              }}
            >
              <td style={tdStyle}>{row.title}</td>
              <td style={tdStyle}>{row.category}</td>
              <td style={tdStyle}>{row.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* CHARTS */}
      <ChartComponent />
      <PieChartComponent />
      <SalesBarChart />
  
      
    </>
  );
}

export default App;
