import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import formData from 'form-data';
import Mailgun from 'mailgun.js';


export async function POST(
    request: Request,
) {

    const API_KEY = process.env.MAILGUN_API_KEY || ' '
    const DOMAIN = process.env.MAILGUN_DOMAIN || ' '
    const body = await request.json();
    const {
        email
    } = body;

    if (!email) {
        return new NextResponse('No email provided', { status: 400 });
    }


    const user = await prisma.user.findUnique({
        where: {
            email: body.email,
        }
    });

    if (!user) {
        return new NextResponse('User not found', { status: 404 });
    }

    const token = await prisma.activateToken.create({
        data: {
            userId: user.id,
            token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ''),
        },
    })
    const mailgun = new Mailgun(formData)
    const mg = mailgun.client({ username: 'api', key: API_KEY })

    await mg.messages.create(DOMAIN, {
        // from: `Example Email <hello@${DOMAIN}>`,
        from: `Internify <Internify@gmail.com>`,
        to: `${user.email}`,
        subject: 'Please Reset the Password of your Account',
        text: `Dear ${user.name}, Reset the password of your account by clicking this link: https://internify-deploy.vercel.app/forgotpw/reset/${token.token}`,
    })

        .then(msg => console.log(msg)) // logs response data
        .catch(err => console.log(err)); // logs any error

    return NextResponse.json(user);
}