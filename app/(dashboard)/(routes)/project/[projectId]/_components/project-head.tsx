"use client";

import Image from "next/image";
import { User } from "@prisma/client";
// import { HeartButton } from "../heart-button";
import { HeartButton } from "../../_components/heart-button"

interface ProjectHeadProps {
  id: string;
  imageSrc: string;
  currentUser: User;
}

const ProjectHead = ({ id, imageSrc, currentUser }: ProjectHeadProps) => {
  return (
    <div className="w-full h-[60vh] overflow-hidden rounded-xl relative mt-10">
      <Image
        alt="Project Image"
        src={imageSrc}
        fill={true}
        className="object-cover w-full"
      />
      <div className="absolute top-5 right-5">
        <HeartButton projectId={id} user={currentUser} />
      </div>
    </div>
  );
};

export default ProjectHead;
