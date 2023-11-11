"use client"

import { Button } from "@/components/ui/button"
import { User } from "@prisma/client"
import { signOut } from "next-auth/react"
import Image from 'next/image';
import avatar from "@/public/images/placeholder.jpg"
import { User2 } from "lucide-react";



export const UserHome = ({
  currentUser
}: {
  currentUser: User
}) => {


  return (
    <div className="flex justify-center items-center h-20">
      <div className="pr-2"><Image
        className='rounded-full cursor-pointer w-15 h-15'
        height='60'
        width='60'
        alt='Avatar'
        src={currentUser?.imageUrl || avatar}
      />
      </div>
      <p className="pl-10">{currentUser.email}</p>
      <div className="pl-10">

        <Button className="w-48 h-12">
          <User2 className="mr-2 h-4 w-4" /> Profile
        </Button>
      </div>

    </div>
  )
}