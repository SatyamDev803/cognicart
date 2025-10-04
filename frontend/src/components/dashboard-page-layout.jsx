"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";

export function DashboardPageLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Wait until the initial loading is finished
    if (!loading && !user) {
      // If not loading and there's no USER, redirect to login.
      router.push("/login");
    }
  }, [user, loading, router]);

  // While checking the auth state, or if there is no user, show a loading screen.
  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading session...</p>
      </div>
    );
  }

  // If the user is logged in, render the actual dashboard layout and page content.
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      }}
    >
      <Toaster position="top-center" richColors />
      <AppSidebar variant="inset" />
      <SidebarInset>
        <div className="flex flex-1 flex-col rounded-lg border bg-card shadow-sm">
          <SiteHeader />
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {children}
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}