import Heading from "@/components/heading";
import { Category, Project, User } from "@prisma/client"
import { ProjectCard } from "../../project/_components/project-card";

type ProjectWithCategory = Project & {
  category: Category | null,
}

interface FavoriteProjectProps {
  projects: ProjectWithCategory[];
  currentUser: User;
}

export const FavoriteProject = ({
  projects, currentUser
}: FavoriteProjectProps) => {
  return (
    <div className="w-full">
      <Heading 
        title='Projects Favorites'
        subtitle='List of projects you have favorited!'
      />
      
    </div>
  )
}
