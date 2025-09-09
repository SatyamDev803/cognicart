"use client";
import { useState } from "react";
import { toast } from "sonner";

export function useCrudManager({
  initialData,
  itemType,
  deleteAction,
  updateAction,
  createAction,
}) {
  const [data, setData] = useState(initialData);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [componentKey, setComponentKey] = useState(1);

  const forceRemount = () => setComponentKey((prev) => prev + 1);

  const handleEdit = (item) => {
    setSelectedItem(item);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (item) => {
    setSelectedItem(item);
    setIsDeleteDialogOpen(true);
  };

  const handleAdd = () => {
    setIsAddDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedItem) return;
    try {
      await deleteAction(selectedItem.id);
      toast.success(`${itemType} "${selectedItem.name || selectedItem.id}" deleted successfully.`);
      setData((current) => current.filter((item) => item.id !== selectedItem.id));
      forceRemount();
    } catch (error) {
      toast.error(`Failed to delete ${itemType}.`);
    } finally {
      setIsDeleteDialogOpen(false);
      setSelectedItem(null);
    }
  };

  const handleUpdateFinished = (updatedItem) => {
    toast.success(`${itemType} updated successfully!`);
    setData((current) =>
      current.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    forceRemount();
    setIsEditDialogOpen(false);
    setSelectedItem(null);
  };

  const handleCreateFinished = (newItem) => {
    setData((current) => [newItem, ...current]);
    forceRemount();
    setIsAddDialogOpen(false);
  };

  const closeEditDialog = (isOpen) => {
    setIsEditDialogOpen(isOpen);
    if (!isOpen) {
      setSelectedItem(null);
    }
  };

  return {
    data,
    componentKey,
    dialogs: {
      deleteOpen: isDeleteDialogOpen,
      setDeleteOpen: setIsDeleteDialogOpen,
      editOpen: isEditDialogOpen,
      setEditOpen: closeEditDialog,
      addOpen: isAddDialogOpen,
      setAddOpen: setIsAddDialogOpen,
    },
    selectedItem,
    handlers: {
      add: handleAdd,
      edit: handleEdit,
      delete: handleDelete,
      confirmDelete: handleDeleteConfirm,
      createFinished: handleCreateFinished,
      updateFinished: handleUpdateFinished,
    },
  };
}