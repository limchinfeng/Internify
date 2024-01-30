
import prismadb from "@/lib/prismadb";
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
  id: string;
  title: string;
  description: string;
  requirement: string;
  state: string;
  category: string;
};

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
      return NextResponse.json({
        id: '',
        title: '',
        description: '',
        requirement: '',
        state: '',
        reason: `No job listing in ${category?.name} category`
      });
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

    console.log(internListing);
    const jobListingsText = convertListingsToText(internListing);
    console.log(jobListingsText);

    const response = await openai.chat.completions.create({
      model: "gpt-4-0613",
      messages: [
        {
          "role": "system",
          "content": `Find the requirement "${messages}" that match the most with the job below: ${jobListingsText}
          
          Given the specific job requirements outlined in the user's input, evaluate each job listing provided and determine its suitability.The evaluation should be based on how closely each job matches the user's requirements. For instance, if a job doesn't involve skills or fields mentioned in the requirements (such as machine learning is the job requirements outlined in the user's input), it should be 100% return false for Suitability.Provide a concise and clear rationale for each decision.

          return only 1 job and the result in this JSON format without any other text:
          {
            id: 'ID',
            title: 'Job Title',
            description: 'Description',
            requirement: 'Requirements',
            state: 'Location',
            suitable: 'True or False',
            reason: 'Write down the Brief Explanation as the reason'
          }
          
          Ensure the reasons are specific to the job's relevance to the stated requirements and succinctly justify the suitability decision.
          `
        },
      ]
    });

    console.log(response.choices[0].message.content)

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

const parseContentToJSON = (content: string): any => {
  try {
    // Parse the content as JSON
    const jsonContent = JSON.parse(content);

    // If the parsing is successful, and it has the expected structure, return it
    if (jsonContent && typeof jsonContent === 'object') {
      return jsonContent;
    }
  } catch (error) {
    console.error('Failed to parse content to JSON:', error);
  }

  // Handle cases where the content doesn't match the expected structure or parsing fails
  return null;
};