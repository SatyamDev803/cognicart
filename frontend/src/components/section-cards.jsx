"use client";

import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const fetchSalesAnalytics = async () => {
  const { data } = await apiClient.get('/sales/analytics');
  return data;
};

export function SectionCards() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['salesAnalytics'],
    queryFn: fetchSalesAnalytics,
  });

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

  const SkeletonCard = () => (
    <Card>
      <CardHeader>
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-8 w-1/2" />
      </CardHeader>
    </Card>
  );

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  if (error) {
    return <p className="text-sm text-destructive col-span-full">Failed to load summary data.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader>
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="text-xl sm:text-2xl font-semibold">{formatCurrency(data?.total_revenue || 0)}</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardDescription>Total Sales</CardDescription>
          <CardTitle className="text-xl sm:text-2xl font-semibold">{data?.sales_count || 0}</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardDescription>Average Sale Value</CardDescription>
          <CardTitle className="text-xl sm:text-2xl font-semibold">{formatCurrency(data?.average_sale || 0)}</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardDescription>Growth Rate</CardDescription>
          <CardTitle className="text-xl sm:text-2xl font-semibold">4.5%</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}