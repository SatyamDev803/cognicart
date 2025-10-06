"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SaleForm({ onSubmit, initialData = {}, isSubmitting }) {
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (initialData) {
      setProductId(initialData.product_id || "");
      setQuantity(initialData.quantity || "");
      setPrice(initialData.price_per_unit || "");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      product_id: parseInt(productId),
      quantity: parseInt(quantity),
      price_per_unit: parseFloat(price)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2"><Label htmlFor="product_id">Product ID</Label><Input id="product_id" type="number" value={productId} onChange={(e) => setProductId(e.target.value)} required /></div>
      <div className="space-y-2"><Label htmlFor="quantity">Quantity</Label><Input id="quantity" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required /></div>
      <div className="space-y-2"><Label htmlFor="price">Price Per Unit</Label><Input id="price" type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required /></div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save Sale"}</Button>
    </form>
  );
}