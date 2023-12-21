import getCurrentUser from "@/actions/getCurrentUser";
import { redirect } from "next/navigation";
import { ProfileImage } from "./_components/profile-image";
import { ProfileName } from "./_components/profile-name";
import { ProfilePhone } from "./_components/profile-phone";
import { ProfileEmail } from "./_components/profile-email";
import { ProfileLink } from "./_components/profile-link";
import { ProfileDescription } from "./_components/profile-description";
import { ProfilePageLink } from "./_components/profile-page-link";
import prismadb from "@/lib/prismadb";
import { columns } from "./_components/columns";
import { application_columns } from "./_components/application-columns";
import { DataTable } from "./_components/data-table";
import { ApplicationDataTable } from "./_components/application-data-table";


const ProfilePage = async () => {
  const currentUser = await getCurrentUser();

  if(!currentUser) {
    return redirect("/");
  }

  const projects = await prismadb.project.findMany({
    where: {
      userId: currentUser.id
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  const applications = await prismadb.application.findMany({
    where: {
      userId: currentUser.id,
    },
    include: {
      listing: {
        include: {
          user: true,
        }
      },
      user: true,
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
    company: item.listing.user.name || "",
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
      
      <ProfilePageLink currentUser={currentUser} />
      
      <div className="mt-4 md:mt-6 w-full md:px-10 px-4">
        <p className="text-lg font-bold">
          Project
        </p>
        <DataTable 
          columns={columns}
          data={projects}
        />
      </div>

      {!currentUser.isCompany && (
        <div className="mt-4 md:mt-6 w-full md:px-10 px-4">
          <p className="text-lg font-bold">
            Listing Application
          </p>
          <ApplicationDataTable 
            columns={application_columns}
            data={newData}
          />
        </div>
      )}
    </div>
  );
}
 
export default ProfilePage;