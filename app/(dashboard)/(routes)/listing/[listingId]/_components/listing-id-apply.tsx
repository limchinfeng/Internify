"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ListingIdApplyProps {
  listingId: string;
}

export const ListingIdApply = ({
  listingId
}: ListingIdApplyProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async () => {
    try {
      await axios.post(`/api/listing/`);
      toast.success("Profile updated");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  }


  return (
    <Button
      onClick={onSubmit}
    >
      Apply Now
    </Button>
  )
}