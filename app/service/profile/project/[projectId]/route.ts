import getCurrentUser from "@/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  {params} : {params: {projectId: string}}
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
      }
    });

    if(!project) {
      return new NextResponse("Project Not Found", {status: 404});
    }

    const deletedProject = await prismadb.project.delete({
      where: {
        id: params.projectId,
        userId: currentUser.id,
      }
    });

    return NextResponse.json(deletedProject);

  } catch (error) {
    console.log("[PROJECT_ID_DELETE]", error);
    return new NextResponse("Internal Error", {status: 500});
  }
}

export async function PATCH(
  req: Request,
  {params} : {params: {projectId: string}}
) {
  try {
    const currentUser = await getCurrentUser();
    const values = await req.json();

    if(!currentUser) {
      return new NextResponse("Unauthorized", {status: 401});
    }

    const project = await prismadb.project.update({
      where: {
        id: params.projectId,
        userId: currentUser.id
      },
      data: {
        ...values,
      }
    })
    
    return NextResponse.json(project);
  } catch (error) {
    console.log("[PROJECT_ID_PATCH]", error);
    return new NextResponse("Internal Error", {status: 500});
  }
}