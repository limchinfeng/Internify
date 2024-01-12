
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
        isPublished: true
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
      title: listing.title,
      description: listing.description,
      state: listing.state,
      category: listing.category ? listing.category.name : null,
    }));

    console.log(internListing);

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "system",
          "content": `You are a job recommendation bot, designed to analyze job listings provided in json format and recommend suitable jobs to users based on their specific criteria or preferences. You should recommend 1 job that best fit the user's criteria and justify your choices in your response.

          Read the following JSON carefully as you will need to recommend a job from this JSON: ${internListing}

          return the most suitable job's title: 
          EXAMPLE: ${title}
          `
        },  
        {
          role: 'user',
          content: messages
        }
      ]
      // messages: ["", ...messages]
    });

    console.log(response.choices[0].message.content)

    return NextResponse.json(response.choices[0].message.content);
  } catch (error) {
    console.log('[CODE_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

//https://stackoverflow.com/questions/77397517/making-api-calls-to-open-ai-using-next-js-and-react