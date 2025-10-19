"use client";

import { DashboardPageLayout } from "@/components/dashboard-page-layout";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { SectionCards } from "@/components/section-cards";
import { TopProductsCard } from "@/components/top-products-card";

export default function DashboardPage() {
  return (
    <DashboardPageLayout>
      <SectionCards />
      
      <div className="grid gap-6 lg:grid-cols-1">
        <ChartAreaInteractive />
        <TopProductsCard />
      </div>
    </DashboardPageLayout>
  );
}