import getCurrentUser from "@/actions/getCurrentUser";
import { getListings } from "@/actions/getListings";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import { Categories } from "@/components/categories";
import { ListingSearchInput } from "./_components/listing-search-input";

interface ListingPageProps {
  searchParams: {  
    title: string;
    state: string;
    categoryId: string,
  } // from nextjs
}

const ListingPage = async ({
  searchParams
}: ListingPageProps) => {
  const currentUser = await getCurrentUser();

  if(!currentUser) {
    return redirect("/");
  }
  
  const categories = await prismadb.category.findMany({
    orderBy: {
      name: "asc"
    }
  });

  const listings = await getListings({
    ...searchParams,
  });
  
  return (
    <>
      <div className="px-6 pt-6 block">
        <ListingSearchInput /> 
      </div>
      <div className="p-6 space-y-4">
        <Categories 
          items={categories}
        />
        {/* <ProjectList 
          items={projects}
          currentUser={currentUser}
        /> */}
      </div>
    </>
  )
}
 
export default ListingPage;