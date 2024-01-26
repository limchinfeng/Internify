
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import Configuration from "openai";
import OpenAI from "openai";
import { string } from "zod";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type JobListing = {
  id: string;
  title: string;
  description: string;
  requirement: string;
  state: string;
  category: string;
};

interface Job {
  id: string;
  title: string;
  suitable: string;  // Assuming suitable is a string ('True' or 'False')
  reason: string;
}

export async function POST(
  req: Request
) {
  try {
    const body = await req.json();
    const { messages, categoryId } = body;

    if (!configuration.apiKey) {
      return new NextResponse("OpenAI API Key not configured.", { status: 500 });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Category ID is required", { status: 400 });
    }

    const listings = await prismadb.listing.findMany({
      where: {
        isPublished: true,
        categoryId
      },
      select: {
        id: true,
        title: true,
        description: true,
        requirement: true,
        state: true,
        category: {
          select: {
            name: true
          }
        }
      }
    });

    const category = await prismadb.category.findUnique({
      where: {
        id: categoryId
      }
    })

    if (listings.length === 0) {
      return NextResponse.json([]);
    }

    const internListing = listings.map(listing => ({
      id: listing.id,
      title: listing.title || "",
      description: listing.description || "",
      requirement: listing.requirement || "",
      state: listing.state || "",
      category: listing.category ? listing.category.name : "",
    }));


    const convertListingsToText = (listings: JobListing[]): string => {
      return listings.map((listing, index) => {
        // Convert HTML to plain text if needed
        const description = listing.description.replace(/<[^>]+>/g, ' ');
        const requirement = listing.requirement.replace(/<[^>]+>/g, ' ');

        return [
          `${index + 1}. Job Title: ${listing.title}`,
          `   ID: ${listing.id}`,
          `   Location: ${listing.state}`,
          `   Category: ${listing.category}`,
          `   Description:`,
          `     - ${description}`,
          `   Requirements:`,
          `     - ${requirement}`,
        ].join('\n');
      }).join('\n\n');
    };

    // console.log(internListing);
    const jobListingsText = convertListingsToText(internListing);
    console.log(jobListingsText);

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "system",
          "content": `Based on the requirement "${messages}" ,justify whether the job suit the requirement and give reason for each job below: ${jobListingsText}
          
          Given the specific job requirements outlined in the user's input,For each job,return the result in this JSON objects by converting to string with the job's ID, title, suitability (True/False), and a brief explanation(no more than 50 words) for the suitability decision evaluate each job listing provided and determine its suitability. The evaluation should be based on how closely each job matches the user's requirements. For instance, if a job doesn't involve skills or fields mentioned in the requirements (like machine learning), it should be marked as unsuitable.Provide a concise and clear rationale for each decision.

          Example of 2 jobs:
          {
            id: 'ID',
            title: 'Job Title',
            suitable: 'True or False',
            reason: 'Write down the reason'
          },
          {
            id: 'ID',
            title: 'Job Title',
            suitable: 'True or False',
            reason: 'Write down the reason'
          }
          Ensure the reasons are specific to the job's relevance to the stated requirements and succinctly justify the suitability decision.

          `
        },
      ]
    });

    // console.log(response.choices[0].message.content)

    // Extract the content from the response
    const jsonString = response.choices[0].message.content;

    // Parse the content to JSON using the function
    const parsedJSON = parseContentToJSON(jsonString || "");
    console.log("--" + parsedJSON)
    return NextResponse.json(parsedJSON);
    // return NextResponse.json(response.choices[0].message.content);
  } catch (error) {
    console.log('[CODE_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

function parseContentToJSON(jsonString: string) {
  // First, trim the string to remove any leading or trailing whitespace
  let trimmedString = jsonString.trim();

  // Replace line breaks and ensure it starts with '[' and ends with ']'
  if (!trimmedString.startsWith('[') || !trimmedString.endsWith(']')) {
    trimmedString = trimmedString.replace(/\}\s*,\s*\{/g, '},{');
    trimmedString = '[' + trimmedString + ']';
  }

  try {
    // Parse the string as JSON
    return JSON.parse(trimmedString);
  } catch (error) {
    console.error('Error parsing JSON:', error);
    throw error; // Re-throw the error for further handling if necessary
  }
}
