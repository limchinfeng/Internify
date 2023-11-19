import getCurrentUser from "@/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  {params}: {params: {projectId: string}}
) {
  try {
    const currentUser = await getCurrentUser();

    const {url} = await req.json();

    if(!currentUser) {
      return new NextResponse("Unauthorized", {status: 401});
    }

    if(!url) {
      return new NextResponse("Showcase Image is missing", {status: 400})
    }

    const projectOwner = await prismadb.project.findUnique({
      where: {
        id: params.projectId,
        userId: currentUser.id,
      }
    });

    if(!projectOwner) {
      return new NextResponse("Unauthorized", {status: 401})
    }

    
    // const showcaseImage = await prismadb.showcaseImage.create({
    //   data: {
    //     url,
    //     name: url.split("/").pop(),
    //     projectId: params.projectId,
    //   }
    // });

    const showcaseImages = await Promise.all(
      url.map(async (link: { url: string }) => {
        await prismadb.showcaseImage.create({
          data: {
            url: link.url,
            projectId: params.projectId,
          },
        });
      })
    );

    return NextResponse.json(showcaseImages);
  } catch(error) {
    console.log("[PROJECT_ID_SHOWCASEIMAGE]", error);
    return new NextResponse("Internal Error", {status: 500});
  }  
}