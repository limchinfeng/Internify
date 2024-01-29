"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface ListingIdApplyProps {
  listingId: string;
  isApply: boolean;
  disabled: boolean;
  isCompany: boolean;
}

export const ListingIdApply = ({
  listingId, isApply, disabled, isCompany
}: ListingIdApplyProps) => {
  const router = useRouter();
  const {resolvedTheme} = useTheme();

  const onSubmit = async () => {
    try {
      await axios.post(`/api/listing/${listingId}`);
      toast.success("Application requested");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  }

  const onDelete = async () => {
    try {
      await axios.delete(`/api/listing/${listingId}`);
      toast.success("Application deleted");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  }

  return (
    <>
      {!isApply && <Button
        onClick={onSubmit}
        disabled={disabled}
        variant="outline"
        size="lg"
        className={cn("transition w-full hover:border-gray-600 hover:bg-transparent", resolvedTheme==="light" ? "border-black hover:text-gray-600" : "border-white hover:text-gray-400")}
        >
        Apply Now 
      </Button>}
      {isApply && <Button
        onClick={onDelete}
        disabled={disabled}
        variant="outline"
        size="lg"
        className={cn("transition w-full hover:border-gray-600 hover:bg-transparent", resolvedTheme==="light" ? "border-black hover:text-gray-600" : "border-white hover:text-gray-400")}
        >
          Cancel application
        </Button>}
      {disabled && isCompany && <p className="text-red-600 text-sm italic text-center mt-1">You are the author of this listing</p>}
      {!disabled && isCompany && <p className="text-red-600 text-sm italic  text-center mt-1">Company account is not allowed to apply</p>}
      {isApply && <p className="text-primary text-sm italic  text-center mt-1">You have applied this listing.</p>}
    </>
  )
}