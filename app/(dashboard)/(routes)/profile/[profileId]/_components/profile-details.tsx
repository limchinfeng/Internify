"use client";

import { Preview } from "@/components/description-preview";
import Link from "next/link";
import { AiOutlineMail } from "react-icons/ai";
import { TbFileDescription } from "react-icons/tb";
import { IoIosLink } from "react-icons/io";
import { BsTelephone } from "react-icons/bs";
import { LuUser2 } from "react-icons/lu";

interface ProfileDetailsProps {
  name: string;
  email: string;
  description: string;
  phone: string;
  link: string;
}

export const ProfileDetails = ({
  name,
  email,
  description,
  phone,
  link,
}: ProfileDetailsProps) => {

  var iconStyle = "m-1 h-6 w-6";

  return (
    <div className="flex flex-col gap-6">
      <div className="border rounded-md p-4 w-full">
        <div className="mx-6">
          <div className="flex flex-row gap-3">
            <LuUser2 className={iconStyle}/>
            <h1 className="font-medium text-black">Name</h1>
          </div>
          <p className="text-xl mx-11 font-sans mt-1">{name}</p>
        </div>
      </div>

      <div className="border rounded-md p-4 w-full">
        <div className="mx-6">
          <div className="flex flex-row gap-3">
            <AiOutlineMail className={iconStyle}/>
            <h1 className="font-medium text-black">Email</h1>
          </div>
          <p className="text-xl mx-11 font-sans mt-1">{email}</p>
        </div>
      </div>

      <div className="border rounded-md p-4 w-full">
        <div className="mx-6">
          <div className="flex flex-row gap-3">
            <BsTelephone className={iconStyle}/>
            <h1 className="font-medium text-black">Phone</h1>
          </div>
          <p className="text-xl mx-11 font-sans mt-1">{phone}</p>
        </div>
      </div>

      <div className="border rounded-md p-4 w-full">
        <div className="mx-6">
          <div className="flex flex-row gap-3">
            <IoIosLink className={iconStyle}/>
            <h1 className="font-medium text-black">Link</h1>
          </div>
          <Link
            href={`http://${link}`}
            target="_blank"
            className="text-xl font-medium italic text-primary hover:text-blue-800 transition hover:underline mx-11 font-sans mt-1"
          >
            {link}
          </Link>
          {!link && <p className="font-medium italic text-xl">No Link</p>}
        </div>
      </div>

      <div className="border rounded-md p-4 w-full">
        <div className="mx-6">
          <div className="flex flex-row gap-3">
            <TbFileDescription className={iconStyle}/>
            <h1 className="font-medium text-black">Description</h1>
          </div>
          {description && <Preview value={description} />}
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
