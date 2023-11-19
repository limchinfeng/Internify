"use client"

import * as z from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { ImageIcon, Loader2, Pencil, PlusCircle, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Project, ShowcaseImage } from "@prisma/client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileUploads } from "@/components/file-uploads";


interface ProjectShowcaseProps {
  initialData: Project & {
    showcaseImages: ShowcaseImage[]
  };
  projectId: string;
}

const formSchema = z.object({
  url: z.object({url: z.string()}).array(),
});

export const ProjectShowcase = ({
  initialData, projectId
}: ProjectShowcaseProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/service/profile/project/${projectId}/showcaseImage`, values);
      toast.success("Project updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  }

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await axios.delete(`/service/profile/project/${projectId}/showcaseImage/${id}`);
      toast.success("Project showcase image deleted");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setDeletingId(null);
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <div className="border rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Project Showcase
        <Button onClick={toggleEdit} variant="ghost"> 
          {isEditing && (
            <>Cancel</>
          )}
          {!isEditing && initialData.showcaseImages.length !== 0 && (
            <>
              <Pencil className="w-4 h-4 mr-2" />
              Edit Image
            </>
          )}  
          {!isEditing && initialData.showcaseImages.length === 0 && (
            <>
              <PlusCircle className="w-4 h-4 mr-2" />
              Add an image
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        !initialData.showcaseImages ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-6 mt-2">
            {initialData.showcaseImages.map((image) => (
              <div
                key={image.id}
                className="flex items-center w-full rounded-md relative"
                >
                <div className="aspect-video h-auto w-44">
                  <Image 
                    alt="Upload"
                    fill
                    className="object-cover rounded-md"
                    src={image.url}
                  />
                </div>
                {deletingId === image.id && (
                  <div className="absolute top-1 right-1 bg-black text-white flex items-center justify-center rounded-full h-6 w-6">
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </div>
                )}
                {deletingId !== image.id && (
                  <div 
                    onClick={() => onDelete(image.id)}
                    className="hover:opacity-75 transition absolute rounded-full w-6 h-6 bg-black text-white flex items-center justify-center cursor-pointer top-1 right-1"
                  >
                    <X className="w-4 h-4" />
                  </div>
                )}
              </div>  
            ))}
          </div>  
        )
      )}
      {isEditing && (
        <div>
        <FileUploads
          endpoint="projectShowcaseImage"
          onChange={(urls) => {
            if(urls && urls.length > 0) {
              onSubmit({ url: urls.map(url => ({ url })) });
            }
          }}
        />
        <div className="text-xs text-muted-foreground mt-4">
          Add the photos that you would like to show to the public.
        </div>  
      </div>
      )}
    </div>
  )
}