import getCurrentUser from "@/actions/getCurrentUser";
import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();

const handleAuth = async () => {
  const currentUser = await getCurrentUser();

  if(!currentUser ) throw new Error("Unauthorized");
  return {currentUser};
}

export const ourFileRouter = {
  profileImage:f({image: {maxFileCount: 1, maxFileSize: "4MB"}})
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  listingImage:f({image: {maxFileCount: 1, maxFileSize: "4MB"}})
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  projectImage:f({image: {maxFileCount: 1, maxFileSize: "4MB"}})
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  projectShowcaseImage:f({image: {maxFileCount: 4, maxFileSize: "4MB"}})
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;