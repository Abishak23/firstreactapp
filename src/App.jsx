import { useEffect, useState } from "react";
function App() {
  const [column, setcolumn] = useState([])

  
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        setcolumn(data)
        console.log(data,"sdsd");
        
      }
      )
  },[]);


const sumTwo = ()=>{
  let a= 10;
  let c = a*24 
  console.log(c);
  
}

  return (
    <>
      <button onClick={sumTwo}>FetchData</button>;
      <table border={"1px solid black"} style={{ width: "100%" }}>
        <tbody>
          <tr>
            <th>productname</th>
            <th>category</th>
            <th>prices</th>
          </tr>
          {column.map(row => {
            return (

              <tr key={row.id} style={{padding:"15px"}}>
                <td>
                  {row.title}
                </td>
                <td>
                  {row.category}
                </td>
                <td>
                  {row.price}
                </td>
              </tr>
            )
          }
          )
          }
        </tbody>
      </table>
    </>
  )

}
export default App;

// {console.log(row)}
