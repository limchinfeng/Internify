"use client";

import { User } from "@prisma/client";
import { ListingHeartButton } from "../../_components/listing-heart-button";
import Image from "next/image";

interface ListingIdHeadProps {
  id: string;
  imageUrl: string;
  currentUser: User;
}

export const ListingIdHead = ({ 
  id, imageUrl, currentUser 
}: ListingIdHeadProps) => {
  return (
    <div className="w-full lg:w-4/5 h-[60vh] overflow-hidden rounded-xl relative">
      <Image
        alt="Project Image"
        src={imageUrl}
        fill
        className="object-cover w-full"
      />
      <div className="absolute top-5 right-5">
        <ListingHeartButton listingId={id} user={currentUser} />
      </div>
    </div>
  );
};