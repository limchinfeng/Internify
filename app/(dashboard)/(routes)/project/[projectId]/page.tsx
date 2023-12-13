/*
  TASK - Yohan
  create a page for the public user to view the user project page (like others view your social media post)

  1. get current user
  2. check if current user is valid (can refer to others page)
  3. shows the project post & user details (can design what you like )
*/

import getCurrentUser from "@/actions/getCurrentUser";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import ProjectHead from "./_components/project-head";
import ProjectDetails from "./_components/project-details";
import ProjectDescription from "./_components/project-description";
import ProjectShowcase from "./_components/project-showcase";

const ProjectIdPage = async ({ params }: { params: { projectId: string } }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
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
          createdAt: "asc",
        },
      },
    },
  });

  if (!project) {
    return redirect("/");
  }

  return (
    <div className="max-w-screen-lg m-auto">
      <div className="flex flex-col gap-7">
        <ProjectHead
          id={project.id}
          imageSrc={project.imageUrl || ""}
          currentUser={currentUser}
        />

        <div className="flex">
          <div className="flex-shrink-0 w-1/2 pr-8">
            <ProjectDetails
              id={currentUser.id}
              title={project.title}
              category={project.category?.name || ""}
              imageSrc={currentUser.imageUrl || ""}
              name={currentUser.name || ""}
              phone={currentUser.phone || ""}
              email={currentUser.email || ""}
              link={currentUser.link || ""}
            />
          </div>

          <div className="w-1/2">
            <ProjectDescription description={project.description || ""} />
          </div>
        </div>

        <ProjectShowcase
          id={project.id}
          showcaseImages={project.showcaseImages}
        />
      </div>
    </div>
  );
};

export default ProjectIdPage;