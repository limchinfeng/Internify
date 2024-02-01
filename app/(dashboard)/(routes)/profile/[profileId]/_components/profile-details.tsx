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
  var iconStyle = "m-1 h-5 w-5";

  return (
    <div className="w-4/5 grid grid-cols-1 md:grid-cols-2 md:gap-10">
      <div className="flex flex-col items-center gap-x-4 gap-4">
        <div className="border rounded-md p-4 w-full">
          <div className="mx-6">
            <div className="flex flex-row gap-3">
              <LuUser2 className={iconStyle} />
              <h1 className="text-lg text-black">Name</h1>
            </div>
            <p className="text-xl mx-10 font-sans mt-1">{name}</p>
          </div>
        </div>

        <div className="border rounded-md p-4 w-full">
          <div className="mx-6">
            <div className="flex flex-row gap-3">
              <BsTelephone className={iconStyle} />
              <h1 className="text-lg text-black">Phone</h1>
            </div>
            {phone === "" ? <>
              <p className="mx-10 text-slate-500 italic text-sm">No phone number</p>
            </> : <>
              <p className="text-xl mx-10 font-sans mt-1">{phone}</p>
            </>}
          </div>
        </div>

        <div className="border rounded-md p-4 w-full">
          <div className="mx-6">
            <div className="flex flex-row gap-3">
              <AiOutlineMail className={iconStyle} />
              <h1 className="text-lg text-black">Email</h1>
            </div>
            <p className="text-xl mx-10 font-sans mt-1">{email}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-x-4 gap-4 mt-4 md:mt-0">
        <div className="border rounded-md p-4 w-full">
          <div className="mx-6">
            <div className="flex flex-row gap-3">
              <IoIosLink className={iconStyle} />
              <h1 className="text-lg text-black">Link</h1>
            </div>
            <>
              {link ?
                (
                  <Link
                    href={`http://${link}`}
                    target="_blank"
                    className="text-xl font-medium italic text-primary hover:text-blue-800 transition hover:underline mx-10 font-sans mt-1"
                  >
                    {link}
                  </Link>
                ) : (
                  <p className="mx-10 text-slate-500 italic text-sm">No Link</p>
                )}
            </>
          </div>
        </div>

        <div className="border rounded-md p-4 w-full">
          <div className="mx-6">
            <div className="flex flex-row gap-3">
              <TbFileDescription className={iconStyle} />
              <h1 className="text-lg text-black">Description</h1>
            </div>
            <>
              {description === "" ? <>
                <p className="mx-10 text-slate-500 italic text-sm">No description</p>
              </> : <>
                <Preview value={description} />
              </>}
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
