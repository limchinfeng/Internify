"use client";

import Image from "next/image";
import avatar from "@/public/images/placeholder.jpg";
import Link from "next/link";
import { useOrigin } from "@/hooks/use-origin";
import { BsTelephone } from "react-icons/bs";
import { IoIosLink } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa6";
import { CiMail } from "react-icons/ci";

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
  const origin = useOrigin();

  var iconStyle = "m-1 h-5 w-5";

  return (
    <div className="flex flex-col gap-7">
      <div>
        <h1 className="text-black text-xl">Project Title</h1>
        <p className="text-2xl mt-2">{title}</p>
      </div>

      <div>
        <h1 className="text-black text-xl">Project Category</h1>
        <p className="text-2xl mt-2">{category}</p>
      </div>

      <div>
        <h1 className="text-black text-xl">User Details</h1>
        <div className="flex flex-col gap-3 px-5 mt-2">
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
          <p className="text-xl font-sans flex gap-3">
            <BsTelephone className={iconStyle} />
            {phone}
          </p>
          <p className="text-xl font-sans flex gap-3">
            <CiMail className={iconStyle} />
            {email}
          </p>
          <p className="text-xl font-sans flex gap-3">
            <FaLinkedin className={iconStyle} />
            <Link
              href={`${link}`}
              target="_blank"
              className="text-lg font-medium italic text-primary hover:text-blue-800 transition hover:underline"
            >
              LinkedIn Profile
            </Link>
            {!link && (
              <p className="font-medium italic text-lg font-sans">No Link</p>
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