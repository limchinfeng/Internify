/*
1. upload pdf function, store in mongoDB
2. have a button for them to recommend
3. 
*/

import getCurrentUser from "@/actions/getCurrentUser";
import { redirect } from "next/navigation";
import { ResumeUpload } from "./_components/resume-upload";



const ResumePage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return redirect("/");
  }
  
  return (  
    <div className="p-6 w-full flex flex-col items-center justify-center gap-10">
      <ResumeUpload currentUser={currentUser} />
    </div>
  );
}
 
export default ResumePage;