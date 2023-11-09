import prismadb from "@/lib/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getListingFavoriteList() {
    try {
        const currentUser = await getCurrentUser();

        if(!currentUser) {
            return [];
        }

        const favorites = await prismadb.listing.findMany({
            where: {
                id: {
                    in: [...(currentUser.favoriteListingIds || [])]
                }
            },
            include: {
                category: true,
                user: true,
            }
        });

        return favorites;
    } catch(error: any) {
        throw new Error(error);
    }
}