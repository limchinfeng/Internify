"use client";

import { Preview } from "@/components/description-preview";

interface ListingIdDescriptionProps {
  description: string;
}

export const ListingIdDescription = ({
  description
}: ListingIdDescriptionProps) => {
  return (
    <div>
      <div className="text-black text-2xl font-bold">
        Description
      </div>
      <Preview 
        value={description}        
      />
    </div>
  )
}