import prismadb from "@/lib/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getProjectFavoriteList() {
    await new Promise(resolve => setTimeout(resolve, 500))

    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return [];
        }

        const favorites = await prismadb.project.findMany({
            where: {
                id: {
                    in: [...(currentUser.favoriteProjectIds || [])]
                }
            },
            include: {
                category: true,
                user: true,
            }
        });

        return favorites;
    } catch (error: any) {
        throw new Error(error);
    }
}