// "use client";

// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { RefreshCw } from "lucide-react";
// import SalesForm from "@/components/SalesForm";
// import SalesTable from "@/components/SalesTable";
// import StatsCard from "@/components/StatsCard";

// export default function DashboardClient({ sales, analytics }) {
//   const router = useRouter();

//   return (
//     <>
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl font-bold">Dashboard</h1>
//         <Button variant="outline" size="icon" onClick={() => router.refresh()}>
//           <RefreshCw className="h-4 w-4" />
//         </Button>
//       </div>

//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//         <StatsCard 
//           title="Total Revenue" 
//           value={`$${analytics.total_revenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
//           icon={analytics.DollarSign} 
//         />
//         <StatsCard 
//           title="Sales" 
//           value={`+${analytics.sales_count}`} 
//           icon={analytics.CreditCard} 
//         />
//         <StatsCard 
//           title="Average Sale" 
//           value={`$${analytics.average_sale.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
//           icon={analytics.Users} 
//         />
//       </div>

//       <Tabs defaultValue="overview" className="space-y-4">
//         <TabsList>
//           <TabsTrigger value="overview">Overview</TabsTrigger>
//           <TabsTrigger value="create">Create Sale</TabsTrigger>
//         </TabsList>
//         <TabsContent value="overview">
//           <Card>
//             <CardHeader>
//               <CardTitle>Recent Sales</CardTitle>
//               <CardDescription>The latest sales records from the database.</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <SalesTable sales={sales} />
//             </CardContent>
//           </Card>
//         </TabsContent>
//         <TabsContent value="create">
//           <SalesForm />
//         </TabsContent>
//       </Tabs>
//     </>
//   );
// }