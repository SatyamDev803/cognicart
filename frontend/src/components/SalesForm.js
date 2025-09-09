"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { createSale } from "@/lib/data";
import { toast } from "sonner";

export default function SalesForm({ onFinished }) {
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const newSale = await createSale({
        product_id: productId,
        quantity: parseInt(quantity),
        price_per_unit: parseFloat(price),
      });

      toast.success("Sale created successfully!");
      if (onFinished) {
        onFinished(newSale);
      }
      
      setProductId("");
      setQuantity("");
      setPrice("");

    } catch (error) {
      toast.error("Failed to create sale. Check product ID and values.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
      <div className="space-y-2">
        <Label htmlFor="productId">Product ID</Label>
        <Input
          id="productId"
          type="text"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          placeholder="e.g., QRYUSB"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="quantity">Quantity</Label>
        <Input
          id="quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="e.g., 5"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="price">Price Per Unit</Label>
        <Input
          id="price"
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="e.g., 1200.50"
          required
        />
      </div>
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Creating..." : "Create Sale"}
      </Button>
    </form>
  );
}