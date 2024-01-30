"use client";

import Image from "next/image";
import Link from "next/link";

interface ProjectShowcaseProps {
  id: string;
  showcaseImages: { id: string; url: string }[];
}

const ProjectShowcase = ({ id, showcaseImages }: ProjectShowcaseProps) => {
  
  return (
    <div className="mt-4">
      <h1 className="text-xl">Project Showcase</h1>
      <div className="grid md:grid-cols-2 gap-10 my-5">
        {showcaseImages.map((image: any) => (
          // eslint-disable-next-line react/jsx-key
          <div className="md:container relative aspect-video cursor-pointer">
            <Link
              href={image.url}
              target="_blank" 
            >
              <Image
                className="w-full h-full relative object-cover object-center rounded-lg"
                alt="Project Showcase Image"
                fill={true}
                src={image.url}
                />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectShowcase;
