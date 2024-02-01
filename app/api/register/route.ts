import bcrypt from "bcrypt";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import formData from 'form-data';
import Mailgun from 'mailgun.js';


export async function POST(
    request: Request
) {

    const API_KEY = process.env.MAILGUN_API_KEY || ' '
    const DOMAIN = process.env.MAILGUN_DOMAIN || ' '
    const body = await request.json();
    const {
        email, name, password
    } = body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
        data: {
            email, name, hashedPassword
        }
    });

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
        subject: 'Please Activate Your Account Now!',
        text: `Hello ${user.name}, please activate your account by clicking this link: http://localhost:3000/api/register/activate/${token.token}`,
    })
        .then(msg => console.log(msg)) // logs response data
        .catch(err => console.log(err)); // logs any error

    return NextResponse.json(user);
}