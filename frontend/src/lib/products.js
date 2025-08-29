const API_URL = "http://localhost:8000/api/v1";

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

  if (!res.ok) {
    throw new Error('Failed to create product.');
  }
  return res.json();
}