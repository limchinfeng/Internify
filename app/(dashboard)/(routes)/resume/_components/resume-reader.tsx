"use client";

import { User } from "@prisma/client";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";

interface ResumeReaderProps {
  currentUser: User;
}

export const ResumeReader = ({
  currentUser
}: ResumeReaderProps) => {
  const [resumeText, setResumeText] = useState<string | null>(null);

  if(!currentUser.resumeUrl) {
    return null;
  }

  // useEffect(() => {
  //   async function fetchAndParsePDF(pdfUrl: string) {
  //     try {
  //       const response = await fetch(pdfUrl);
  //       const arrayBuffer = await response.arrayBuffer();
  //       const pdfData = await pdfParse(Buffer.from(arrayBuffer));
  //       setResumeText(pdfData.text);
  //     } catch (error) {
  //       console.error("Error fetching or parsing PDF:", error);
  //       setResumeText("Failed to load PDF.");
  //     }
  //   }

  //   if (currentUser && currentUser.resumeUrl) {
  //     fetchAndParsePDF(currentUser.resumeUrl);
  //   }
  // }, [currentUser.resumeUrl]); // Rerun when currentUser changes

  const onGenerate = async () => {
    try {
      const response = await axios.patch(`/api/resume`);
      setResumeText(response.data.value);
      toast.success("Done generating");
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  }

  return (
    <div>
      <Button
        onClick={onGenerate}
        variant="outline"
      >
        Generate
      </Button>
    </div>
  )
}