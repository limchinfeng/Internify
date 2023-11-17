/*
  TASK - Yohan
  create a page for the public user to view the user project page (like others view your social media post)

  1. get current user
  2. check if current user is valid (can refer to others page)
  3. shows the project post & user details (can design what you like )
*/

import getCurrentUser from "@/actions/getCurrentUser";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Preview } from "@/components/description-preview";
import prismadb from "@/lib/prismadb";
import {IoPersonOutline} from "react-icons/io5";
import {BsTelephone} from "react-icons/bs";
import {AiOutlineMail, AiOutlineLink} from "react-icons/ai";

const ProjectIdPage = async ({
  params
}:{
  params:{projectId: string}
})=>{

  const currentUser = await getCurrentUser();

  if(!currentUser) {
    return redirect("/");
  }

  const project = await prismadb.project.findUnique({
    where: {
      id: params.projectId,
      userId: currentUser.id,
    },
    include: {
      category: true,
      showcaseImages: {
        orderBy: {
          createdAt: "asc"
        }
      }
    }
  });

  if (!project) {
    return redirect("/");
  }

  const firstImage = project.showcaseImages[0];

  return (

    <div className="//max-w-[250px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 my-10">
      <div className="max-w-screen-lg m-auto">
      <div className="flex flex-col gap-7">
      {/* <div className="p-8 flex justify-center items-center relative"> */}
      {/* <div className="w-full h-[60vh] overflow-hidden rounded-xl relative"> */}
      <div className="container-lg">
          <img src={project.imageUrl} alt="Project Image" className="rounded-xl object-fill w-full"></img>
      </div>
    
      <div>
        <h1 className='text-black'>Project Title</h1>
        <p className="text-3xl mt-2">{project.title}</p>
      </div>

      <div>
        <h1 className='text-black'>Project Category</h1>
        <p className="text-xl mt-2">{project.category.name}</p>
      </div>

      <div>
      <h1 className='text-black'>User Details</h1>
        <div className="flex flex-col gap-2 px-5 mt-2">
        <p className="text-xl font-sans flex gap-3"><IoPersonOutline/>{currentUser.name}</p>
        <p className="text-xl font-sans flex gap-3"><BsTelephone/>{currentUser.phone}</p>
        <p className="text-xl font-sans flex gap-3"><AiOutlineMail/>{currentUser.email}</p>
        <p className="text-xl font-sans flex gap-3"><AiOutlineLink/> 
        <Link
              href={`${currentUser.link}`}
              target="_blank"
              className="text-lg font-medium italic text-primary hover:text-blue-800 transition hover:underline"
            >
              {currentUser.link}
            </Link>
            {!currentUser.link && (
              <p className="font-medium text-slate-500 italic text-xl">
                No link
              </p>
            )}
        </p>
        </div>
      </div>

      <div>
        <h1 className='text-black'>Project Description</h1>
        <div>
              {project.description && (
                <Preview value={project.description}/>
              )}
              {!project.description && (
              <p className="font-medium text-slate-500 italic text-sm">
                No description
              </p>
            )}
        </div>
      </div>

      <div>
  <h1 className="text-black">Project Showcase</h1>
  <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 mb-10 mt-3">
    {project.showcaseImages.map((image) => (
      <div key={image.id} className="justify-center items-center relative">
        <Image
          className="rounded-xl"
          height="450"
          width="600"
          alt="Showcase Image"
          src={image.url}
        />
      </div>
    ))}
  </div>
</div>

      </div>
    </div>
    </div>
  )
}

export default ProjectIdPage;