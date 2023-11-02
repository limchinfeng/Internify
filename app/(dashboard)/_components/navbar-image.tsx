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
          {/* <div className="w-full flex flex-col items-center justify-center"> */}
              {currentUser ? <>
                <DropdownMenuItem onClick={() => signOut()}>Log Out</DropdownMenuItem>
              </> : <>
              <DropdownMenuItem onClick={() => router.push("/login")}>Login</DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/register")}>Register</DropdownMenuItem>
              </>}
          {/* </div> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}