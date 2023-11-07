import getCurrentUser from "@/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  {params}: {params: { projectId: string, showcaseImageId: string }}
) {
  try {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
      return new NextResponse("Unauthorized", {status: 401});
    }

    const courseOwner = await prismadb.project.findUnique({
      where: {
        id: params.projectId,
        userId: currentUser.id,
      }
    });

    if(!courseOwner) {
      return new NextResponse("Unauthorized", {status: 401})
    }

    const showcaseImage = await prismadb.showcaseImage.delete({
      where: {
        projectId: params.projectId,
        id: params.showcaseImageId,
      }
    });

    return NextResponse.json(showcaseImage);
  } catch (error) {
    console.log("[SHOWCASEIMAGE_ID_DELETE]", error);
    return new NextResponse("Internal Error", {status: 500})
  }
}