"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "next-themes";
import apiClient from "@/lib/api";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";

const fetchSalesTrends = async () => {
  const { data } = await apiClient.get("/sales/trends");
  return data.sort((a, b) => new Date(a.date) - new Date(b.date));
};

function getCSSVar(name) {
  if (typeof window === "undefined") return undefined;
  const style = getComputedStyle(document.documentElement);
  return style.getPropertyValue(name).trim();
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const dateLabel = new Date(label).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
    const revenueLabel = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(data.total_revenue);

    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              Month
            </span>
            <span className="font-bold text-foreground">{dateLabel}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              Revenue
            </span>
            <span className="font-bold text-foreground">{revenueLabel}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export function ChartAreaInteractive() {
  const { resolvedTheme } = useTheme();
  const [primaryColor, setPrimaryColor] = React.useState("");

  React.useEffect(() => {
    const updateColor = () => {
      const color = getCSSVar("--color-primary") || "hsl(260, 90%, 61%)";
      setPrimaryColor(color);
    };
    updateColor();

    const observer = new MutationObserver(updateColor);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, [resolvedTheme]);

  const chartConfig = {
    total_revenue: { label: "Revenue", color: primaryColor },
  };

  const { data: chartData, isLoading, error } = useQuery({
    queryKey: ["salesTrends"],
    queryFn: fetchSalesTrends,
  });

  const formatYAxisTick = (tick) => {
    if (tick >= 1000) return `$${(tick / 1000).toFixed(0)}k`;
    return `$${tick}`;
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Sales Revenue Over Time</CardTitle>
          <CardDescription>Loading monthly sales data...</CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[260px] w-full" />
        </CardContent>
      </Card>
    );
  }

  if (error || !chartData || chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Sales Revenue Over Time</CardTitle>
          <CardDescription className="text-destructive">
            {error
              ? "Failed to load chart data."
              : "No sales data available to display."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[260px] flex items-center justify-center text-muted-foreground">
            Awaiting sales data...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Revenue Over Time</CardTitle>
        <CardDescription>
          Showing total sales revenue grouped by month.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[260px] w-full">
          <AreaChart data={chartData} margin={{ left: 12, right: 12, top: 10, bottom: 10 }}>
            <defs>
              <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={primaryColor} stopOpacity={0.8} />
                <stop offset="95%" stopColor={primaryColor} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(v) =>
                new Date(v).toLocaleDateString("en-US", { month: "short" })
              }
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={formatYAxisTick}
            />
            <Tooltip cursor={true} content={<CustomTooltip />} />
            <Area
              dataKey="total_revenue"
              type="monotone"
              fill="url(#fillRevenue)"
              stroke={primaryColor}
              strokeWidth={2}
              dot={true}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
