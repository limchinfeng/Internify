import getCurrentUser from "@/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(
  req: Request
) {
  try {
    const currentUser = await getCurrentUser();
    const {title} = await req.json();

    if(!currentUser) {
      return new NextResponse("Unauthorized", {status: 401});
    }

    if(!title) {
      return new NextResponse("Title is missing", {status: 400});
    }

    const project = await prismadb.project.create({
      data:{
        title,
        userId: currentUser.id
      }
    });

    return NextResponse.json(project);
  } catch (error) {
    console.log("[PROFILE_PROJECT]", error);
    return new NextResponse("Internal Error", {status: 500});
  }
}