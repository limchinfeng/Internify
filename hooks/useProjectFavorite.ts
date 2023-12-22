import getCurrentUser from "@/actions/getCurrentUser";
import { User } from "@prisma/client";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import toast from "react-hot-toast";

interface IUseProjectFavorite {
  projectId: string;
  user: User;
}

const useFavorite = ({
  projectId, user
}: IUseProjectFavorite) => {
  const router = useRouter();

  const hasFavorited = useMemo(() => {
    const list = user?.favoriteProjectIds || [];

    return list.includes(projectId);
  }, [user, projectId]);

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
        request = () => axios.delete(`/api/project/favorites/${projectId}`);
      } else {
        request = () => axios.post(`/api/project/favorites/${projectId}`);
      }

      await request();
      router.refresh();
      toast.success('Success');
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, [user, hasFavorited, projectId, router]);

  return {
    hasFavorited, toggleFavorite
  }
}

export default useFavorite;