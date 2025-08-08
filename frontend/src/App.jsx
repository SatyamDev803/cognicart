import { useState, useEffect } from 'react';
import './App.css';

// The URL for your live FastAPI backend
const API_URL = "http://localhost:8000/api/v1";

function App() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // This effect runs once to fetch data from the backend API
  useEffect(() => {
    async function fetchSales() {
      try {
        const response = await fetch(`${API_URL}/sales/`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSales(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    fetchSales();
  }, []); // The empty array ensures this runs only once

  return (
    <div>
      <h1>CogniCart Sales Data 📈</h1>
      {loading && <p>Loading data from backend...</p>}
      {error && <p>Error fetching data: {error}</p>}
      {!loading && sales.length === 0 && <p>No sales data found in the database. Add some using the API docs!</p>}
      {sales.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Sale ID</th>
              <th>Product ID</th>
              <th>Quantity</th>
              <th>Price Per Unit</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id}>
                <td>{sale.id}</td>
                <td>{sale.product_id}</td>
                <td>{sale.quantity}</td>
                <td>${sale.price_per_unit.toFixed(2)}</td>
                <td>{new Date(sale.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;