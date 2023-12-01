"use client";

import Image from "next/image";
import avatar from "@/public/images/placeholder.jpg";
import Link from "next/link";
import { User } from "@prisma/client";
import { BsTelephone } from "react-icons/bs";
import { AiOutlineMail, AiOutlineLink } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa6";

interface ProjectDetailsProps {
  title: string;
  category: string;
  imageSrc: string;
  name: string;
  phone: string;
  email: string;
  currentUser: User;
}

const ProjectDetails = ({
  title,
  category,
  name,
  imageSrc,
  phone,
  email,
  currentUser,
}: ProjectDetailsProps) => {
  return (
    <div className="flex flex-col gap-7">
      <div>
        <h1 className="text-black">Project Title</h1>
        <p className="text-3xl mt-2">{title}</p>
      </div>

      <div>
        <h1 className="text-black">Project Category</h1>
        <p className="text-xl mt-2">{category}</p>
      </div>

      <div>
        <h1 className="text-black">User Details</h1>
        <div className="flex flex-col gap-3 px-5 mt-2">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2 mt-2">
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
            <BsTelephone />
            {phone}
          </p>
          <p className="text-xl font-sans flex gap-3">
            <AiOutlineMail />
            {email}
          </p>
          <p className="text-xl font-sans flex gap-3">
            <FaLinkedin />
            <Link
              href={`http://${currentUser.link}`}
              target="_blank"
              className="text-lg font-medium italic text-primary hover:text-blue-800 transition hover:underline"
            >
              LinkedIn Profile
            </Link>
            {!currentUser.link && (
              <p className="font-medium text-slate-500 italic text-sm">
                No Link
              </p>
            )}
          </p>
          <p className="text-xl font-sans flex gap-3">
            <AiOutlineLink />
            <Link
              href={`${origin}/profile/${currentUser.id}`}
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
