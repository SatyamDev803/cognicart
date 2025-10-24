"use client";

import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

const fetchTopProducts = async () => {
  const { data } = await apiClient.get('/analytics/top-products');
  return data;
};

export function TopProductsCard() {
  const { data: topProducts, isLoading, error } = useQuery({
    queryKey: ['topProducts'],
    queryFn: fetchTopProducts,
  });

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-4">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      );
    }

    if (error) {
      return <p className="text-sm text-destructive">Failed to load data.</p>;
    }

    if (!topProducts || topProducts.length === 0) {
      return (
        <div className="flex h-[150px] items-center justify-center text-sm text-muted-foreground">
          No sales data available.
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {topProducts.map((product, index) => (
          <div key={product.product_id} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-muted-foreground text-xs">{index + 1}</span>
              <p className="text-sm font-medium truncate">{product.product_name}</p>
            </div>
            <Badge variant="secondary" className="whitespace-nowrap">{product.total_quantity_sold} units</Badge>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Selling Products</CardTitle>
        <CardDescription>Your top 5 products by total units sold.</CardDescription>
      </CardHeader>
      <CardContent>
        {renderContent()}
      </CardContent>
    </Card>
  );
}