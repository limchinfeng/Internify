import getCurrentUser from "@/actions/getCurrentUser"
import { Banner } from "@/components/banner";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import { CompanyActions } from "./_components/company-actions";
import { CompanyListingTitle } from "./_components/company-listing-title";
import { CompanyListingCategory } from "./_components/company-listing-category";
import { CompanyListingLocation } from "./_components/company-listing-location";
import { CompanyListingState } from "./_components/company-listing-state";
import { CompanyListingBackground } from "./_components/company-listing-background";
import { CompanyListingDescription } from "./_components/company-listing-description";
import { CompanyListingRequirement } from "./_components/company-listing-requirement";


const CompanyListingIdPage = async ({
  params
}: {
  params: { listingId: string }
}) => {

  const states = [
    {
      label: "Johor"
    },
    {
      label: "Kedah"
    },
    {
      label: "Kelatan"
    },
    {
      label: "Malacca"
    },
    {
      label: "Negeri Sembilan"
    },
    {
      label: "Pahang"
    },
    {
      label: "Penang"
    },
    {
      label: "Perak"
    },
    {
      label: "Perlis"
    },
    {
      label: "Sabah"
    },
    {
      label: "Sarawak"
    },
    {
      label: "Selangor"
    },
    {
      label: "Terengganu"
    },
    {
      label: "Kuala Lumpur"
    },
  ]
  const currentUser = await getCurrentUser();

  if (!currentUser || !currentUser.isCompany) {
    return redirect("/");
  }

  const listing = await prismadb.listing.findUnique({
    where: {
      id: params.listingId,
      userId: currentUser.id,
    },
  });

  if (!listing) {
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
            <h2 className="text-2xl font-medium">
              Project Setup
            </h2>
            <span className="text-sm text-slate-700">
              Complete all fields {completionText}
            </span>
          </div>
          <CompanyActions
            disabled={!isComplete}
            listingId={params.listingId}
            isPublished={listing.isPublished}
          />
        </div>
        {listing.isPublished && (
          <div className="w-full mt-4 rounded-xl p-2 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
            <div className="rounded-lg bg-white p-4 flex flex-col gap-2 text-justify ">
              <p>
                Remember to republish when you have made a modification to generate a new Internify AI Summary
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <div>
            <CompanyListingTitle
              initialData={listing}
              listingId={listing.id}
            />
            <CompanyListingCategory
              initialData={listing}
              listingId={listing.id}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id
              }))}
            />
            <CompanyListingLocation
              initialData={listing}
              listingId={listing.id}
            />
            <CompanyListingState
              initialData={listing}
              listingId={listing.id}
              options={states.map((state) => ({
                label: state.label,
                value: state.label
              }))}
            />
            <CompanyListingBackground
              initialData={listing}
              listingId={listing.id}
            />
          </div>

          {/* right hand */}
          <div>
            <CompanyListingDescription
              initialData={listing}
              listingId={listing.id}
            />
            <CompanyListingRequirement
              initialData={listing}
              listingId={listing.id}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default CompanyListingIdPage;