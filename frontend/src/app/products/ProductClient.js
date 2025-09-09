"use client";

import { Button } from "@/components/ui/button";
import ProductTable from "@/components/ProductTable";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import EditProductForm from "@/components/EditProductForm"; 
import ProductForm from "@/components/ProductForm";
import { ConfirmationDialog } from "@/components/ConfirmationDialog";
import { PlusCircle } from "lucide-react";

import { useCrudManager } from "@/hooks/useCrudManager";
import { deleteProduct, updateProduct, createProduct } from "@/lib/data";
  
export default function ProductClient({ initialProducts }) {
  const {
    data: localProducts,
    componentKey,
    dialogs,
    selectedItem: selectedProduct,
    handlers,
  } = useCrudManager({
    initialData: initialProducts,
    itemType: "Product",
    deleteAction: deleteProduct,
    updateAction: updateProduct,
    createAction: createProduct,
  });

  return (
    <div key={componentKey} className="flex flex-col gap-4">
      <Card>
          <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Your Products</CardTitle>
                <CardDescription>
                    View, edit, and delete your products.
                </CardDescription>
              </div>
              <Button onClick={handlers.add}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Product
              </Button>
          </CardHeader>
          <CardContent>
              <ProductTable products={localProducts} onEdit={handlers.edit} onDelete={handlers.delete} />
          </CardContent>
      </Card>

      <Dialog open={dialogs.addOpen} onOpenChange={dialogs.setAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>Fill in the details for your new product.</DialogDescription>
          </DialogHeader>
          <ProductForm onProductCreated={handlers.createFinished} />
        </DialogContent>
      </Dialog>
      
      <ConfirmationDialog
        open={dialogs.deleteOpen}
        onOpenChange={dialogs.setDeleteOpen}
        onConfirm={handlers.confirmDelete}
        title="Are you absolutely sure?"
        description={`This will permanently delete "${selectedProduct?.name}".`}
      />

      <Dialog open={dialogs.editOpen} onOpenChange={dialogs.setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit {selectedProduct?.name}</DialogTitle>
            <DialogDescription>Make changes to the product here. Click save when you&apos;re done.</DialogDescription>
          </DialogHeader>
          <EditProductForm product={selectedProduct} onFinished={handlers.updateFinished} />
        </DialogContent>
      </Dialog>
    </div>
  );
}