
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

    const id = listings[0].id;
    const title = listings[0].title;
    const description = listings[0].description;

    const internListing = listings.map(listing => ({
      id: listing.id,
      title: listing.title,
      description: listing.description,
      requirement: listing.requirement,
      location: listing.location,
      state: listing.state,
      category: listing.category ? listing.category.name : null,
    }));

    console.log("1");

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      messages: [
        {
          "role": "system",
          "content": `You are a job recommendation bot, designed to analyze job listings and recommend suitable jobs to users based on their specific criteria or preferences. Your task involves parsing job details from provided listings in JSON format and matching them with the requirements or preferences expressed in the user's message. You should recommend job that best fit the user's criteria and justify your choices in your response. You must only return the json structure without any other text.
          
          Here is the job listing in json format and contain id of job, title of job, description of job, requirement of job, location of job, state of job and job categry for you to parse: ${internListing} 

          You should return the id,title and description of job that is availbel in ${internListing}, and the reason why you recommend this job. Example in JSON structure to return
          [
            {
              "id": ${id},
              "title": ${title},
              "description": ${description},
              "reason": "WRITE DOWN THE REASON"
            }
          ]

         If there is suitable job that match the user's message, return this JSON structure without any other text:
          [
            {
              "id": "job_id_1",
              "title": "job_title_1",
              "description": "job_description_1",
              "reason": "Explanation for recommendation based on user's criteria"
            },
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

    return NextResponse.json(response.choices[0].message.content);
  } catch (error) {
    console.log('[CODE_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};