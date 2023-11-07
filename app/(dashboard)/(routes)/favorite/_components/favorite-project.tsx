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
      {projects.length > 0 ? (
        <>
          <Heading 
            title='Projects Favorites'
            subtitle='List of projects you have favorited!'
          />
          <div className='grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 mt-5'>
            {projects.map((project) => (
              <ProjectCard 
                key={project.id}
                id={project.id}
                title={project.title}
                description={project.description!}
                name={currentUser.name!}
                userId={currentUser.id}
                userImage={currentUser.imageUrl!}
                imageUrl={project.imageUrl!}
                category={project?.category?.name!}
                user={currentUser}
              />
            ))}
          </div>
        </>
      ) : (
        <div className='h-[20vh] flex flex-col gap-2 justify-center items-center'>
        <Heading 
          center
          title="No Favorites Project found"
          subtitle="Looks like you have no favorite projects"
          />
      </div>
      )}
    </div>
  )
}
