"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import SalesForm from "@/components/SalesForm";
import SalesTable from "@/components/SalesTable";
import StatsCard from "@/components/StatsCard";
import EditSaleForm from "@/components/EditSaleForm";
import { ConfirmationDialog } from "@/components/ConfirmationDialog";
import { DollarSign, CreditCard, PlusCircle } from "lucide-react";

import { useCrudManager } from "@/hooks/useCrudManager";
import { deleteSale, updateSale, createSale } from "@/lib/data";

export default function DashboardClient({ sales, analytics }) {
  const {
    data: localSales,
    componentKey,
    dialogs,
    selectedItem: selectedSale,
    handlers,
  } = useCrudManager({
    initialData: sales,
    itemType: "Sale",
    deleteAction: deleteSale,
  });

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
          <Button onClick={handlers.add}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Create Sale
          </Button>
        </CardHeader>
        <CardContent>
          <SalesTable sales={localSales} onEdit={handlers.edit} onDelete={handlers.delete} />
        </CardContent>
      </Card>

      <Dialog open={dialogs.addOpen} onOpenChange={dialogs.setAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a New Sale</DialogTitle>
            <DialogDescription>Enter the details for the new sale record.</DialogDescription>
          </DialogHeader>
          <SalesForm onFinished={handlers.createFinished} />
        </DialogContent>
      </Dialog>
      
      <ConfirmationDialog
        open={dialogs.deleteOpen}
        onOpenChange={dialogs.setDeleteOpen}
        onConfirm={handlers.confirmDelete}
        title="Are you absolutely sure?"
        description={`This will permanently delete sale #${selectedSale?.id}.`}
      />

      <Dialog open={dialogs.editOpen} onOpenChange={dialogs.setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Sale #{selectedSale?.id}</DialogTitle>
            <DialogDescription>Make changes to the sale record here. Click save when you&apos;re done.</DialogDescription>
          </DialogHeader>
          <EditSaleForm sale={selectedSale} onFinished={handlers.updateFinished} />
        </DialogContent>
      </Dialog>
    </div>
  );
}