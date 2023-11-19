import getCurrentUser from "@/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  listingId?: string; 
}

export async function POST(
  req: Request,
  {params}: {params: IParams}
) {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
      return new NextResponse("Unauthorized", {status: 401});
    }

    const {listingId} = params;

    if(!listingId || typeof listingId !== 'string') {
      throw new Error('Invalid Listing ID');
    }

    let favoriteListingIds = [...(currentUser.favoriteListingIds || [])];

    favoriteListingIds.push(listingId);

    const user = await prismadb.user.update({
      where: {
        id: currentUser.id
      },
      data: {
        favoriteListingIds
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

    const {listingId} = params;

    if(!listingId || typeof listingId !== 'string') {
      throw new Error('Invalid Listing ID');
    }

    let favoriteListingIds = [...(currentUser.favoriteListingIds || [])];

    favoriteListingIds = favoriteListingIds.filter((id) => id !== listingId)

    const user = await prismadb.user.update({
      where: {
          id: currentUser.id
      },
      data: {
        favoriteListingIds
      }
  });

  return NextResponse.json(user);
}