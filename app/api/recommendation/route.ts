
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
      requirement: listing.requirement,
      state: listing.state,
      category: listing.category ? listing.category.name : null,
    }));

    console.log("1");

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      messages: [
        {
          "role": "system",
          "content": `You are a job recommendation bot, designed to analyze job listings and recommend suitable jobs to users based on their specific criteria or preferences. You should recommend 1 job that best fit the user's criteria and justify your choices in your response. You must only return the json structure without any other text.

          Here is the job listing in json format and contain id of job, title of job, description of job, requirement of job, location of job, state of job and job categry: ${internListing} 

          Here is the messages from user: ${messages}

          if there is match job in job listing, return the id and title of the job. else return null
          Example of JSON to return:
          START OF JSON
          [
            {
              id: ${id},
              title: ${title},
            }
          ]
          END OF JSON

          `
        },  
        // {
        //   role: 'user',
        //   content: messages
        // }
      ]
      // messages: ["", ...messages]
    });

    console.log(response.choices[0].message)

    return NextResponse.json(response.choices[0].message.content);
  } catch (error) {
    console.log('[CODE_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

//https://stackoverflow.com/questions/77397517/making-api-calls-to-open-ai-using-next-js-and-react