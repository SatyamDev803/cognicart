"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { deleteSale } from "@/lib/data";
import SalesForm from "@/components/SalesForm";
import SalesTable from "@/components/SalesTable";
import StatsCard from "@/components/StatsCard";
import EditSaleForm from "@/components/EditSaleForm";
import { DollarSign, CreditCard, PlusCircle } from "lucide-react";

export default function DashboardClient({ sales, analytics }) {
  const [localSales, setLocalSales] = useState(sales);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const [componentKey, setComponentKey] = useState(1);

  const handleEdit = (sale) => {
    setSelectedSale(sale);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (sale) => {
    setSelectedSale(sale);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedSale) return;
    try {
      await deleteSale(selectedSale.id);
      toast.success(`Sale ${selectedSale.id} deleted successfully.`);
      setLocalSales(currentSales => currentSales.filter(s => s.id !== selectedSale.id));
      setComponentKey(prevKey => prevKey + 1);
    } catch (error) {
      toast.error("Failed to delete sale.");
    } finally {
      setIsDeleteDialogOpen(false);
      setSelectedSale(null);
    }
  };
  
  const handleEditDialogChange = (isOpen) => {
    setIsEditDialogOpen(isOpen);
    if (!isOpen) {
      setSelectedSale(null);
    }
  };
  
  const handleUpdateFinished = (updatedSale) => {
    toast.success("Sale updated successfully!");
    setLocalSales(currentSales => 
      currentSales.map(s => s.id === updatedSale.id ? updatedSale : s)
    );
    setComponentKey(prevKey => prevKey + 1);
    setIsEditDialogOpen(false);
    setSelectedSale(null);
  };

  const handleSaleCreated = (newSale) => {
    setLocalSales(currentSales => [newSale, ...currentSales]);
    setComponentKey(prevKey => prevKey + 1);
    setIsAddDialogOpen(false);
  };

  return (
    <div key={componentKey} className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatsCard title="Total Revenue" value={`$${analytics.total_revenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} icon={DollarSign} />
        <StatsCard title="Sales" value={`+${analytics.sales_count}`} icon={CreditCard} />
        <StatsCard title="Average Sale" value={`$${analytics.average_sale.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} icon={CreditCard} />
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>Manage your recent sales.</CardDescription>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Create Sale
          </Button>
        </CardHeader>
        <CardContent>
          <SalesTable sales={localSales} onEdit={handleEdit} onDelete={handleDelete} />
        </CardContent>
      </Card>

      {/* Dialog for adding a new sale */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          {/* Added a consistent DialogHeader */}
          <DialogHeader>
            <DialogTitle>Create a New Sale</DialogTitle>
            <DialogDescription>Enter the details for the new sale record.</DialogDescription>
          </DialogHeader>
          <SalesForm onFinished={handleSaleCreated} />
        </DialogContent>
      </Dialog>
      
      {/* Dialog for deleting a sale */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>This will permanently delete sale #{selectedSale?.id}.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            {/* Added destructive variant for the action button */}
            <Button variant="destructive" onClick={handleDeleteConfirm}>Continue</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Dialog for editing a sale */}
      <Dialog open={isEditDialogOpen} onOpenChange={handleEditDialogChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Sale {selectedSale?.id}</DialogTitle>
            <DialogDescription>Make changes to the sale record here. Click save when you&apos;re done.</DialogDescription>
          </DialogHeader>
          <EditSaleForm sale={selectedSale} onFinished={handleUpdateFinished} />
        </DialogContent>
      </Dialog>
    </div>
  );
}