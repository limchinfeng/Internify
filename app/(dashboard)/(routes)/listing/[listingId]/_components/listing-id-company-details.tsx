"use client";

import { useOrigin } from "@/hooks/use-origin";
import { useRouter } from "next/navigation";
import avatar from "@/public/images/placeholder.jpg";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Link2, MapPin, Mail } from "lucide-react";
import { useEffect, useState } from "react";

interface ListingIdCompanyDetailsProps {
  name: string;
  email: string;
  location: string;
  state: string;
  link: string;
  userId: string;
  image: string;
}

export const ListingIdCompanyDetails = ({
  name, email, location, state, link, userId, image
}: ListingIdCompanyDetailsProps) => {
  const [hasMounted, setHasMounted] = useState(false);
  const origin = useOrigin();
  const router = useRouter();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="text-black text-2xl font-bold">
        Company Details
      </div>
      <div className="flex flex-col gap-2 text-md">
        <div className="flex flex-row gap-2 -ml-1">
         <Image
            className="rounded-full"
            height="30"
            width="30"
            alt="Profile Image"
            src={image || avatar}
          />
          {name}
        </div>
        <div className="flex flex-row gap-2 items-center">
          <Mail />
          {email}
        </div>
        <div className="flex flex-row gap-2 items-center">
          <MapPin className="h-6 w-6" />
          {location} | {state}
        </div>
        <div className="flex flex-row gap-2 items-center">
          <ExternalLink />
          {link ? (
          <Link
            href={link || ""}
            target="_blank"
            className="text-lg font-medium italic text-primary hover:text-blue-800 transition hover:underline"
          >
            {link}
          </Link>
          ): (
            <div className="text-slate-500 italic text-sm">No link available</div>
          )}
        </div>
        <div className="flex flex-row gap-2 items-center">
          <Link2 />
          <Link
            href={`${origin}/profile/${userId}`}
            target="_blank"
            className="text-lg font-medium italic text-primary hover:text-blue-800 transition hover:underline"
          >
            Internify Profile
          </Link>
        </div>
      </div>
    </div>
  )
}