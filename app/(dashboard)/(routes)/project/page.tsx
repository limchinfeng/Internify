import getCurrentUser from "@/actions/getCurrentUser";
import { getProjects } from "@/actions/getProjects";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import { Categories } from "../../../../components/categories";
import { SearchInput } from "./_components/search-input";
import { ProjectList } from "./_components/project-list";

interface ProjectPageProps {
  searchParams: {  
    title: string;
    categoryId: string,
  } // from nextjs
}

const ProjectPage = async ({
  searchParams
}: ProjectPageProps) => {
  const currentUser = await getCurrentUser();

  if(!currentUser) {
    return redirect("/");
  }

  const categories = await prismadb.category.findMany({
    orderBy: {
      name: "asc"
    }
  });

  const projects = await getProjects({
    ...searchParams,
  });

  return (
    <>
      <div className="px-6 pt-6 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <Categories 
          items={categories}
        />
        <ProjectList 
          items={projects}
          currentUser={currentUser}
        />
      </div>
    </>
  )
}
 
export default ProjectPage;