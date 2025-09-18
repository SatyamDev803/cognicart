// src/app/products/columns.jsx
"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"; // Import Tooltip components
import { MoreHorizontal, ArrowUpDown } from "lucide-react";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

export const getColumns = ({ user, onEdit, onDelete }) => [
  {
    accessorKey: "id",
    header: ({ column }) => <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>ID <ArrowUpDown className="ml-2 h-4 w-4" /></Button>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Name <ArrowUpDown className="ml-2 h-4 w-4" /></Button>,
  },
  {
    accessorKey: "description",
    header: "Description",
    // --- THIS IS THE RESPONSIVE FIX ---
    cell: ({ row }) => {
      const description = row.getValue("description");
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="max-w-[250px] truncate">
                {description}
              </p>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs break-words">{description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
    // ------------------------------------
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right">Price</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      return <div className="text-right font-medium">{formatCurrency(price)}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      if (user?.role !== 'admin') return null;
      const product = row.original;
      return (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onEdit(product)}>Edit Product</DropdownMenuItem>
              <DropdownMenuItem className="text-red-500" onClick={() => onDelete(product.id)}>Delete Product</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];