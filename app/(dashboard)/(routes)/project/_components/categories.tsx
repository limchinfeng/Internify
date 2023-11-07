"use client";

import { Category } from "@prisma/client";
import { FcEngineering, FcFilmReel, FcMultipleDevices, FcMusic, FcOldTimeCamera, FcSalesPerformance, FcSportsMode } from "react-icons/fc";
import { IconType } from "react-icons";
import { CategoryItem } from "./category-item";
import { useEffect, useRef } from "react";

interface CategoriesProps {
  items: Category[];
}

// const iconMap: Record<Category["name"], IconType> = {
//   "Music": FcMusic,
//   "Photography": FcOldTimeCamera,
//   "Fitness": FcSportsMode,
//   "Accounting": FcSalesPerformance,
//   "Computer Science": FcMultipleDevices,
//   "Filming": FcFilmReel,
//   "Engineering": FcEngineering,
// };

export const Categories = ({
  items
}: CategoriesProps) => {
  const handleWheelScroll = (event: { preventDefault: () => void; deltaY: number; }) => {
    event.preventDefault();

    const element = document.getElementById("container"); // Replace with your actual ID
    if (element) {
      element.scrollBy({
        left: event.deltaY < 0 ? -30 : 30,
      });
    }
  };
  
  return (
    <div  
      id="container"
      onWheel={handleWheelScroll}
      className="flex items-center gap-x-2 overflow-x-auto overflow-y-hidden pb-2  no-scrollbar"
    >
      {items.map((item) => (
        <CategoryItem 
          key={item.id}
          label={item.name}
          // icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  )
}