// src/app/sales/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { DashboardPageLayout } from "@/components/dashboard-page-layout";
import { DataTable } from "@/components/data-table";
import { getColumns } from "./columns";
import { SaleForm } from "@/components/sale-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { IconPlus } from "@tabler/icons-react";
import { useAuth } from "@/context/AuthContext";

const fetchSales = async () => (await apiClient.get('/sales?limit=200')).data;
const createSale = async (newSale) => (await apiClient.post('/sales', newSale)).data;
const updateSale = async ({ id, ...sale }) => (await apiClient.put(`/sales/${id}`, sale)).data;
const deleteSale = async (id) => (await apiClient.delete(`/sales/${id}`)).data;

export default function SalesPage() {
    const isMobile = useIsMobile();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [selectedSale, setSelectedSale] = useState(null);
    const [saleToDelete, setSaleToDelete] = useState(null);
    const [columnVisibility, setColumnVisibility] = useState({});
    const [sorting, setSorting] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');

    const queryClient = useQueryClient();
    const { user } = useAuth();

    useEffect(() => {
        if (isMobile) { setColumnVisibility({ product_id: false, price_per_unit: false }); }
        else { setColumnVisibility({}); }
    }, [isMobile]);

    const { data: sales, isLoading, error } = useQuery({ queryKey: ['sales'], queryFn: fetchSales });
    const invalidateQueries = () => { queryClient.invalidateQueries({ queryKey: ['sales'] }); queryClient.invalidateQueries({ queryKey: ['salesAnalytics'] }); };
    const { mutate: deleteMutate } = useMutation({ mutationFn: deleteSale, onSuccess: () => { toast.success("Sale deleted!"); invalidateQueries(); }, onError: () => { toast.error("Failed to delete sale."); } });
    const { mutate: createMutate, isPending: isCreating } = useMutation({ mutationFn: createSale, onSuccess: () => { toast.success("Sale created!"); invalidateQueries(); setIsFormOpen(false); }, onError: () => { toast.error("Failed to create sale."); } });
    const { mutate: updateMutate, isPending: isUpdating } = useMutation({ mutationFn: updateSale, onSuccess: () => { toast.success("Sale updated!"); invalidateQueries(); setIsFormOpen(false); setSelectedSale(null); }, onError: () => { toast.error("Failed to update sale."); } });

    const handleEdit = (sale) => { setSelectedSale(sale); setIsFormOpen(true); };
    const handleDeleteAttempt = (id) => { setSaleToDelete(id); setIsAlertOpen(true); };
    const handleDeleteConfirm = () => { if (saleToDelete) deleteMutate(saleToDelete); setIsAlertOpen(false); setSaleToDelete(null); };
    const handleDialogSubmit = (formData) => selectedSale ? updateMutate({ id: selectedSale.id, ...formData }) : createMutate(formData);
    const columns = getColumns({ user, onEdit: handleEdit, onDelete: handleDeleteAttempt });

    return (
        <DashboardPageLayout>
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Sales Transactions</h1>
                <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                    {user?.role === 'admin' && (<DialogTrigger asChild><Button onClick={() => setSelectedSale(null)}><IconPlus className="mr-2 size-4" /> Add Sale</Button></DialogTrigger>)}
                    <DialogContent className="sm:max-w-[425px]"><DialogHeader><DialogTitle>{selectedSale ? "Edit Sale" : "Create New Sale"}</DialogTitle><DialogDescription>Fill in the details for the sale transaction.</DialogDescription></DialogHeader><div className="py-4"><SaleForm onSubmit={handleDialogSubmit} initialData={selectedSale} isSubmitting={isCreating || isUpdating} /></div></DialogContent>
                </Dialog>
            </div>
            {isLoading && <Skeleton className="h-96 w-full" />}
            {error && <div className="text-red-500">Failed to load sales data.</div>}
            {sales && <DataTable columns={columns} data={sales} columnVisibility={columnVisibility} setColumnVisibility={setColumnVisibility} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} sorting={sorting} setSorting={setSorting} />}
            <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle><AlertDialogDescription>This will permanently delete the sale record.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={handleDeleteConfirm}>Continue</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
        </DashboardPageLayout>
    );
}