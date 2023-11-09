import Heading from "@/components/heading";
import { Category, Listing, User } from "@prisma/client"
import { ProjectCard } from "../../project/_components/project-card";
import { ListingCard } from "../../listing/_components/listing-card";

type ListingWithCategoryAndUser = Listing & {
  category: Category | null,
  user: User
}

interface FavoriteListingProps {
  listings: ListingWithCategoryAndUser[];
  currentUser: User;
}

export const FavoriteListing = ({
  listings, currentUser
}: FavoriteListingProps) => {
  return (
    <div className="w-full">
      {listings.length > 0 ? (
        <>
          <Heading 
            title='Listings Favorites'
            subtitle='List of listings you have favorited!'
          />
          <div className='grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 mt-5'>
            {listings.map((listing) => (
              <ListingCard 
                key={listing.id}
                id={listing.id}
                title={listing.title}
                state={listing.state!}
                description={listing.description!}
                name={listing.user.name!}
                userId={listing.user.id}
                userImage={listing.user.imageUrl!}
                imageUrl={listing.imageUrl!}
                category={listing?.category?.name!}
                user={currentUser}
              />
            ))}
          </div>
        </>
      ) : (
        <div className='h-[20vh] flex flex-col gap-2 justify-center items-center'>
        <Heading 
          center
          title="No Favorites Listing found"
          subtitle="Looks like you have no favorite listings"
          />
      </div>
      )}
    </div>
  )
}
