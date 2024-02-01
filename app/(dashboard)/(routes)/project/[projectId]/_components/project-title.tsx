interface ProjectTitleProps {
  title: string;
  category: string;
}

export const ProjectTitle = ({
  title, category
}: ProjectTitleProps) => {
  return (
    <div className="flex flex-col gap-1">
      <h1>
        {title}
      </h1>
      <p>
        {category}
      </p>
    </div>
  )
}