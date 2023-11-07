import useProjectFavorite from '@/hooks/useProjectFavorite';
import { User } from '@prisma/client';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

interface HeartButtonProps {
  projectId: string;
  user: User;
}

export const HeartButton = ({
  projectId, user
}: HeartButtonProps) => {
  const {hasFavorited, toggleFavorite} = useProjectFavorite({
    projectId, user
  })
return (
  <div 
    onClick={toggleFavorite}
    className="
      relative
      hover:opacity-80
      transition
      cursor-pointer
    "
  >
    <AiOutlineHeart
      size={28}
      className="
        fill-white
        absolute
        -top-[2px]
        -right-[2px]
      "
    />
    <AiFillHeart
      size={24}
      className={
        hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'
      }
    />
  </div>
)
}