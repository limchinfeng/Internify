"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { NavbarImage } from "./navbar-image";
import { User } from "@prisma/client";
import Image from 'next/image'
import ThemeSwitch from '../../../components/theme-switch'
import { useTheme } from 'next-themes'


export const NavbarRoutes = ({
  currentUser
}: { currentUser?: User | null }) => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { resolvedTheme } = useTheme()
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
          className="cursor-pointer flex items-center justify-center flex-row gap-2"
        >
          <div className="">
            <>
              {resolvedTheme === 'light' ? (
                <Image
                  src="/Internify-logo.png"
                  width={70}
                  height={45}
                  alt="logo"
                />
              ) : (
                <Image
                  src="/Internify-logo-dark.png"
                  width={70}
                  height={45}
                  alt="logo"
                />
              )}
            </>
          </div>

          <div className="md:text-4xl text-3xl font-bold text-primary flex flex-row">
            <div>
              Internify
            </div>
            <p className='font-light text-base mt-5'>
              company
            </p>
          </div>
        </div>
      </> : <>

        <div
          onClick={() => router.push("/")}
          className="cursor-pointer flex items-center justify-center flex-row gap-2"
        >
          <div className="">
            <>
              {resolvedTheme === 'light' ? (
                <Image
                  src="/Internify-logo.png"
                  width={70}
                  height={45}
                  alt="logo"
                />
              ) : (
                <Image
                  src="/Internify-logo-dark.png"
                  width={70}
                  height={45}
                  alt="logo"
                />
              )}
            </>
          </div>
          <div className="md:text-4xl text-3xl font-bold text-primary flex flex-row">
            Internify
          </div>
        </div>
      </>}

      <div className="ml-auto flex flex-row items-center gap-6 ">
        <ThemeSwitch />
        <NavbarImage currentUser={currentUser} />
      </div>
    </>
  )
}