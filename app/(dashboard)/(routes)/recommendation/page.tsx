import getCurrentUser from "@/actions/getCurrentUser";
import { redirect } from "next/navigation";
import { RecommendationInput } from "./_components/recommendation-input";
import prismadb from "@/lib/prismadb";

const RecommmendationPage = async () => {
  const currentUser = getCurrentUser();

  if(!currentUser) {
    redirect("/");
  }

  return (
    <div>
      <RecommendationInput />
    </div>
  )
}

export default RecommmendationPage;