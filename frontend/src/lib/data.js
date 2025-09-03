const API_URL = "http://localhost:8000/api/v1";

// --- Sales API ---
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

export async function createSale(saleData) {
    const res = await fetch(`${API_URL}/sales/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(saleData),
    });
    if (!res.ok) throw new Error('Failed to create sale.');
    return res.json();
}

export async function updateSale(saleId, saleData) {
  const res = await fetch(`${API_URL}/sales/${saleId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(saleData)
  });
  if(!res.ok) throw new Error('Failed to update sale.')
  return res.json();
}

export async function deleteSale(saleId) {
  const res = await fetch(`${API_URL}/sales/${saleId}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Failed to delete sale.');
  return res.json();
}

// --- Products API ---
export async function getProducts() {
  try {
    const res = await fetch(`${API_URL}/products/`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch products.');
    return res.json();
  } catch (error) {
    console.error("API Fetch Error:", error);
    return [];
  }
}

export async function createProduct(productData) {
  const res = await fetch(`${API_URL}/products/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  });
  if (!res.ok) throw new Error('Failed to create product.');
  return res.json();
}

export async function updateProduct(productId, productData) {
  const res = await fetch(`${API_URL}/products/${productId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData)
  });
  if(!res.ok) throw new Error('Failed to update product.')
  return res.json();
}

export async function deleteProduct(productId) {
  const res = await fetch(`${API_URL}/products/${productId}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Failed to delete product.');
  return res.json();
}