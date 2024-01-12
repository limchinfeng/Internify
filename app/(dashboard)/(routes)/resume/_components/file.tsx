// // Import necessary modules and types
// import { useState } from "react";
// import axios, { AxiosError } from "axios";
// import toast from "react-hot-toast";
// import { Button } from "@/components/ui/button";
// import { User } from "@prisma/client";

// interface ResumeReaderProps {
//   currentUser: User;
// }

// export const ResumeReader = ({ currentUser }: ResumeReaderProps) => {
//   const [resumeText, setResumeText] = useState<string | null>(null);

//   const onGenerate = async () => {
//     // Create the form data to send the file
//     const formData = new FormData();
//     formData.append("file", fs.createReadStream(currentUser.resumeUrl)); // Ensure the path is correct and accessible

//     // Set the options for the axios request
//     const options = {
//       headers: {
//         "x-api-key": "sec_xxxxxx",
//         ...formData.getHeaders(),
//       },
//     };

//     try {
//       const response = await axios.post("https://api.chatpdf.com/v1/sources/add-file", formData, options);
//       console.log("Source ID:", response.data.sourceId);
//       toast.success("Done generating");
//       // Handle the response as needed, maybe setting some state
//     } catch (error) {
//       const axiosError = error as AxiosError;
//       toast.error("Something went wrong");
//       console.log("Error:", axiosError.message);
//       console.log("Response:", axiosError.response?.data);
//     }
//   };

//   if (!currentUser.resumeUrl) {
//     return null; // Or some other placeholder
//   }

//   return (
//     <div>
//       <Button onClick={onGenerate} variant="outline">
//         Generate
//       </Button>
//       {/* Possibly display the resume text or other information here */}
//     </div>
//   );
// };
