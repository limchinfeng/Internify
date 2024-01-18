import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import Configuration from "openai";
import OpenAI from "openai";
import multer from 'multer';
import pdfParse from 'pdf-parse';

// Set up multer for file handling
const upload = multer({ storage: multer.memoryStorage() });

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(
  req: Request
) {
  try {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
      return new NextResponse("Unauthorized", {status: 401});
    }

    if (!configuration.apiKey) {
      return new NextResponse("OpenAI API Key not configured.", { status: 500 });
    }

    console.log("1");
    

    // const response = await openai.chat.completions.create({
    //   model: "gpt-3.5-turbo",
    //   messages: [
    //     {
    //       role: 'system',
    //       content: '',
    //     },
    //     {
    //       role: 'user',
    //       content: messages
    //     }
    //   ]
    //   // messages: ["", ...messages]
    // });

    // return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.log('[CODE_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

//https://stackoverflow.com/questions/77397517/making-api-calls-to-open-ai-using-next-js-and-react