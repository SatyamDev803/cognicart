import { getProducts } from "@/lib/products";
import ProductClient from "./ProductClient";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="container mx-auto p-4 sm:p-8 space-y-8">
      <h1 className="text-3xl font-bold">Manage Product</h1>
      <ProductClient initialProducts={products} />
    </div>
  );
}