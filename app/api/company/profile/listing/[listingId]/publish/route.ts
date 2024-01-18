import getCurrentUser from "@/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";
import { Category, Listing } from "@prisma/client";
import { NextResponse } from "next/server";

import Configuration from "openai";
import OpenAI from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type JobListing = {
  title: string;
  description: string;
  requirement: string;
  state: string;
  category: string;
};

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
    

    if(!listing.title || !listing.description || !listing.imageUrl || !listing.categoryId || !listing.requirement || !listing.location || !listing.state ) {
      return new NextResponse("Missing required fields", {status: 401});
    }

    if (!configuration.apiKey) {
      return new NextResponse("OpenAI API Key not configured.", { status: 500 });
    }

    const category = await prismadb.category.findUnique({
      where: {
        id: listing.categoryId
      }
    })

    if(!category) {
      return new NextResponse("Category Not Found", {status: 404});
    }

    const internListing = convertInternListing(listing, category);
    const jobListingsText = convertListingsToText(internListing);

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "system",
          "content": `Based on the Job Title, Location, Category, Description and Requirement, Analyze the details and summarize what this job is about and suitable to which person in less than 100 words.

          Job details: ${jobListingsText}
          
          Example text to return: "This job involves recruiting, onboarding, and organizing talent development programs. You might like this job because it allows you to engage in employer branding and coordinate with different departments to identify staffing needs. Hence, this job is suitable for those who have good communication and people skills."
          `
        },  
      ]
    });

    console.log(response.choices[0].message.content)

    const publishedListing = await prismadb.listing.update({
      where: {
        id: params.listingId,
        userId: currentUser.id,
      },
      data: {
        isPublished: true,
        summary: response.choices[0].message.content,
      }
    });

    return NextResponse.json(publishedListing)
  } catch (error) {
    console.log("[COMPANY_LISTING_ID_PUBLISH]", error);
    return new NextResponse("Internal Error", {status: 500});
  }
}

const convertInternListing = (listing: Listing, category: Category) => {
  if (!listing) {
    return {
        title: '',
        description: '',
        requirement: '',
        state: '',
        category: '',
    };
  }

  return {
      title: listing.title || "",
      description: listing.description || "",
      requirement: listing.requirement || "",
      state: listing.state || "",
      category: category.name,
  };
};

const convertListingsToText = (listing: JobListing): string => {
  // Check if description is present and not null
const description = listing.description ? listing.description.replace(/<[^>]+>/g, ' ') : '';

// Check if requirement is present and not null
const requirement = listing.requirement ? listing.requirement.replace(/<[^>]+>/g, ' ') : '';

return [
  `Job Title: ${listing.title}`,
  `   Location: ${listing.state}`,
  `   Category: ${listing.category}`,
  `   Description:`,
  `     - ${description}`,
  `   Requirements:`,
  `     - ${requirement}`,
].join('\n');
};