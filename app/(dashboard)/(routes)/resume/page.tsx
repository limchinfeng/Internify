import getCurrentUser from "@/actions/getCurrentUser";
import { redirect } from "next/navigation";
import { ResumeUpload } from "./_components/resume-upload";
import { ResumeReader } from "./_components/resume-reader";
import FileUpload from "./_components/file-upload";
import { ResumeDownload } from "./_components/resume-download";



const ResumePage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return redirect("/");
  }
  
  return (  
    <div className="p-6 w-full flex flex-col items-center justify-center gap-10">
      <ResumeUpload currentUser={currentUser} />
      <ResumeReader currentUser={currentUser} />

      <p>_____________________________</p> <br />

      <ResumeDownload />

    </div>
  );
}
 
export default ResumePage;