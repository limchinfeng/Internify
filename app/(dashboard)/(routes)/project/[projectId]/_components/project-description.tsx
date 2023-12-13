"use client";

import { Preview } from "@/components/description-preview";

interface ProjectDescriptionProps {
  description: string;
}

const ProjectDescription = ({ description }: ProjectDescriptionProps) => {
  return (
    <div>
      <h1 className="text-black">Project Description</h1>
      <div>{description && <Preview value={description} />}</div>
    </div>
  );
};

export default ProjectDescription;
