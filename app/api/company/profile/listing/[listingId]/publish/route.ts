import getCurrentUser from "@/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  {params}: {params: {listingId: string}}
) {
  try {
    const currentUser = await getCurrentUser();

    if(!currentUser || !currentUser.isCompany) {
      return new NextResponse("Unauthorized", {status: 401});
    }

    const listing = await prismadb.listing.findUnique({
      where: {
        id: params.listingId,
        userId: currentUser.id,
      }
    });

    if(!listing) {
      return new NextResponse("Listing Not Found", {status: 404});
    }
    

    if(!listing.title || !listing.description || !listing.imageUrl || !listing.categoryId || !listing.requirement || !listing.location || !listing.state ) {
      return new NextResponse("Missing required fields", {status: 401});
    }

    const publishedListing = await prismadb.listing.update({
      where: {
        id: params.listingId,
        userId: currentUser.id
      },
      data: {
        isPublished: true,
      }
    });

    return NextResponse.json(publishedListing)
  } catch (error) {
    console.log("[COMPANY_LISTING_ID_PUBLISH]", error);
    return new NextResponse("Internal Error", {status: 500});
  }
}