"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { NavbarImage } from "./navbar-image";
import { User } from "@prisma/client";
import Image from 'next/image'

export const NavbarRoutes = ({
  currentUser
}: { currentUser?: User | null }) => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  // const containsCompany = pathname?.includes('/company');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {currentUser?.isCompany ? <>
        <div
          onClick={() => router.push("/")}
          className="md:text-4xl text-3xl font-bold text-primary cursor-pointer flex items-center justify-center flex-row"
        >
          <div className="pr-3">
            <Image
              src="/Internify-logo.png"
              width={70}
              height={45}
              alt="logo"
            />
          </div>
          <div>
            Internify
          </div>
          <p className='font-light text-base text-gray-600 mt-5'>
            company
          </p>
        </div>
      </> : <>

        <div
          onClick={() => router.push("/")}
          className="md:text-4xl text-3xl font-bold text-primary cursor-pointer"
        >
          <div className="pr-3">
            <Image
              src="/Internify-logo.png"
              width={70}
              height={45}
              alt="logo"
            />
          </div>
          <div>
            Internify
          </div>
        </div>
      </>}

      <div className="ml-auto flex flex-row items-center gap-3">
        {/* {currentUser?.isCompany && containsCompany &&  (
          <div 
            className="block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
            onClick={() => router.push("/profile")}
          >
            Go to Profile
          </div>
        )} */}
        {/* {currentUser?.isCompany && (
          <div
            className="block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
            onClick={() => router.push("/company/profile")}
          >
            Go to Company
          </div>
        )} */}
        <NavbarImage currentUser={currentUser} />
      </div>
    </>
  )
}