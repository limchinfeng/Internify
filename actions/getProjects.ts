import prismadb from "@/lib/prismadb";

interface getProjectsProps {
  title?: string;
  categoryId?: string;
}

export const getProjects = async ({
  title, categoryId
}: getProjectsProps) => {
  try {
    const projects = await prismadb.project.findMany({
      where: {
        isPublished: true,
        title: {
          contains: title
        },
        categoryId
      },
      include: {
        category: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return projects;
  } catch (error){
    console.log("[GET_PROJECTS]", error);
    return [];    
  }
}