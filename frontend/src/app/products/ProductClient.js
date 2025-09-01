"use client";
import { useState } from "react";
import { toast } from "sonner";
import { deleteProduct, createProduct } from "@/lib/data";
import { Button } from "@/components/ui/button";
import ProductTable from "@/components/ProductTable";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import EditProductForm from "@/components/EditProductForm"; 
import { PlusCircle } from "lucide-react";

const ProductForm = ({ onProductCreated }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [isLoading, setIsLoading] = useState(false);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      try {
        const newProduct = await createProduct({ name, description, price: parseFloat(price) });
        toast.success("Product created successfully!");
        onProductCreated(newProduct);
        setName("");
        setDescription("");
        setPrice("");
      } catch (error) {
        toast.error("Failed to create product.");
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <form onSubmit={handleSubmit} className="space-y-4 pt-4">
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
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Adding..." : "Add Product"}
        </Button>
      </form>
    );
};
  
export default function ProductClient({ initialProducts }) {
  const [localProducts, setLocalProducts] = useState(initialProducts);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [contentKey, setContentKey] = useState(1);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedProduct) return;
    try {
      await deleteProduct(selectedProduct.id);
      toast.success(`Product "${selectedProduct.name}" deleted successfully.`);
      setLocalProducts(current => current.filter(p => p.id !== selectedProduct.id));
      setContentKey(prevKey => prevKey + 1);
    } catch (error) {
      toast.error("Failed to delete product.");
    } finally {
      setIsDeleteDialogOpen(false);
      setSelectedProduct(null);
    }
  };
  
  const handleUpdateFinished = (updatedProduct) => {
    toast.success("Product updated successfully!");
    setLocalProducts(current => current.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    setContentKey(prevKey => prevKey + 1);
    setIsEditDialogOpen(false);
    setSelectedProduct(null);
  };

  const handleProductCreated = (newProduct) => {
    setLocalProducts(current => [newProduct, ...current]);
    setContentKey(prevKey => prevKey + 1);
    setIsAddDialogOpen(false);
  };

  const handleEditDialogChange = (isOpen) => {
    setIsEditDialogOpen(isOpen);
    if (!isOpen) setSelectedProduct(null);
  };

  return (
    <>
      <div key={contentKey}>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Your Products</CardTitle>
                  <CardDescription>
                      View, edit, and delete your products.
                  </CardDescription>
                </div>
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
            </CardHeader>
            <CardContent>
                <ProductTable products={localProducts} onEdit={handleEdit} onDelete={handleDelete} />
            </CardContent>
        </Card>
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a New Product</DialogTitle>
            <DialogDescription>Fill in the details for your new product.</DialogDescription>
          </DialogHeader>
          <ProductForm onProductCreated={handleProductCreated} />
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>This will permanently delete &quot;{selectedProduct?.name}&quot;.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button variant="destructive" onClick={handleDeleteConfirm}>Continue</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={isEditDialogOpen} onOpenChange={handleEditDialogChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit {selectedProduct?.name}</DialogTitle>
            <DialogDescription>Make changes to the product here. Click save when you&apos;re done.</DialogDescription>
          </DialogHeader> {/* --- THIS IS THE CORRECTED LINE --- */}
          <EditProductForm product={selectedProduct} onFinished={handleUpdateFinished} />
        </DialogContent>
      </Dialog>
    </>
  );
}