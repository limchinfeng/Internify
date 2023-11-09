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
import { DataTable } from "./_components/data-table";


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
        <DataTable 
          columns={columns}
          data={projects}
        />
      </div>
    </div>
  );
}
 
export default ProfilePage;