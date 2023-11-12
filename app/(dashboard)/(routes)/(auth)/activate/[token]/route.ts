import prismadb from "@/lib/prismadb"
import { redirect } from 'next/navigation'
import { NextResponse, NextRequest } from 'next/server'


export async function GET(
    _request: NextRequest,
    {
        params,
    }: {
        params: { token: string }
    }
) {
    const { token } = params

    if (!token) {
        return new NextResponse('No token provided', { status: 400 });
    }

    try {

        const user = await prismadb.user.findFirst({
            where: {
                activateTokens: {
                    some: {
                        AND: [
                            {
                                activatedAt: null,
                            },
                            {
                                createdAt: {
                                    gt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
                                },
                            },
                            {
                                token
                            },
                        ],
                    },
                },
            },
        })

        if (!user) {
            throw new Error('Token is invalid or expired')
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

        redirect('/')



    } catch (error) {
        console.error("Error during activation,", error);
        return new NextResponse('Internal Error');
    }
}