import getCurrentUser from "@/actions/getCurrentUser";
import { redirect } from "next/navigation";
import { RecommendationInput } from "./_components/recommendation-input";
import prismadb from "@/lib/prismadb";

const RecommmendationPage = async () => {
  const currentUser = getCurrentUser();

  if(!currentUser) {
    redirect("/");
  }

  const categories = await prismadb.category.findMany({
    orderBy: {
      name: "asc"
    }
  });

  return (
    <div>
      <RecommendationInput 
        options={categories.map((category) => ({
          label: category.name,
          value: category.id
        }))}
      />
    </div>
  )
}

export default RecommmendationPage;