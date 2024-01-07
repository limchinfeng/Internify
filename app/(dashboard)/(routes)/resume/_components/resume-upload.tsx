"use client";

import { FileUpload } from "@/components/file-upload";
import { User } from "@prisma/client";
import axios from "axios";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { Edit, Pencil, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { File } from "lucide-react";

interface ResumeUploadProps {
  currentUser: User;
}

const formSchema = z.object({
  resumeUrl: z.string().min(1, {
    message: "Resume is required",
  }),
});

export const ResumeUpload = ({
  currentUser
}: ResumeUploadProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/profile`, values);
      toast.success("Resume updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  }

  
  return (  
    <div className="flex justify-center items-center">
      <div className="flex justify-center items-center">
        {!isEditing ? <>
          {!currentUser.resumeUrl ? (
            <div className="flex flex-col gap-2 justify-center items-center">
              <Button 
                  onClick={toggleEdit}
                  size="lg"
                  variant="black"
                  className="hover:opacity-75 transition h-12"
                >
                  <Edit className="w-4 h-4 mr-2" /> Submit
                </Button>
                <div className="text-slate-500 italic text-sm">
                  Oops! Looks like you havent update your resume.
                </div>
            </div>
          ) : (
            <div className="flex flex-row gap-2 justify-center items-center">
              <div>
                <a
                  href={currentUser.resumeUrl}
                  target="_blank"
                  className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline gap-2"
                >
                  <File />
                  <p className="line-clamp-1">
                    {currentUser.name}'s resume
                  </p>
                </a>
              </div>
              <Button 
                  onClick={toggleEdit}
                  size="lg"
                  variant="black"
                  className="hover:opacity-75 transition h-12"
                >
                  <Edit className="w-4 h-4 mr-2" /> Resubmit
                </Button>
            </div>
          )}
        </> : (
          <>
            <div className="w-80 flex flex-col justify-between items-center">
              <FileUpload 
                endpoint="resumeAttachment"
                onChange={(url) => {
                  if(url) {
                    onSubmit({resumeUrl: url})
                  }
                }}
              />
              <div className="text-xs text-muted-foreground mt-4 flex flex-row items-center gap-5 ">
                <div>
                  1:1 aspect ratio recommended
                </div>
                <Button 
                  onClick={toggleEdit}
                  variant="ghost" 
                  size="sm"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </>
        )}    
      </div>
    </div>
  );
}
