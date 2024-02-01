/*
  TASK - Angel
  create a page for the public user to view the company job listing page (like others view your social media post)

  1. get current user
  2. check if current user is valid (can refer to others page)
  3. shows the job listing & company details (can design what you like )
*/

import getCurrentUser from "@/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import { ListingIdHead } from "./_components/listing-id-head";
import { ListingIdTitle } from "./_components/listing-id-title";
import { ListingIdCompanyDetails } from "./_components/listing-id-company-details";
import { ListingIdDescription } from "./_components/listing-id-description";
import { ListingIdRequirement } from "./_components/listing-id-requirement";
import { ListingIdApply } from "./_components/listing-id-apply";
import { ListingIdSummary } from "./_components/listing-id-summary";

const ListingIdPage =  async ({params} : {params: { listingId: string}}) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return redirect("/");
  }

  const listing = await prismadb.listing.findUnique({
    where: {
      id: params.listingId,
    },
    include: {
      category: true,
      user: true,
    },
  });

  if (!listing) {
    return redirect("/");
  }

  const unique = currentUser.id + params.listingId;

  const application = await prismadb.application.findUnique({
    where: {
      unique
    }
  });
  
  return (  
    <div className="p-6 w-full flex flex-col items-center justify-center gap-10">
      <ListingIdSummary 
        summary={listing.summary!}
      />
      <ListingIdHead 
        id={listing.id}
        imageUrl={listing.imageUrl!}
        currentUser={currentUser} 
      />

      <div className="w-4/5 flex items-start ">
        <ListingIdTitle 
          title={listing.title}
          category={listing.category?.name!}
        />
      </div>

      <div className="md:hidden w-full">
          <ListingIdApply 
            listingId={listing.id}
            isApply={!!application}
            disabled={listing.userId === currentUser.id}
            isCompany={!!currentUser.isCompany}
          />
      </div>

      <div className="w-4/5 grid grid-cols-1 md:grid-cols-2 md:gap-8">
        <div>
          <div className="flex flex-col gap-x-4 gap-6 ">
            <ListingIdCompanyDetails 
              name={listing.user.name!}
              email={listing.user.email!}
              location={listing.location!}
              state={listing.state!}
              link={listing.user.link!}
              userId={listing.userId}
              image={listing.user.imageUrl!}
            />
          </div>
        </div>

        <div className="mt-4 md:mt-0 invisible md:visible">
          <div className="flex flex-col items-center justify-center gap-x-4 gap-4 md:h-full">
            <ListingIdApply 
              listingId={listing.id}
              isApply={!!application}
              disabled={listing.userId === currentUser.id}
              isCompany={!!currentUser.isCompany}
            />
          </div>
        </div>
      </div>

      <div className="w-4/5 grid grid-cols-1 md:grid-cols-2 md:gap-8 -mt-16 md:mt-0">
        <div>
          <ListingIdDescription 
            description={listing.description!}
          />
        </div>

        <div className="mt-4 md:mt-0">
          <ListingIdRequirement 
            requirement={listing.requirement!}
          />
        </div>
      </div>

      <div className="h-10">

      </div>
    </div>
  );
}
 
export default ListingIdPage;