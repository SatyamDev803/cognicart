// src/components/app-sidebar.jsx
"use client";

import * as React from "react";
import {
  IconChartBar,
  IconDashboard,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconSearch,
  IconSettings,
  IconUsers,
  IconReceipt
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuth } from "@/context/AuthContext"; // Import our useAuth hook

// We can keep the static navigation data here for now
const navMain = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: IconDashboard,
  },
  {
    title: "Products",
    url: "/products", // <-- Correct URL
    icon: IconListDetails,
  },
  {
    title: "Sales",
    url: "/sales", // <-- Correct URL
    icon: IconReceipt,
  },
  {
    title: "Analytics",
    url: "/analytics", // <-- Future page
    icon: IconChartBar,
  },
  {
    title: "Team",
    url: "/team", // <-- Future page
    icon: IconUsers,
  },
];

const navSecondary = [
  {
    title: "Settings",
    url: "#",
    icon: IconSettings,
  },
  {
    title: "Get Help",
    url: "#",
    icon: IconHelp,
  },
  {
    title: "Search",
    url: "#",
    icon: IconSearch,
  },
];


export function AppSidebar({ ...props }) {
  const { user } = useAuth(); // Get the live user from our context

  // Don't render the sidebar if there's no user
  if (!user) {
    return null;
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <a href="#">
                <div className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center"> C
              </div>
                <span className="text-base font-semibold">CogniCart</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        {/* We will add NavDocuments back later if needed */}
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        {/* Pass the REAL user object to NavUser */}
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}