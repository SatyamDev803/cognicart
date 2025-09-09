import Link from "next/link";
import { Package } from "lucide-react";
import SidebarNav from "./SidebarNav";

export default function Sidebar() {
  return (
    <div className="hidden border-r md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <Package className="h-6 w-6" />
            <span>CogniCart</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start gap-2 px-2 text-sm font-medium lg:px-4">
            <SidebarNav />
          </nav>
        </div>
      </div>
    </div>
  );
}