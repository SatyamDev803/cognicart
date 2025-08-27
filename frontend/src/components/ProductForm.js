"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct } from "@/lib/products";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function ProductForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await createProduct({ name, description, price: parseFloat(price) });
      toast.success("Product created successfully!");
      setName("");
      setDescription("");
      setPrice("");
      router.refresh();
    } catch (error) {
      toast.error("Failed to create product.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Product</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input id="price" type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Product"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}