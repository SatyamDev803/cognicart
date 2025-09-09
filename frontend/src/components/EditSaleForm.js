"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { updateSale } from "@/lib/data";

export default function EditSaleForm({ sale, onFinished }) {
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState(""); 
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (sale) {
      setProductId(sale.product_id);
      setQuantity(sale.quantity);
      setPrice(sale.price_per_unit); 
    }
  }, [sale]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const updatedData = await updateSale(sale.id, {
        product_id: productId,
        quantity: parseInt(quantity),
        price_per_unit: parseFloat(price), 
      });
      onFinished(updatedData);
    } catch (error) {
      toast.error("Failed to update sale.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!sale) return null;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="edit-productId">Product ID</Label>
        <Input
          id="edit-productId"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="edit-quantity">Quantity</Label>
        <Input
          id="edit-quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="edit-price">Price Per Unit</Label>
        <Input 
          id="edit-price" 
          type="number" 
          step="0.01"
          value={price} 
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
}