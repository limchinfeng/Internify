"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import avatar from "@/public/images/placeholder.jpg"
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import Image from 'next/image';
import { useRouter } from "next/navigation";

export const NavbarImage =  ({
  currentUser
}: {currentUser?: User | null}) => {
  const router = useRouter();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Image 
            className='rounded-full cursor-pointer w-10 h-10'
            height='40'
            width='40'
            alt='Avatar'
            src={ currentUser?.imageUrl || avatar}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            <div className="w-full flex items-center justify-center">
              {currentUser  
                ? <>{currentUser.name}</>
                : <>Guest</>
              }
            </div>
          </DropdownMenuLabel> 
          <DropdownMenuSeparator />
            {/* {currentUser?.isCompany && (
              <DropdownMenuItem onClick={() => router.push("/company/profile")}>Go to Company</DropdownMenuItem>
            )} */}
            {currentUser ? <>
              <DropdownMenuItem onClick={() => router.push("/profile")}>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={() => signOut()}>Log Out</DropdownMenuItem>
            </> : <>
            <DropdownMenuItem onClick={() => router.push("/login")}>Login</DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/register")}>Register</DropdownMenuItem>
            </>}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}