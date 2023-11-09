import getCurrentUser from "@/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(
  req: Request
) {
  try {
    const currentUser = await getCurrentUser();
    const {title} = await req.json();

    if(!currentUser || !currentUser.isCompany) {
      return new NextResponse("Unauthorized", {status: 401});
    }

    if(!title) {
      return new NextResponse("Title is missing", {status: 400});
    }

    const listing = await prismadb.listing.create({
      data:{
        title,
        userId: currentUser.id
      }
    });

    return NextResponse.json(listing);
  } catch (error) {
    console.log("[COMPANY_PROFILE_LISTING]", error);
    return new NextResponse("Internal Error", {status: 500});
  }
}