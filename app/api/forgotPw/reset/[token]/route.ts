import prismadb from "@/lib/prismadb"
import { redirect } from 'next/navigation'
import { NextResponse, NextRequest } from 'next/server'
import bcrypt from "bcrypt";


export async function PATCH(
    request: NextRequest,
    {
        params,
    }: {
        params: { token: string }
    }
) {

    const { token } = params
    const body = await request.json();
    const {
        password, confirmPassword
    } = body;


    const hashedPassword = await bcrypt.hash(confirmPassword, 12);

    try {

        if (!token) {
            return new NextResponse('No token provided', { status: 400 });
        }

        const findToken = await prismadb.activateToken.findUnique({
            where: {
                token: params.token,
                createdAt: { gt: new Date(Date.now() - 24 * 60 * 60 * 1000) }
            }
        })

        if (!findToken) {
            throw new Error('Token is invalid or expired')
        }

        const user = await prismadb.user.findUnique({
            where: {
                id: findToken.userId

            }
        })
        if (!user) {
            throw new Error('User Not found')
        }

        await prismadb.user.update({
            where: {
                id: user.id,
            },
            data: {
                hashedPassword: hashedPassword,
            },
        })

        await prismadb.activateToken.update({
            where: {
                token: params.token,
            },
            data: {
                activatedAt: new Date(),
            },
        })



        return NextResponse.redirect('https://internify-deploy.vercel.app/login');


    } catch (error) {
        console.error("Error during activation,", error);
        return new NextResponse('Internal Error 404,Please Try Again Later ');
    }
}