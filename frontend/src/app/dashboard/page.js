import { getSales, getAnalytics } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatsCard from "@/components/StatsCard";
import SalesTable from "@/components/SalesTable";
import SalesForm from "@/components/SalesForm";
import { DollarSign, Users, CreditCard } from "lucide-react";

export default async function DashboardPage() {
  const [sales, analytics] = await Promise.all([getSales(), getAnalytics()]);

  return (
    <div className="container mx-auto p-4 sm:p-8 space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatsCard 
          title="Total Revenue" 
          value={`$${analytics.total_revenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          icon={DollarSign} 
        />
        <StatsCard 
          title="Sales" 
          value={`+${analytics.sales_count}`} 
          icon={CreditCard} 
        />
        <StatsCard 
          title="Average Sale" 
          value={`$${analytics.average_sale.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          icon={Users} 
        />
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="create">Create Sale</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
              <CardDescription>The latest sales records from the database.</CardDescription>
            </CardHeader>
            <CardContent>
              <SalesTable sales={sales} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="create">
          <SalesForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}