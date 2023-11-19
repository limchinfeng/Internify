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
    const currentUser = await getCurrentUser();

    if(!currentUser) {
      return new NextResponse("Unauthorized", {status: 401});
    }

    const {projectId} = params;

    if(!projectId || typeof projectId !== 'string') {
      throw new Error('Invalid Project ID');
    }

    let favoriteProjectIds = [...(currentUser.favoriteProjectIds || [])];

    favoriteProjectIds.push(projectId);

    const user = await prismadb.user.update({
      where: {
          id: currentUser.id
      },
      data: {
          favoriteProjectIds
      }
  });

  return NextResponse.json(user);
}

export async function DELETE(
  req: Request,
  {params}: {params: IParams}
) {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
      return new NextResponse("Unauthorized", {status: 401});
    }

    const {projectId} = params;

    if(!projectId || typeof projectId !== 'string') {
      throw new Error('Invalid Project ID');
    }

    let favoriteProjectIds = [...(currentUser.favoriteProjectIds || [])];

    favoriteProjectIds = favoriteProjectIds.filter((id) => id !== projectId)

    const user = await prismadb.user.update({
      where: {
          id: currentUser.id
      },
      data: {
          favoriteProjectIds
      }
  });

  return NextResponse.json(user);
}