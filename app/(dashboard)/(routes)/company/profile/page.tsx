import getCurrentUser from "@/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";

const CompanyProfilePage = async () => {
  const currentUser = await getCurrentUser();

  if(!currentUser || !currentUser.isCompany) {
    return redirect("/");
  }

  const listings = await prismadb.listing.findMany({
    where: {
      userId: currentUser.id
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  return (  
    <div>

    </div>
  );
}
 
export default CompanyProfilePage;