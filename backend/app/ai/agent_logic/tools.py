import httpx
from langchain.tools import tool
import json

BASE_API_URL = "http://127.0.0.1:8000/api/v1"

@tool
def get_top_selling_products() -> str:
    """
    Use this tool to find the top 5 best-selling products based on quantity sold.
    Returns a JSON string of the products and their sales figures.
    """
    try:
        with httpx.Client() as client:
            response = client.get(f"{BASE_API_URL}/analytics/top-products")
            response.raise_for_status()
            return json.dumps(response.json())
    except Exception as e:
        return f"Error calling API: {e}"

@tool
def get_monthly_sales_revenue_trends() -> str:
    """
    Use this tool to get the total sales revenue grouped by month.
    Returns a JSON string of dates and corresponding total revenue.
    """
    try:
        with httpx.Client() as client:
            response = client.get(f"{BASE_API_URL}/sales/trends")
            response.raise_for_status()
            return json.dumps(response.json())
    except Exception as e:
        return f"Error calling API: {e}"