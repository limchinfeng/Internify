"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ListingIdApplyProps {
  listingId: string;
  isApply: boolean;
  disabled: boolean;
  isCompany: boolean;
}

export const ListingIdApply = ({
  listingId, isApply, disabled, isCompany
}: ListingIdApplyProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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
        className="border-black hover:border-gray-600 transition hover:bg-transparent hover:text-gray-600 w-full"
        >
        Apply Now 
      </Button>}
      {isApply && <Button
        onClick={onDelete}
        disabled={disabled}
        variant="outline"
        size="lg"
        className="border-black hover:border-gray-600 transition hover:bg-transparent hover:text-gray-600 w-full"
        >
          Cancel application
        </Button>}
      {disabled && isCompany && <p className="text-red-600 text-sm italic">You are the author of this listing</p>}
      {!disabled && isCompany && <p className="text-red-600 text-sm italic">Company account is not allowed to apply</p>}
      {isApply && <p className="text-primary text-sm italic">You have applied this listing.</p>}
    </>
  )
}