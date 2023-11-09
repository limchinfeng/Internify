"use client";

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
// import { HeartButton } from "./heart-button";
import * as cheerio from 'cheerio';
import { ListingHeartButton } from "./listing-heart-button";

interface ListingCardProps {
  id: string;
  title: string;
  description: string;
  state: string;
  name: string;
  userId: string;
  userImage: string;
  imageUrl: string;
  category: string;
  user: User;
}

export const ListingCard = ({
  id, title, description, state, name, userId,userImage, imageUrl, category, user
}: ListingCardProps) => {
  const router = useRouter();
  const shortName: string = name.slice(0, 2);

  const cheerioDescription = cheerio.load(description);
  const textContent = cheerioDescription.text();
  const truncatedDescription = textContent.slice(0, 100) + (textContent.length > 100 ? '...' : '');

  const handleAvatarClick = (event: any) => {
    // Prevent the click event from reaching the parent div's click handler
    event.stopPropagation();
    router.push(`/profile/${userId}`);
  };

return (
    <div
      onClick={() => router.push(`listing/${id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-video w-full relative overflow-hidden rounded-xl">
            <Image
              fill
              alt="project image"
              src={imageUrl}
              className="object-cover h-full w-full group-hover:scale-110 transition"
            />
            <div className="absolute top-3 right-3">
              <ListingHeartButton listingId={id} user={user} />
            </div>
        </div>
        <div>
          <div className="flex justify-start items-center gap-2">
            <div onClick={handleAvatarClick}>
              <Avatar>
                <AvatarImage src={userImage} alt="profile" />
                <AvatarFallback>{shortName}</AvatarFallback>
              </Avatar>
            </div>

            {/* title */}
            <div className="flex flex-col ">
              <div className="font-semibold text-xl ">
                {title}
              </div>
              <div className="text-sm font-light">
                {category} | {state}
              </div>
            </div>
          </div>

          {/* user name */}
          <div className="my-1 text-base text-primary font-bold">
            {name}
          </div>
          {/* description */}
          <div className="text-sm">
            {truncatedDescription}
          </div>
        </div>
      </div>
    </div>
  )
}