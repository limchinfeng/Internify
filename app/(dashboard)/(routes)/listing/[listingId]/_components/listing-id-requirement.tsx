"use client";

import { Preview } from "@/components/description-preview";

interface ListingIdRequirementProps {
  requirement: string;
}

export const ListingIdRequirement = ({
  requirement
}: ListingIdRequirementProps) => {
  return (
    <div>
      <div className="text-2xl font-bold">
        Requirement
      </div>
      <Preview 
        value={requirement}        
      />
    </div>
  )
}