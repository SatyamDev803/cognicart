// src/app/sales/columns.jsx
"use client";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const formatCurrency = (value) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
const formatDate = (dateString) => new Date(dateString).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' });

export const getColumns = ({ user, onEdit, onDelete }) => [
    { accessorKey: "id", header: ({ column }) => <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Sale ID <ArrowUpDown className="ml-2 h-4 w-4" /></Button> },
    { accessorKey: "product_id", header: "Product ID" },
    { accessorKey: "quantity", header: "Quantity" },
    { accessorKey: "price_per_unit", header: () => <div className="text-right">Price/Unit</div>, cell: ({ row }) => <div className="text-right">{formatCurrency(row.getValue("price_per_unit"))}</div> },
    { id: "total", header: () => <div className="text-right">Total</div>, cell: ({ row }) => <div className="text-right font-medium">{formatCurrency(row.original.quantity * row.original.price_per_unit)}</div> },
    { accessorKey: "created_at", header: ({ column }) => <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Date <ArrowUpDown className="ml-2 h-4 w-4" /></Button>, cell: ({ row }) => <div>{formatDate(row.getValue("created_at"))}</div> },
    {
        id: "actions", cell: ({ row }) => {
            if (user?.role !== 'admin') return null;
            return (
                <div className="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild><Button variant="ghost" className="h-8 w-8 p-0"><span className="sr-only">Open menu</span><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => onEdit(row.original)}>Edit Sale</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-500" onClick={() => onDelete(row.original.id)}>Delete Sale</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            );
        },
    },
];