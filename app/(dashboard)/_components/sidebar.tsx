"use client";

import { usePathname, useRouter } from "next/navigation";
import { SidebarRoutes } from "./sidebar-routes"
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { User } from "@prisma/client";

export const Sidebar = ({
  currentUser
}: {currentUser?: User | null}) => {
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
      {currentUser && 
        <Button 
          onClick={() => signOut()}
          className="mt-auto mb-6 mx-4"
        >
          Sign Out
        </Button>
      }
    </div>    
  )
}