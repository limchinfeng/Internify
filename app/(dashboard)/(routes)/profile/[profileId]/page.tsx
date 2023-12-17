import { redirect } from "next/navigation";
import getCurrentUser from "@/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";
import ProfileHead from "./_components/profile-head";
import ProfileDetails from "./_components/profile-details";
import DataTable from "./_components/data-table";
import { columns } from "./_components/columns";

const UserProfileIdPage = async ({
  params,
}: {
  params: { profileId: string };
}) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return redirect("/");
  }

  const user = await prismadb.user.findUnique({
    where: {
      id: params.profileId,
    },
  });

  if (!user) {
    return redirect("/");
  }

  const project = await prismadb.project.findMany({
    where: {
      userId: params.profileId,
    },
  });

  return (
    <div className="p-6 w-full flex flex-col items-center justify-center gap-5">
      <ProfileHead imageSrc={user.imageUrl || ""} />
      <div className="max-w-screen-lg m-auto p-5">
        <div>
          <ProfileDetails
            name={user.name || ""} //change currentUser to the project's owner
            email={user.email || ""}
            description={user.description || ""}
            phone={user.phone || ""}
            link={user.link || ""}
          />
        </div>
      </div>
      <div className="w-full md:px-10 px-4">
        <DataTable columns={columns} data={project} />
      </div>
    </div>
  );
};

export default UserProfileIdPage;