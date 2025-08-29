const API_URL = "http://localhost:8000/api/v1";

export async function getSales() {
  try {
    const res = await fetch(`${API_URL}/sales/`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch sales data.');
    return res.json();
  } catch (error) {
    console.error("API Fetch Error:", error);
    return [];
  }
}

export async function deleteSale(saleId) {
  return null 
}

export async function updateSale(saleId, saleData) {
  return null
}

export async function getAnalytics() {
  try {
    const res = await fetch(`${API_URL}/sales/analytics/`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch analytics data.');
    return res.json();
  } catch (error) {
    console.error("API Fetch Error:", error);
    return { total_revenue: 0, sales_count: 0, average_sale: 0 };
  }
}

