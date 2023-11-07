import getCurrentUser from "@/actions/getCurrentUser";
import { getProjects } from "@/actions/getProjects";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import { Categories } from "./_components/categories";

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
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        search input
      </div>
      <div className="p-6 space-y-4">
        <Categories 
          items={categories}
        />
        project list
      </div>
    </>
  )
}
 
export default ProjectPage;