"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import toast from "react-hot-toast";

interface FileUploadProps {
  onChange: (url?: string[]) => void;
  endpoint: keyof typeof ourFileRouter;
};

export const FileUploads = ({
  onChange, endpoint
}: FileUploadProps) => {
  return (
    <UploadDropzone 
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        const pictureUrls = res?.map((item) => item.url) || [];
        onChange(pictureUrls);
      }}
      onUploadError={(error: Error) => {
        toast.error(`${error.message}`)
      }}
    />
  )
}