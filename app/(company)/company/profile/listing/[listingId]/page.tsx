import getCurrentUser from "@/actions/getCurrentUser"
import { Banner } from "@/components/banner";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";

const CompanyListingIdPage  = async ({
  params
}: {
  params: {listingId: string}
}) => {
  const currentUser = await getCurrentUser();

  if(!currentUser || !currentUser.isCompany) {
    return redirect("/");
  }

  const listing = await prismadb.listing.findUnique({
    where: {
      id: params.listingId,
      userId: currentUser.id,
    },
  });

  if(!listing) {
    return redirect("/");
  }

  const categories = await prismadb.category.findMany({
    orderBy: {
      name: "asc"
    }
  });

  const requiredFields = [
    listing.title,
    listing.description,
    listing.imageUrl,
    listing.categoryId,
    listing.requirement,
    listing.location,
    listing.state
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`

  const isComplete = requiredFields.every(Boolean);


  return (
    <>
      {!listing.isPublished && (
        <Banner 
          label="This job listing is unpublished. It will not be visible to the public."
        />
      )}  
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">
              Project Setup
            </h1>
            <span className="text-sm text-slate-700">
              Complete all fields {completionText}
            </span>
          </div>
          {/* <CompanyActions 
            disabled={!isComplete}
            projectId={params.listingId}
            isPublished={listing.isPublished}
          /> */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <div>
            title
            <br />
            category
            <br />
            location
            <br />
            state
            <br />
            imageUrl
          </div>

          {/* right hand */}
          <div>  
            description
            <br />
            requirement
          </div>
        </div>
      </div>
    </> 
  )
}

export default CompanyListingIdPage;