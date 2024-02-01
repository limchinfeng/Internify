"use client";

import { BarChart, List } from "lucide-react"
import { SidebarItem } from "./sidebar.item"

const routes = [
  {
    icon: null,
    label: "Intern Listing",
    href: "/listing"
  },
  {
    icon: null,
    label: "Project Showcase",
    href: "/project"
  },
  {
    icon: null,
    label: "Recommendation",
    href: "/recommendation"
  },
  // {
  //   icon: null,
  //   label: "Resume Upload",
  //   href: "/resume"
  // },
  {
    icon: null, //not important things, can skip if no time
    label: "Favorite",
    href: "/favorite"
  },
]

export const SidebarRoutes = () => {
  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem 
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  )
}