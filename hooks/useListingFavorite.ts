import getCurrentUser from "@/actions/getCurrentUser";
import { User } from "@prisma/client";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import toast from "react-hot-toast";

interface IUseListingProjectFavorite {
  listingId: string;
  user: User;
}

const useListingFavorite = ({
  listingId, user
}: IUseListingProjectFavorite) => {

  const router = useRouter();

  const hasFavorited = useMemo(() => {
    const list = user?.favoriteListingIds || [];

    return list.includes(listingId);
  }, [user, listingId]);

  const toggleFavorite = useCallback(async (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    e.stopPropagation();

    if (!user) {
      redirect("/");
    }

    try {
      let request;

      if (hasFavorited) {
        request = () => axios.delete(`/api/listing/favorites/${listingId}`);
      } else {
        request = () => axios.post(`/api/listing/favorites/${listingId}`);
      }

      await request();
      router.refresh();
      toast.success('Success');
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, [user, hasFavorited, listingId, router]);

  return {
    hasFavorited, toggleFavorite
  }
}

export default useListingFavorite;