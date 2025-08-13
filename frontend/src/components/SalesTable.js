import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function SalesTable({ sales }) {
  return (
    <Table>
      <TableCaption>A list of your most recent sales.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Sale ID</TableHead>
          <TableHead>Product ID</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead>Timestamp</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sales.map((sale) => (
          <TableRow key={sale.id}>
            <TableCell className="font-medium">{sale.id}</TableCell>
            <TableCell>{sale.product_id}</TableCell>
            <TableCell>{sale.quantity}</TableCell>
            <TableCell className="text-right">${sale.price_per_unit.toFixed(2)}</TableCell>
            <TableCell>{new Date(sale.created_at).toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}