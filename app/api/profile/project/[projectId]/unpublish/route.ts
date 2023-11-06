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
    });

    if(!project) {
      return new NextResponse("Project Not Found", {status: 404});
    }

    const unPublishedProject = await prismadb.project.update({
      where: {
        id: params.projectId,
        userId: currentUser.id,
      },
      data: {
        isPublished: false,
      }
    });

    return NextResponse.json(unPublishedProject)
  } catch (error) {
    console.log("[PROJECT_ID_UNPUBLISH]", error);
    return new NextResponse("Internal Error", {status: 500});
  }
}