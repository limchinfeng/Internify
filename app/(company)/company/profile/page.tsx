import getCurrentUser from "@/actions/getCurrentUser";
import { ProfileDescription } from "@/app/(dashboard)/(routes)/profile/_components/profile-description";
import { ProfileEmail } from "@/app/(dashboard)/(routes)/profile/_components/profile-email";
import { ProfileImage } from "@/app/(dashboard)/(routes)/profile/_components/profile-image";
import { ProfileLink } from "@/app/(dashboard)/(routes)/profile/_components/profile-link";
import { ProfileName } from "@/app/(dashboard)/(routes)/profile/_components/profile-name";
import { ProfilePhone } from "@/app/(dashboard)/(routes)/profile/_components/profile-phone";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import { CompanyDataTable } from "./_components/company-data-table";
import { CompanyColumns } from "./_components/company-columns";

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
    <div className="p-6 w-full flex flex-col items-center justify-center gap-10">
      <ProfileImage currentUser={currentUser} />
      <div className="w-4/5 grid grid-cols-1 md:grid-cols-2 md:gap-10">
        <div>
          <div className="flex flex-col items-center gap-x-4 gap-4">
            <ProfileName currentUser={currentUser} />
            <ProfilePhone currentUser={currentUser} />
            <ProfileEmail currentUser={currentUser} />
          </div>
        </div>

        <div className="mt-4 md:mt-0">
          <div className="flex flex-col items-center gap-x-4 gap-4">
            <ProfileLink currentUser={currentUser} />
            <ProfileDescription currentUser={currentUser} />
          </div>
        </div>
      </div>
      <div className="mt-4 md:mt-6 w-full md:px-10 px-4">
        <CompanyDataTable 
          columns={CompanyColumns}
          data={listings}
        />
      </div>
    </div>
  );
}
 
export default CompanyProfilePage;