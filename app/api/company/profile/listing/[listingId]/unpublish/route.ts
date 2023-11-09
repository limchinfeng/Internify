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
      },
    });

    if(!listing) {
      return new NextResponse("Listing Not Found", {status: 404});
    }

    const unPublishedListing = await prismadb.listing.update({
      where: {
        id: params.listingId,
        userId: currentUser.id,
      },
      data: {
        isPublished: false,
      }
    });

    return NextResponse.json(unPublishedListing)
  } catch (error) {
    console.log("[COMPANY_LISTING_ID_UNPUBLISH]", error);
    return new NextResponse("Internal Error", {status: 500});
  }
}