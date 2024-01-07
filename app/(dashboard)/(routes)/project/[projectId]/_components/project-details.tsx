"use client";

import Image from "next/image";
import avatar from "@/public/images/placeholder.jpg";
import Link from "next/link";
import { useOrigin } from "@/hooks/use-origin";
import { BsTelephone } from "react-icons/bs";
import { IoIosLink } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa6";
import { CiMail } from "react-icons/ci";
import { ExternalLink, icons } from "lucide-react";
import { useEffect, useState } from "react";

interface ProjectDetailsProps {
  id: string;
  title: string;
  category: string;
  imageSrc: string;
  name: string;
  phone: string;
  email: string;
  link: string;
}

const ProjectDetails = ({
  id,
  title,
  category,
  name,
  imageSrc,
  phone,
  email,
  link,
}: ProjectDetailsProps) => {
  const [hasMounted, setHasMounted] = useState(false);
  const origin = useOrigin();

  var iconStyle = "m-1 h-5 w-5";

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-1">
        <h1>
          {title}
        </h1>
        <p>
          {category}
        </p>
      </div>

      <div>
        <h1 className="text-black text-xl">User Details</h1>

        <div className="flex flex-col gap-3 mt-2">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-3 mt-2">
              <Image
                className="rounded-full"
                height="30"
                width="30"
                alt="Profile Image"
                src={imageSrc || avatar}
              />
              <p className="text-xl font-sans flex gap-3">{name}</p>
            </div>
          </div>

          {phone ? (
            <p className="text-xl font-sans flex gap-3">
              <BsTelephone className={iconStyle} />
              {phone}
            </p>
          ): (
            <p className="text-slate-500 italic text-sm flex gap-3 items-center">
              <BsTelephone className={iconStyle} />
              No phone available
            </p>
          )}
          
          <p className="text-xl font-sans flex gap-3">
            <CiMail className={iconStyle} />
            {email}
          </p>

          <p className="text-xl font-sans flex gap-3 items-center">
            <ExternalLink className={iconStyle}/>
            {link ? (  
              <Link
                href={`${link}`}
                target="_blank"
                className="text-lg font-medium italic text-primary hover:text-blue-800 transition hover:underline"
                >
                {link}
              </Link>
            ) : (
              <p className="text-slate-500 italic text-sm">No link available</p>
            )}
          </p>

          <p className="text-xl font-sans flex gap-3">
            <IoIosLink className={iconStyle} />
            <Link
              href={`${origin}/profile/${id}`}
              target="_blank"
              className="text-lg font-medium italic text-primary hover:text-blue-800 transition hover:underline"
            >
              Internify Profile
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;