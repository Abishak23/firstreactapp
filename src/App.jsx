import { useEffect, useState } from "react";
function App() {
  const fetchData = async () => {
   fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(data => console.log(data));
  
  };

  return <button onClick={fetchData}>Fetch Data</button>;
}



export default App;
