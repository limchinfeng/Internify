
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
        location: true,
        state: true,
        category: {
          select: {
            name: true
          }
        }
      }
    });

    const internListing = listings.map(listing => ({
      title: listing.title,
      description: listing.description,
      requirement: listing.requirement,
      location: listing.location,
      state: listing.state,
      name: listing.category ? listing.category.name : null,
    }));

    console.log("1");

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "system",
          "content": `You are a job recommendation bot, designed to analyze job listings and recommend suitable jobs to users based on their specific criteria or preferences. Your task involves parsing job details from provided listings in JSON format and matching them with the requirements or preferences expressed in the user's message. You should recommend two jobs that best fit the user's criteria and justify your choices in your response. If no suitable jobs are found, provide a reasoned explanation in JSON format. For instance, if a user states they have experience in data analytics and are looking for a job in Kedah, you should analyze the job listings to find matches that align with these criteria, focusing on roles related to data analytics located in Kedah. You must only return the json structure without any other text.
          
          Here is the job listing in json format for you to parse: ${internListing}

          If there is 2 suitable recommendations, return this JSON structure without any other text:
          [
            {
              "id": "job_id_1",
              "title": "job_title_1",
              "description": "job_description_1",
              "reason": "Explanation for recommendation based on user's criteria"
            },
            {
              "id": "job_id_2",
              "title": "job_title_2",
              "description": "job_description_2",
              "reason": "Explanation for recommendation based on user's criteria"
            }
          ]

          If there is only 1 suitable recommendation, return this JSON structure without any other text:
          [
            {
              "id": "job_id_1",
              "title": "job_title_1",
              "description": "job_description_1",
              "reason": "Explanation for recommendation based on user's criteria"
            },
            {
              "id": null,
              "title": "",
              "description": "",
              "reason": "Explanation for the absence of suitable job recommendations based on user's criteria"
            }
          ]
          
          IF no suitable job found, return this JSON structure without any other text:
          [
            {
              "id": null,
              "title": "",
              "description": "",
              "reason": "Explanation for the absence of suitable job recommendations based on user's criteria"
            }
          ]
          `
        },  
        {
          role: 'user',
          content: messages
        }
      ]
      // messages: ["", ...messages]
    });

    console.log(response.choices[0].message)

    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.log('[CODE_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

//https://stackoverflow.com/questions/77397517/making-api-calls-to-open-ai-using-next-js-and-react