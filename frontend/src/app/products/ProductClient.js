"use client";

import ProductForm from "@/components/ProductForm";
import ProductTable from "@/components/ProductTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProductClient({ initialProducts }) {
  // The table now manages its own state
  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-1">
        <ProductForm />
      </div>
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Existing Products</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Pass the initial data to the table */}
            <ProductTable products={initialProducts} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}