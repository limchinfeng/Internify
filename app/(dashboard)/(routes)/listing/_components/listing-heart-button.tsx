import useListingFavorite from '@/hooks/useListingFavorite';
import { cn } from '@/lib/utils';
import { User } from '@prisma/client';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

interface ListingHeartButtonProps {
  listingId: string;
  user: User;
}

export const ListingHeartButton = ({
  listingId, user
}: ListingHeartButtonProps) => {
  const {hasFavorited, toggleFavorite} = useListingFavorite({
    listingId, user
  })
return (
  <div 
    onClick={toggleFavorite}
    className="relative hover:opacity-80 transition cursor-pointer"
  >
    <AiOutlineHeart
      size={28}
      className="fill-white absolute -top-[2px] -right-[2px]"
    />
    <AiFillHeart
      size={24}
      className={cn(hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70')}
    />
  </div>
)
}