"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const API_URL = "http://localhost:8000/api/v1";

export default function SalesForm() {
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Submitting...");

    try {
      const response = await fetch(`${API_URL}/sales/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: productId,
          quantity: parseInt(quantity),
          price_per_unit: parseFloat(price),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create sale.");
      }

      // Reset form and show success message
      setProductId("");
      setQuantity("");
      setPrice("");
      setMessage("Sale created successfully!");
      
      // Refresh the page data to show the new sale
      router.refresh(); 

    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a New Sale</CardTitle>
        <CardDescription>Enter the details for the new sale record.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="productId">Product ID</Label>
            <Input
              id="productId"
              type="text"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              placeholder="e.g., LAPTOP-001"
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
          <Button type="submit">Create Sale</Button>
          {message && <p className="text-sm text-gray-500 pt-2">{message}</p>}
        </form>
      </CardContent>
    </Card>
  );
}