"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "@prisma/client";
import { CompanyNavbarImage } from "./company-navbar-image";

export const CompanyNavbar = ({
  currentUser
}: {currentUser?: User | null}) => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const containsCompany = pathname?.includes('/company');
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if(!isMounted) {
    return null;
  }
  return (
    <div className="p-4 px-8 border-b h-full flex items-center bg-white shadow-sm">
      <div 
        onClick={() => router.push("/company/profile")}
        className="md:text-4xl text-3xl font-bold text-primary cursor-pointer flex items-center justify-center flex-row"
      >
        <div>
          Internify
        </div>
        <p className='font-light text-base text-gray-600 mt-5'>
          company
        </p>
      </div>

      <div className="ml-auto flex flex-row items-center gap-3">
        <div 
          className="block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
          onClick={() => router.push("/profile")}
          >
          Go to User
        </div>
        <CompanyNavbarImage currentUser={currentUser} />
      </div>
    </div>
  )
}