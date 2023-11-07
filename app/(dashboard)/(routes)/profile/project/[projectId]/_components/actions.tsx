"use client";

import { ConfirmModal } from "@/components/modal/confirm-modal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface ActionsProps {
  disabled: boolean;
  projectId: string;
  isPublished: boolean;
}

export const Actions = ({
  disabled, projectId, isPublished
}: ActionsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      if(isPublished) {
        await axios.patch(`/api/profile/project/${projectId}/unpublish`);
        toast.success("Project unpublished");
      } else {
        await axios.patch(`/api/profile/project/${projectId}/publish`);
        toast.success("Project published");
      }

      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally { 
      setIsLoading(false);
    }
  }

  const onDelete = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/profile/project/${projectId}`)
      router.refresh();
      router.push(`/profile`);
      toast.success("Project deleted");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading} variant="destructive">
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  )
}