import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

import { getDocument } from 'pdfjs-dist';
import { ReadableStream } from 'web-streams-polyfill/ponyfill';

function convertToReadableStream(stream: any): ReadableStream {
  return new ReadableStream({
    start(controller) {
      const reader = stream.getReader();
      return reader.read().then(function process(result: any) {
        if (result.done) {
          controller.close();
          return;
        }
        controller.enqueue(result.value);
        return reader.read().then(process);
      });
    },
  });
}

export async function PATCH(
  req: Request,
) {
  try {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
      return new NextResponse("Unauthorized", {status: 401});
    }

    if(!currentUser.resumeUrl) {
      return new NextResponse("Resume in not uploaded", {status: 400});
    }


    const listing = prisma.listing.findMany({
      where: {
        isPublished: true
      }
    })

    return NextResponse.json(listing);
  } catch (error) {
    console.log("[RESUME]", error);
    return new NextResponse("Internal Error", {status: 500});
  }
}