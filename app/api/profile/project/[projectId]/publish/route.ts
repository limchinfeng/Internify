import getCurrentUser from "@/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  {params}: {params: {projectId: string}}
) {
  try {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
      return new NextResponse("Unauthorized", {status: 401});
    }

    const project = await prismadb.project.findUnique({
      where: {
        id: params.projectId,
        userId: currentUser.id,
      },
      include: {
        showcaseImages: true
      }
    });

    if(!project) {
      return new NextResponse("Project Not Found", {status: 404});
    }
    
    const hasShowcaseImage = project.showcaseImages.length !== 0;

    if(!project.title || !project.description || !project.imageUrl || !project.categoryId || !hasShowcaseImage ) {
      return new NextResponse("Missing required fields", {status: 401});
    }

    const publishedProject = await prismadb.project.update({
      where: {
        id: params.projectId,
        userId: currentUser.id
      },
      data: {
        isPublished: true,
      }
    });

    return NextResponse.json(publishedProject)
  } catch (error) {
    console.log("[PROJECT_ID_PUBLISH]", error);
    return new NextResponse("Internal Error", {status: 500});
  }
}