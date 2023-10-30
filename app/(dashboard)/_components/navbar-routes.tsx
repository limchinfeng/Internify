"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const NavbarRoutes = () => {
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
        className="text-4xl font-bold text-primary cursor-pointer
      ">
        Internify
      </div>
      <div className="ml-auto">
        profile image
      </div>
    </>
    
  )
}