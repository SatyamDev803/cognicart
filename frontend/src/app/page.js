import SalesTable from "@/components/SalesTable";
import SalesForm from "@/components/SalesForm"; // Import the new form
import { getSales } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ModeToggle } from "@/components/ModeToggle";

export default async function HomePage() {
  const sales = await getSales();

  return (
    <div className="container mx-auto p-4 sm:p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Form takes up 1 column on medium screens and up */}
        <div className="md:col-span-1">
          <SalesForm />
        </div>
        
        {/* Table takes up 2 columns on medium screens and up */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
              <CardDescription>
                An overview of the latest sales records from the database.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SalesTable sales={sales} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}