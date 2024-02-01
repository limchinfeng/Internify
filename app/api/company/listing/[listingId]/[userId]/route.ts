import getCurrentUser from "@/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  listingId?: string; 
  userId?: string;
}

export async function DELETE(
  req: Request,
  {params}: {params: IParams}
) {
  try {
    const currentUser = await getCurrentUser();

    if(!currentUser || !currentUser.isCompany) {
      return new NextResponse("Unauthorized", {status: 401});
    }

    const {listingId, userId} = params;

    if(!listingId || typeof listingId !== 'string') {
      throw new Error('Invalid Listing ID');
    }

    if(!userId || typeof userId !== 'string') {
      throw new Error('Invalid User ID');
    }

    const application = await prismadb.application.findUnique({
      where: {
        listingId,
        userId,
      },
      include: {
        listing: true
      }
    });

    if(!application) {
      return new NextResponse("Application Listing Not Found", {status: 404});
    }

    if(application.listing.userId !== currentUser.id) {
      return new NextResponse("Unauthorized Listing Owner", {status: 401});
    }

    const deletedApplication = await prismadb.application.delete({
      where: {
        userId,
        listingId,
      }
    });

    return NextResponse.json(deletedApplication);
  } catch (error) {
    console.log("[LISTING_ID_APPLICATION_DELETE]", error);
    return new NextResponse("Internal Error", {status: 500});
  }
}