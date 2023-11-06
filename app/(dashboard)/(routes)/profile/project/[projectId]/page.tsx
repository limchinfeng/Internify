import getCurrentUser from "@/actions/getCurrentUser";
import { Banner } from "@/components/banner";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import { Actions } from "./_components/actions";
import { ProjectTitle } from "./_components/project-title";
import { ProjectCategory } from "./_components/project-category";
import { ProjectDescription } from "./_components/project-description";
import { ProjectBackground } from "./_components/project-background";
import { ProjectShowcase } from "./_components/project-showcase";


const ProjectIdPage = async ({
  params
}: {
  params: {projectId: string}
}) => {
  const currentUser = await getCurrentUser();

  if(!currentUser) {
    return redirect("/");
  }

  const project = await prismadb.project.findUnique({
    where: {
      id: params.projectId,
      userId: currentUser.id
    },
    include: {
      showcaseImages: {
        orderBy: {
          createdAt: "asc"
        }
      }
    }
  });

  const categories = await prismadb.category.findMany({
    orderBy: {
      name: "asc"
    }
  });

  if(!project) {
    return redirect("/");
  }

  const requiredFields = [
    project.title,
    project.description,
    project.imageUrl,
    project.categoryId,
    project.showcaseImages.length > 0
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!project.isPublished && (
        <Banner 
          label="This project is unpublished. It will not be visible to the public."
        />
      )}  
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">
              Project Setup
            </h1>
            <span className="text-sm text-slate-700">
              Complete all fields {completionText}
            </span>
          </div>
          <Actions 
            disabled={!isComplete}
            projectId={params.projectId}
            isPublished={project.isPublished}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <div>
            <ProjectTitle 
              initialData={project}
              projectId={project.id}
            />
            <ProjectCategory 
              initialData={project}
              projectId={project.id}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id
              }))}
            />
          </div>

          {/* right hand */}
          <div>  
            <ProjectDescription 
              initialData={project}
              projectId={project.id}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div>
            <ProjectBackground 
              initialData={project}
              projectId={project.id}              
            />
          </div>

          {/* right hand */}
          <div>  
            <ProjectShowcase />
          </div>
        </div>
      </div>
    </> 
  );
}
 
export default ProjectIdPage;