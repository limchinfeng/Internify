import prismadb from "@/lib/prismadb"
import { redirect } from 'next/navigation'
import { NextResponse, NextRequest } from 'next/server'
import { useOrigin } from "@/hooks/use-origin";

export async function GET(
    _request: NextRequest,
    {
        params,
    }: {
        params: { token: string }
    }
) {
    const origin = useOrigin();
    const { token } = params

    if (!token) {
        return new NextResponse('No token provided', { status: 400 });
    }

    try {
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
                active: true,
            },
        })

        await prismadb.activateToken.update({
            where: {
                token,
            },
            data: {
                activatedAt: new Date(),
            },
        })



        return NextResponse.redirect(`${origin}/login`);


    } catch (error) {
        console.error("Error during activation,", error);
        return new NextResponse('Internal Error 404,Please Try Again Later ');
    }
}