"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { NavbarImage } from "./navbar-image";
import { User } from "@prisma/client";

export const NavbarRoutes = ({
  currentUser
}: {currentUser?: User | null}) => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if(!isMounted) {
    return null;
  }
  
  return (
    <>
      <div 
        onClick={() => router.push("/")}
        className="md:text-4xl text-3xl font-bold text-primary cursor-pointer
      ">
        Internify
      </div>
      <div className="ml-auto">
        <NavbarImage currentUser={currentUser} />
      </div>
    </>
    
  )
}