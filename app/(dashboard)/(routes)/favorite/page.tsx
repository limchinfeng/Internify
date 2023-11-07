import getCurrentUser from "@/actions/getCurrentUser";
import getProjectFavoriteListings from "@/actions/getProjectFavorite";
import { redirect } from "next/navigation";
import { FavoriteProject } from "./_components/favorite-project";

const FavoritePage = async () => {
  const currentUser = await getCurrentUser();
  const projects = await getProjectFavoriteListings();

  if(!currentUser) {
    redirect("/");
  }

  return (  
    <div className="p-6 w-full flex flex-col items-center justify-center gap-10">
      {/* <div className="text-3xl font-bold text-white bg-emerald-500 p-4 rounded-full">
        Your Favorites
      </div> */}
      <FavoriteProject 
        projects={projects}
        currentUser={currentUser}
      />
      <div className="border-b border w-full px-3 border-gray-200" />
      <FavoriteProject 
        projects={projects}
        currentUser={currentUser}
      /> 
    </div>
  );
}
 
export default FavoritePage;