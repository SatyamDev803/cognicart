"use client";
import { useTheme } from "next-themes";
import { Moon, Sun, LogOut, MoreVertical, UserCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
// We no longer need useRouter, so it has been removed.
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

export function NavUser({ user }) {
  const { logout } = useAuth();
  const { setTheme, resolvedTheme } = useTheme();

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const initials = user.name ? user.name.slice(0, 2).toUpperCase() : (user.email ? user.email.slice(0, 2).toUpperCase() : "U");


  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground bg-primary/10">
              <Avatar className="h-8 w-8 rounded-lg"><AvatarImage src="" alt={user.name || user.email} /><AvatarFallback className="rounded-lg">{initials}</AvatarFallback></Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                {/* --- DISPLAY NAME AND EMAIL --- */}
                <span className="truncate font-medium">{user.name || 'User'}</span>
                <span className="text-muted-foreground truncate text-xs">{user.email}</span>
                {/* ------------------------------ */}
              </div>
              <MoreVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] min-w-56 rounded-lg" align="end" sideOffset={4}>
            <DropdownMenuLabel>{user.name || 'My Account'}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <UserCircle className="mr-2 size-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  {resolvedTheme === "dark" ? (
                    <Moon className="mr-2 size-4" />
                  ) : (
                    <Sun className="mr-2 size-4" />
                  )}
                  <span className="ml-2">Theme</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent sideOffset={8}>
                  <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 size-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}