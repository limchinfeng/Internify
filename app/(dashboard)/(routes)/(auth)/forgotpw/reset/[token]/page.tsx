import prismadb from "@/lib/prismadb"
import { redirect } from 'next/navigation'
import { NextResponse, NextRequest } from 'next/server'
import ResetForm from "./_components/reset-form";

const ResetPage = async ({
    params
}: {
    params: { token: string }
}) => {

    const { token } = params

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



    return (
        <>
            <div className="w-full flex flex-col gap-5 items-center justify-center h-full">
                <div className=" mb-12 mx-auto">
                    <ResetForm
                        token={params.token}
                    />
                </div>
            </div>

        </>
    )

}
export default ResetPage;