import getCurrentUser from "@/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";

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

  return (  
    <div>
      {project.title}
    </div>
  );
}
 
export default ProjectIdPage;