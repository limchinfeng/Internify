
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import Configuration from "openai";
import OpenAI from "openai";
import ChatCompletionRequestMessage from "openai";

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
    const { messages  } = body;

    if (!configuration.apiKey) {
      return new NextResponse("OpenAI API Key not configured.", { status: 500 });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    const listings = await prismadb.listing.findMany({
      where: {
        isPublished: true,
        category: {
          name: "Software Engineering"
        }
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

    const id = listings[0].id;
    const title = listings[0].title;
    const description = listings[0].description;
    const requirement = listings[0].requirement;
    const state = listings[0].state;
    const category = listings[0].category?.name;

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
          const description = listing.description.replace(/<[^>]+>/g, '');
          const requirement = listing.requirement.replace(/<[^>]+>/g, '');
  
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
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "system",
          "content": `Find the requirement "${messages}" that match with the job below: ${jobListingsText}
          
          return the result in this JSON format without any other text:
          [
            {
              id: 'ID',
              title: 'Job Title',
              description: 'Description',
              requirement: 'Requirement',
              state: 'Location',
              reason: 'Write down the reason'
            }
          ]
          
          `
        },  
        // {
        //   role: 'user',
        //   content: messages
        // }
      ]
      // messages: ["", ...messages]
    });

    console.log(response.choices[0].message.content)

    // return NextResponse.json(internListing);
    return NextResponse.json(response.choices[0].message.content);
  } catch (error) {
    console.log('[CODE_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

//https://stackoverflow.com/questions/77397517/making-api-calls-to-open-ai-using-next-js-and-react