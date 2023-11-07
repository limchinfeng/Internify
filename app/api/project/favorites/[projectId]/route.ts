import getCurrentUser from "@/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  projectId?: string; 
}

export async function POST(
  req: Request,
  {params}: {params: IParams}
) {
  try {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
      return new NextResponse("Unauthorized", {status: 401});
    }

    const {projectId} = params;

    if(!projectId || typeof projectId !== 'string') {
      throw new Error('Invalid Project ID');
    }

    let favoriteIds = [...(currentUser.favoriteProjectIds || [])];

    favoriteIds.push(projectId);

    const user = await prismadb.user.update({
      where: {
          id: currentUser.id
      },
      data: {
          favoriteProjectIds: favoriteIds
      }
  });

  return NextResponse.json(user);

  } catch (error) {
    console.log("[PROJECT_FAVORITE_ID]", error);
    return new NextResponse("Internal Error", {status: 500});
  }
}

export async function DELETE(
  req: Request,
  {params}: {params: IParams}
) {
  try {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
      return new NextResponse("Unauthorized", {status: 401});
    }

    const {projectId} = params;

    if(!projectId || typeof projectId !== 'string') {
      throw new Error('Invalid Project ID');
    }

    let favoriteIds = [...(currentUser.favoriteProjectIds || [])];

    favoriteIds = favoriteIds.filter((id) => id !== projectId)

    const user = await prismadb.user.update({
      where: {
          id: currentUser.id
      },
      data: {
          favoriteProjectIds: favoriteIds
      }
  });

  return NextResponse.json(user);

  } catch (error) {
    console.log("[PROJECT_FAVORITE_ID]", error);
    return new NextResponse("Internal Error", {status: 500});
  }
}