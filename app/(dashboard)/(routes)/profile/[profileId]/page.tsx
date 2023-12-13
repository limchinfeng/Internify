/*
  TASK - Yohan
  create a page for the public user to view the profile page (like others view your social media profile)

  1. get current user
  2. check if current user is valid (can refer to others page)
  3. shows the user details (can design what you like )
  4. get the user projects and shows it in table (can refer to user profile data table)
*/

import { redirect } from "next/navigation";
import getCurrentUser from "@/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";
import ProfileHead from "./_components/profile-head";
import ProfileDetails from "./_components/profile-details";
import ProfileProject from "./_components/profile-project";
import { columns } from "./_components/columns";

const UserProfileIdPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return redirect("/");
  }

  const project = await prismadb.project.findMany({
    where: {
      userId: currentUser.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-6 w-full flex flex-col items-center justify-center gap-5">
      <ProfileHead imageSrc={currentUser.imageUrl || ""} />
      <div className="max-w-screen-lg m-auto p-5">
        <div>
          <ProfileDetails
            name={currentUser.name || ""}
            email={currentUser.email || ""}
            description={currentUser.description || ""}
            phone={currentUser.phone || ""}
            link={currentUser.link || ""}
          />
        </div>
      </div>
      <div className="w-full md:px-10 px-4">
        <ProfileProject columns={columns} data={project} />
      </div>
    </div>
  );
};

export default UserProfileIdPage;