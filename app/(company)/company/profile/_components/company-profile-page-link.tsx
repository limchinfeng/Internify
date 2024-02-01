"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useOrigin } from "@/hooks/use-origin";
import { User } from "@prisma/client";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineCheckCircle } from "react-icons/ai"
import { BiCopy } from "react-icons/bi";

interface CompanyProfilePageLinkProps {
  currentUser: User;
}

export const CompanyProfilePageLink = ({
  currentUser
}: CompanyProfilePageLinkProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const origin = useOrigin();

  const userProfilePageLink = `${origin}/company/profile/${currentUser.id}`

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
      <h1>
        Company Profile Page Link
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