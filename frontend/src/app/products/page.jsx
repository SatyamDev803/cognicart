// src/app/products/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { DashboardPageLayout } from "@/components/dashboard-page-layout";
import { DataTable } from "@/components/data-table";
import { getColumns } from "./columns";
import { ProductForm } from "@/components/product-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { IconPlus } from "@tabler/icons-react";
import { useAuth } from "@/context/AuthContext";

const fetchProducts = async () => (await apiClient.get('/products?limit=100')).data;
const createProduct = async (newProduct) => (await apiClient.post('/products', newProduct)).data;
const updateProduct = async ({ id, ...product }) => (await apiClient.put(`/products/${id}`, product)).data;
const deleteProduct = async (id) => (await apiClient.delete(`/products/${id}`)).data;

export default function ProductsPage() {
  const isMobile = useIsMobile();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(''); 

  const queryClient = useQueryClient();
  const { user } = useAuth();

  useEffect(() => {
    if (isMobile) { setColumnVisibility({ description: false }); } 
    else { setColumnVisibility({}); }
  }, [isMobile]);

  const { data: products, isLoading, error } = useQuery({ queryKey: ['products'], queryFn: fetchProducts });
  const { mutate: deleteMutate } = useMutation({ mutationFn: deleteProduct, onSuccess: () => { toast.success("Product deleted!"); queryClient.invalidateQueries({ queryKey: ['products'] }); }, onError: (err) => { toast.error("Deletion Failed", { description: err.response.data.detail }); }, });
  const { mutate: createMutate, isPending: isCreating } = useMutation({ mutationFn: createProduct, onSuccess: () => { toast.success("Product created!"); queryClient.invalidateQueries({ queryKey: ['products'] }); setIsFormOpen(false); }, onError: () => { toast.error("Failed to create product."); } });
  const { mutate: updateMutate, isPending: isUpdating } = useMutation({ mutationFn: updateProduct, onSuccess: () => { toast.success("Product updated!"); queryClient.invalidateQueries({ queryKey: ['products'] }); setIsFormOpen(false); setSelectedProduct(null); }, onError: () => { toast.error("Failed to update product."); } });

  const handleEdit = (product) => { setSelectedProduct(product); setIsFormOpen(true); };
  const handleDeleteAttempt = (id) => { setProductToDelete(id); setIsAlertOpen(true); };
  const handleDeleteConfirm = () => { if (productToDelete) deleteMutate(productToDelete); setIsAlertOpen(false); setProductToDelete(null); };
  const handleDialogSubmit = (formData) => selectedProduct ? updateMutate({ id: selectedProduct.id, ...formData }) : createMutate(formData);
  const columns = getColumns({ user, onEdit: handleEdit, onDelete: handleDeleteAttempt });

  return (
    <DashboardPageLayout>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Manage Products</h1>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          {user?.role === 'admin' && ( <DialogTrigger asChild><Button onClick={() => setSelectedProduct(null)}><IconPlus className="mr-2 size-4" /> Add Product</Button></DialogTrigger> )}
          <DialogContent className="sm:max-w-[425px]"><DialogHeader><DialogTitle>{selectedProduct ? "Edit Product" : "Create New Product"}</DialogTitle><DialogDescription>{selectedProduct ? "Make changes here." : "Add a new product."} Click save when done.</DialogDescription></DialogHeader><div className="py-4"><ProductForm onSubmit={handleDialogSubmit} initialData={selectedProduct} isSubmitting={isCreating || isUpdating} /></div></DialogContent>
        </Dialog>
      </div>
      {isLoading && <Skeleton className="h-96 w-full" />}
      {error && <div className="text-red-500">Failed to load products.</div>}
      {products && <DataTable columns={columns} data={products} columnVisibility={columnVisibility} setColumnVisibility={setColumnVisibility} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} sorting={sorting} setSorting={setSorting}/>}
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle><AlertDialogDescription>This action cannot be undone. This will permanently delete the product.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={handleDeleteConfirm}>Continue</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
    </DashboardPageLayout>
  );
}