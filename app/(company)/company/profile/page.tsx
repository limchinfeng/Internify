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
import { CompanyProfilePageLink } from "./_components/company-profile-page-link";
import { CompanyApplicationDataTable } from "./_components/company-application-data-table";
import { company_application_columns } from "./_components/company-application-columns";

const CompanyProfilePage = async () => {

  // return redirect("/profile");

  const currentUser = await getCurrentUser();

  if (!currentUser || !currentUser.isCompany) {
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

  const listingIds = listings.map((listing) => listing.id);

  const applications = await prismadb.application.findMany({
    where: {
      listingId: {
        in: listingIds,
      },
    },
    include: {
      user: true,
      listing: true,
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  const newData = applications.map(item => ({
    id: item.listing.id,
    createdAt: new Date(item.createdAt),
    listingId: item.listingId,
    title: item.listing.title,
    candidate: item.user.name || "",
    userId: item.user.id,
    email: item.user.email || "",
  }));

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

      <CompanyProfilePageLink currentUser={currentUser} />

      <div className="mt-4 md:mt-6 w-full md:px-10 px-4">
        <p className="text-lg font-bold">
          Listing
        </p>
        <CompanyDataTable
          columns={CompanyColumns}
          data={listings}
        />
      </div>

      <div className="mt-4 md:mt-6 w-full md:px-10 px-4">
        <p className="text-lg font-bold">
          Candidate Listing Application
        </p>
        <CompanyApplicationDataTable
          columns={company_application_columns}
          data={newData}
        />
      </div>
    </div>
  );
}

export default CompanyProfilePage;