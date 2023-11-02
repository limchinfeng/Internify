"use client"

import { User } from "@prisma/client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import * as z from "zod";
import Image from "next/image";
import avatar from "@/public/images/placeholder.jpg";
import { Pencil } from "lucide-react";
import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Image is required",
  }),
});

export const ProfileImage = ({
  currentUser
}: {currentUser: User}) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/profile`, values);
      toast.success("Course updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  }
  
  return (
    <div className="flex justify-center items-center">
      <div className="flex justify-center items-center relative">
        {!isEditing ? <>
          <Image 
            className='rounded-full cursor-pointer w-28 h-28 md:w-40 md:h-40'
            height='100'
            width='100'
            alt='Avatar'
            src={ currentUser.imageUrl || avatar}
          />
          <div 
            onClick={toggleEdit}
            className="absolute bottom-2 md:ml-24 ml-20 rounded-full bg-black md:w-10 md:h-10 w-8 h-8 text-white flex items-center justify-center cursor-pointer"
          >
            <Pencil className="text-white w-4 md:w-6"/>
          </div>
        </> : (
          <></>
        )}
       
      </div>
        {isEditing && (
          <div className="w-80 flex flex-col justify-between items-center">
            <FileUpload 
              endpoint="profileImage"
              onChange={(url) => {
                if(url) {
                  onSubmit({imageUrl: url})
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
        )}
      </div>
  )
}