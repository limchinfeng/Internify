"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User } from "@prisma/client";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineCheckCircle } from "react-icons/ai"
import { BiCopy } from "react-icons/bi";
import { useOrigin } from "@/hooks/use-origin";


interface ProfilePageLinkProps {
  currentUser: User;
}

export const ProfilePageLink = ({
  currentUser
}: ProfilePageLinkProps) => {

  const origin = useOrigin();
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  let userProfilePageLink = `${origin}/profile/${currentUser.id}`;

  // {currentUser.isCompany 
  //   ? userProfilePageLink = `${origin}/company/profile/${currentUser.id}`
  //   : userProfilePageLink = `${origin}/profile/${currentUser.id}` 
  // }

  const onCopy = () => {
    navigator.clipboard.writeText(userProfilePageLink);
    setCopied(true);
    setIsLoading(true);
    toast.success("Copied Successfully")

    setTimeout(() => {
      setCopied(false);
      setIsLoading(false);
    }, 2000);
  }

  return (
    <div className="flex flex-col md:w-4/5 w-[90%] ">
      <h1 className="text-primary font-bold">
        Profile Page Link
      </h1>
      <div className="flex items-center mt-2  border border-primary w-full rounded-lg">
        <Input
          disabled={isLoading}
          className="w-full p-2"
          value={userProfilePageLink}
          readOnly
        />
        <Button
          size="icon"
          disabled={isLoading}
          onClick={onCopy}
          className="h-10 w-10 bg-primary text-white hover:bg-primary/90 flex  justify-center items-center"
        >
          {copied ?
            <>
              <AiOutlineCheckCircle />
            </> :
            <>
              <BiCopy />
            </>
          }
        </Button>
      </div>
    </div>
  )
}