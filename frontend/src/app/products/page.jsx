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
import { Input } from "@/components/ui/input";
import { Search, X, Plus } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const fetchProducts = async () => (await apiClient.get('/products?limit=100')).data;
const createProduct = async (newProduct) => (await apiClient.post('/products', newProduct)).data;
const updateProduct = async ({ id, ...product }) => (await apiClient.put(`/products/${id}`, product)).data;
const deleteProduct = async (id) => (await apiClient.delete(`/products/${id}`)).data;
const searchProducts = async (query) => (await apiClient.post('/products/search', { query })).data;

export default function ProductsPage() {
  const isMobile = useIsMobile();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  const queryClient = useQueryClient();
  const { user } = useAuth();

  useEffect(() => { /* ...responsive logic... */ }, [isMobile]);

  const { data: allProducts, isLoading: isLoadingAll, error: errorAll } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    enabled: searchResults === null,
  });

  const { mutate: performSearch, data: searchResultsData, isPending: isSearching, reset: resetSearch } = useMutation({
    mutationFn: searchProducts,
    onSuccess: (data) => {
      setSearchResults(data);
      toast.success(`Found ${data.length} relevant products.`);
    },
    onError: (err) => {
      toast.error("Search Failed", { description: "Could not perform semantic search." });
      setSearchResults([]); 
    },
  });

  const { mutate: deleteMutate } = useMutation({ mutationFn: deleteProduct, onSuccess: () => { toast.success("Product deleted!"); queryClient.invalidateQueries({ queryKey: ['products'] }); setSearchResults(null); }, onError: (err) => { toast.error("Deletion Failed", { description: err.response.data.detail }); }, });
  const { mutate: createMutate, isPending: isCreating } = useMutation({ mutationFn: createProduct, onSuccess: () => { toast.success("Product created!"); queryClient.invalidateQueries({ queryKey: ['products'] }); setIsFormOpen(false); setSearchResults(null); }, onError: () => { toast.error("Failed to create product."); } });
  const { mutate: updateMutate, isPending: isUpdating } = useMutation({ mutationFn: updateProduct, onSuccess: () => { toast.success("Product updated!"); queryClient.invalidateQueries({ queryKey: ['products'] }); setIsFormOpen(false); setSelectedProduct(null); setSearchResults(null); }, onError: () => { toast.error("Failed to update product."); } });

  const handleEdit = (product) => { setSelectedProduct(product); setIsFormOpen(true); };
  const handleDeleteAttempt = (id) => { setProductToDelete(id); setIsAlertOpen(true); };
  const handleDeleteConfirm = () => { if (productToDelete) deleteMutate(productToDelete); setIsAlertOpen(false); setProductToDelete(null); };
  const handleDialogSubmit = (formData) => selectedProduct ? updateMutate({ id: selectedProduct.id, ...formData }) : createMutate(formData);
  const handleSearchSubmit = (e) => { e.preventDefault(); if (searchQuery.trim()) performSearch(searchQuery); };
  const handleClearSearch = () => { setSearchQuery(''); setSearchResults(null); resetSearch(); };

  const columns = getColumns({ user, onEdit: handleEdit, onDelete: handleDeleteAttempt });

  const productsToDisplay = searchResults !== null ? searchResults : allProducts;
  const isLoading = isLoadingAll || isSearching;
  const error = errorAll; 

  return (
    <DashboardPageLayout>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <h1 className="text-lg font-semibold md:text-2xl">Manage Products</h1>
        <div className="flex w-full md:w-auto items-center gap-2">
          <form onSubmit={handleSearchSubmit} className="flex-1 relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Semantic search (e.g., 'office setup')..."
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          {searchResults !== null && (
            <Button variant="ghost" size="icon" onClick={handleClearSearch} aria-label="Clear search">
              <X className="h-4 w-4" />
            </Button>
          )}
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            {user?.role === 'admin' && (
              <DialogTrigger asChild>
                <Button onClick={() => setSelectedProduct(null)}>
                  <Plus className="mr-2 size-4 shrink-0" />
                  <span className="hidden sm:inline">Add Product</span>
                </Button>
              </DialogTrigger>
            )}

            <DialogContent className="sm:max-w-[425px]"><DialogHeader><DialogTitle>{selectedProduct ? "Edit Product" : "Create New Product"}</DialogTitle><DialogDescription>{selectedProduct ? "Make changes here." : "Add a new product."} Click save when done.</DialogDescription></DialogHeader><div className="py-4"><ProductForm onSubmit={handleDialogSubmit} initialData={selectedProduct} isSubmitting={isCreating || isUpdating} /></div></DialogContent>
          </Dialog>
        </div>
      </div>

      {isLoading && <Skeleton className="h-96 w-full mt-4" />}
      {error && <div className="text-red-500 mt-4">Failed to load products.</div>}

      {productsToDisplay && <DataTable
        columns={columns}
        data={productsToDisplay}
        columnVisibility={columnVisibility}
        setColumnVisibility={setColumnVisibility}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        sorting={sorting}
        setSorting={setSorting}
      />}

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle><AlertDialogDescription>This will permanently delete the product.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={handleDeleteConfirm}>Continue</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
    </DashboardPageLayout>
  );
}