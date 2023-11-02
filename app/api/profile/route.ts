import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function PATCH(
  req: Request,
) {
  try {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
      return NextResponse.error();
    }

    const values = await req.json();

    const user = await prisma.user.update({
      where: {
        id: currentUser.id
      },
      data: {
        ...values,
      }
    })
    
    return NextResponse.json(user);
  } catch (error) {
    console.log("[USER_UPDATE]", error);
    return new NextResponse("Internal Error", {status: 500});
  }
}