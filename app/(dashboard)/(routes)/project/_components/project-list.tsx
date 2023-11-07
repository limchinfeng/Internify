import { Category, Project, User } from "@prisma/client"
import { ProjectCard } from "./project-card"

type ProjectWithCategory = Project & {
  category: Category | null,
  user: User
}

interface ProjectListProps {
  items: ProjectWithCategory[]
}

export const ProjectList  = ({
  items
}: ProjectListProps) => {
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <ProjectCard 
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description!}
            name={item.user.name!}
            userId={item.user.id}
            userImage={item.user.imageUrl!}
            imageUrl={item.imageUrl!}
            category={item?.category?.name!}
            user={item.user}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No projects found
        </div> 
      )}
    </div>
  )
}