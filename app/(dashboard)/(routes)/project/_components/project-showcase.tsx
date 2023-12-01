"use client";

import Image from "next/image";

interface ProjectShowcaseProps {
  id: string;
  showcaseImages: { id: string; url: string }[];
}

const ProjectShowcase = ({ id, showcaseImages }: ProjectShowcaseProps) => {
  return (
    <div>
      <h1 className="text-black">Project Showcase</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 mb-10 mt-3">
        {showcaseImages.map((image) => (
          <div key={image.id} className="justify-center items-center relative">
            <Image
              className="rounded-xl"
              height="450"
              width="600"
              alt="Showcase Image"
              src={image.url}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectShowcase;
