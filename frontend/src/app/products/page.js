import { getProducts } from "@/lib/data";
import ProductClient from "./ProductClient";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <>
      <h1 className="text-3xl font-bold">Product Management</h1>
      <ProductClient initialProducts={products} />
    </>
  );
}