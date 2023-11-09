import prismadb from "@/lib/prismadb";

interface getListingProps {
  title?: string;
  state?: string;
  categoryId?: string;
}

export const getListings = async ({
  title, categoryId, state
}: getListingProps) => {
  try {
    const listings = await prismadb.listing.findMany({
      where: {
        isPublished: true,
        state,
        title: {
          contains: title
        },
        categoryId
      },
      include: {
        category: true,
        user: true,
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return listings;
  } catch (error){
    console.log("[GET_LISTINGS]", error);
    return [];    
  }
}