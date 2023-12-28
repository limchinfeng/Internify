import { redirect } from "next/navigation";
import getCurrentUser from "@/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";
import ProfileHead from "./_components/profile-head";
import ProfileDetails from "./_components/profile-details";
import DataTable from "./_components/data-table";
import { columns } from "./_components/columns";
import { ListingDataTable } from "./_components/listing-data-table";
import { ProfilePageLink } from ".././_components/profile-page-link";


const UserProfileIdPage = async ({
  params,
}: {
  params: { profileId: string };
}) => {

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return redirect("/");
  }

  if (!params || !params.profileId) {
    return redirect("/"); // Redirect to a different page or display an error message
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
      isPublished: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  const listings = await prismadb.listing.findMany({
    where: {
      userId: params.profileId,
      isPublished: true,
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  return (
    <div className="p-6 w-full flex flex-col items-center justify-center gap-10">

      {/* <ProfileHead imageSrc={user.imageUrl || ""} />

      <ProfileDetails
        name={user.name || ""}
        email={user.email || ""}
        description={user.description || ""}
        phone={user.phone || ""}
        link={user.link || ""}
      /> */}

      <ProfilePageLink currentUser={user} />

      <div className="w-full md:px-10 px-4">
        <p className="text-lg font-bold">
          Projects
        </p>
        <DataTable
          columns={columns}
          data={project}
        />
      </div>

      {user.isCompany && (
        <div className="w-full md:px-10 px-4 border-t border-black pt-8">
          <p className="text-lg font-bold">
            Listings
          </p>
          <ListingDataTable
            columns={columns}
            data={listings}
          />
        </div>
      )}
    </div>
  );
};

export default UserProfileIdPage;
