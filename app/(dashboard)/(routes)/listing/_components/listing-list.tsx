"use client";

import { Category, Listing, User } from "@prisma/client";
import { ListingCard } from "./listing-card";

type ListingWithCategoryAndUser = Listing & {
  category: Category | null,
  user: User;
}

interface ListingListProps {
  items: ListingWithCategoryAndUser[];
  currentUser: User;
}

export const ListingList = ({
  items, currentUser
}: ListingListProps) => {
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <ListingCard 
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl!}
            state={item.state!}
            description={item.description!}
            name={item.user.name!}
            userId={item.user.id}
            userImage={item.user.imageUrl!}
            category={item?.category?.name!}
            user={currentUser}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No listings found
        </div> 
      )}
    </div>
  )
}