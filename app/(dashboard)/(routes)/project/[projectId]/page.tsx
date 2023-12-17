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
    },
    include: {
      category: true,
      user: true,
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
      <div className="py-6 md:py-8 px-6 md:px-8">
      <div className="flex flex-col gap-7">
        <ProjectHead
          id={project.id}
          imageSrc={project.imageUrl || ""}
          currentUser={currentUser}
        />

        <div className="flex flex-col md:flex-row md:gap-10">
          <div className="order-2 md:order-2 flex-1">
            <ProjectDescription description={project.description || ""} />
          </div>

          <div className="order-1 md:order-1 mb-5 md:mb-0 flex-1">
            <ProjectDetails
              id={project.user.id}
              title={project.title}
              category={project.category?.name || ""}
              imageSrc={project.user.imageUrl || ""}
              name={project.user.name || ""}
              phone={project.user.phone || ""}
              email={project.user.email || ""}
              link={project.user.link || ""}
            />
          </div>
        </div>

        <ProjectShowcase
          id={project.id}
          showcaseImages={project.showcaseImages}
        />
      </div>
      </div>
    </div>
  );
};

export default ProjectIdPage;