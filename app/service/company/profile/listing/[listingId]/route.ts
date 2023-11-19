import getCurrentUser from "@/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  {params} : {params: {listingId: string}}
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

    const deletedListing = await prismadb.listing.delete({
      where: {
        id: params.listingId,
        userId: currentUser.id,
      }
    });

    return NextResponse.json(deletedListing);

  } catch (error) {
    console.log("[COMPANY_LISTING_ID_DELETE]", error);
    return new NextResponse("Internal Error", {status: 500});
  }
}

export async function PATCH(
  req: Request,
  {params} : {params: {listingId: string}}
) {
  try {
    const currentUser = await getCurrentUser();
    const values = await req.json();

    if(!currentUser || !currentUser.isCompany) {
      return new NextResponse("Unauthorized", {status: 401});
    }

    const listing = await prismadb.listing.update({
      where: {
        id: params.listingId,
        userId: currentUser.id
      },
      data: {
        ...values,
      }
    })
    
    return NextResponse.json(listing);
  } catch (error) {
    console.log("[COMPANY_LISTING_ID_PATCH]", error);
    return new NextResponse("Internal Error", {status: 500});
  }
}