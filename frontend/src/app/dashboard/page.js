// src/app/dashboard/page.js
"use client";

import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { SectionCards } from "@/components/section-cards";
import { DashboardPageLayout } from "@/components/dashboard-page-layout";

export default function DashboardPage() {
  return (
    <DashboardPageLayout>
      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
    </DashboardPageLayout>
  );
}