import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from "@/components/ui/table";

export default function DashboardLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card><CardHeader><Skeleton className="h-5 w-24" /></CardHeader><CardContent><Skeleton className="h-8 w-32" /></CardContent></Card>
        <Card><CardHeader><Skeleton className="h-5 w-16" /></CardHeader><CardContent><Skeleton className="h-8 w-12" /></CardContent></Card>
        <Card><CardHeader><Skeleton className="h-5 w-28" /></CardHeader><CardContent><Skeleton className="h-8 w-32" /></CardContent></Card>
      </div>
      <div>
        <div className="flex space-x-4 border-b mb-4">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-64 mt-2" />
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  {[...Array(5)].map((_, i) => (
                    <TableHead key={i}><Skeleton className="h-5 w-full" /></TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...Array(5)].map((_, i) => (
                  <TableRow key={i}>
                    {[...Array(5)].map((_, j) => (
                      <TableCell key={j}><Skeleton className="h-5 w-full" /></TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}