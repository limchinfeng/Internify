"use client";

import { usePathname, useRouter } from "next/navigation";
import { SidebarRoutes } from "./sidebar-routes"
import { cn } from "@/lib/utils";

export const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  
  const isActive = pathname ==="/profile"  

  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm md:mt-5">
      <div 
        onClick={() => router.push("/profile")}
        className={cn("p-6 text-2xl font-bold hover:cursor-pointer", isActive && "text-primary")}
      >
        Profile
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>    
  )
}