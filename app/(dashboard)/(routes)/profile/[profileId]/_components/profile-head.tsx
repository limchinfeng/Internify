"use client";

import Image from "next/image";
import avatar from "@/public/images/placeholder.jpg";

interface ProfileHeadProps {
  imageSrc: string;
}

export const ProfileHead = ({ imageSrc }: ProfileHeadProps) => {
  return (
    <div className="flex justify-center items-center relative">
      <Image
        className="rounded-full w-28 h-28 md:w-40 md:h-40"
        height="100"
        width="100"
        alt="Avatar"
        src={imageSrc || avatar}
      />
    </div>
  );
};

export default ProfileHead;
