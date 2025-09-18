// src/components/section-cards.jsx
"use client";

import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 px-4 lg:grid-cols-2 lg:px-6">
        <Card><CardHeader><Skeleton className="h-6 w-3/4" /><Skeleton className="h-8 w-1/2" /></CardHeader></Card>
        <Card><CardHeader><Skeleton className="h-6 w-3/4" /><Skeleton className="h-8 w-1/2" /></CardHeader></Card>
        <Card><CardHeader><Skeleton className="h-6 w-3/4" /><Skeleton className="h-8 w-1/2" /></CardHeader></Card>
        <Card><CardHeader><Skeleton className="h-6 w-3/4" /><Skeleton className="h-8 w-1/2" /></CardHeader></Card>
      </div>
    );
  }

  if (error) {
    return <div className="px-4 text-red-500">Failed to load analytics data.</div>;
  }

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);

  return (
    // --- THIS IS THE RESPONSIVE LAYOUT FIX ---
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-4 lg:px-6">
      <Card>
        <CardHeader>
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="text-2xl font-semibold">
            {formatCurrency(data?.total_revenue || 0)}
          </CardTitle>
          <CardAction>
            <Badge variant="outline"><IconTrendingUp /> +12.5%</Badge>
          </CardAction>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardDescription>Total Sales</CardDescription>
          <CardTitle className="text-2xl font-semibold">
            {data?.sales_count || 0}
          </CardTitle>
          <CardAction>
            <Badge variant="outline"><IconTrendingDown /> -20%</Badge>
          </CardAction>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardDescription>Average Sale Value</CardDescription>
          <CardTitle className="text-2xl font-semibold">
            {formatCurrency(data?.average_sale || 0)}
          </CardTitle>
          <CardAction>
            <Badge variant="outline"><IconTrendingUp /> +12.5%</Badge>
          </CardAction>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardDescription>Growth Rate</CardDescription>
          <CardTitle className="text-2xl font-semibold">
            4.5%
          </CardTitle>
          <CardAction>
            <Badge variant="outline"><IconTrendingUp /> +4.5%</Badge>
          </CardAction>
        </CardHeader>
      </Card>
    </div>
  );
}