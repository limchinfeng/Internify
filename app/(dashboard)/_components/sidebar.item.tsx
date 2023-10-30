"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface SidebarItemProps {
  icon: LucideIcon | null;
  label: string;
  href: string;
}

export const SidebarItem = ({
  icon: Icon, label, href
}: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (pathname ==="/" && href === "/") ||  pathname === href || pathname?.startsWith(`${href}/`) 

  const onClick = () => {
    router.push(href);
  }

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn("flex items-center gap-x-2 text-md font-semibold pl-6 hover:text-primary/90",
        isActive && "text-primary hover:text-primary/90"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        {Icon && 
          <Icon 
            size={22}
            className={cn("text-slate-500", isActive && "text-primary")}
          />
        }
        {label}        
      </div>
    </button>
  )
}