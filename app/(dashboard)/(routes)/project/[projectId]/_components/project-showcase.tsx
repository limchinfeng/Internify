"use client";

import Image from "next/image";

interface ProjectShowcaseProps {
  id: string;
  showcaseImages: { id: string; url: string }[];
}

const ProjectShowcase = ({ id, showcaseImages }: ProjectShowcaseProps) => {
  return (
    <div>
      <h1 className="text-black text-xl">Project Showcase</h1>
      <div className="grid md:grid-cols-2 gap-10 my-5">
        {showcaseImages.map((image: any) => (
          // eslint-disable-next-line react/jsx-key
          <div className="md:container relative aspect-video">
            <Image
              className="w-full h-full relative object-cover object-center rounded-lg"
              alt="Project Showcase Image"
              fill={true}
              src={image.url}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectShowcase;
