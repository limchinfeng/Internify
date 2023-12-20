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
  try {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
      return new NextResponse("Unauthorized", {status: 401});
    }

    if(currentUser.isCompany) {
      return new NextResponse("Company are not allowed to apply", {status: 401});
    }

    const {listingId} = params;

    if(!listingId || typeof listingId !== 'string') {
      throw new Error('Invalid Listing ID');
    }

    const application_verification = await prismadb.application.findUnique({
      where: {
        userId: currentUser.id,
        listingId,
      }
    });

    if(!!application_verification) {
      return new NextResponse("You have applied this listing", {status: 403});
    }

    const application = await prismadb.application.create({
      data: {
        userId: currentUser.id,
        listingId,
      }
    })

    return NextResponse.json(application);
  } catch (error) {
    console.log("[LISTING_ID_APPLICATION_POST]", error);
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

    if(currentUser.isCompany) {
      return new NextResponse("Company are not allowed to apply or delete", {status: 401});
    }

    const {listingId} = params;

    if(!listingId || typeof listingId !== 'string') {
      throw new Error('Invalid Listing ID');
    }

    const application = await prismadb.application.findUnique({
      where: {
        userId: currentUser.id,
        listingId,
      }
    });

    if(!application) {
      return new NextResponse("Application Listing Not Found", {status: 404});
    }

    const deletedApplication = await prismadb.application.delete({
      where: {
        userId: currentUser.id,
        listingId,
      }
    });

    return NextResponse.json(deletedApplication);
  } catch (error) {
    console.log("[LISTING_ID_APPLICATION_DELETE]", error);
    return new NextResponse("Internal Error", {status: 500});
  }
}