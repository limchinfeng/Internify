"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button"
import { User } from "@prisma/client"
import { signOut } from "next-auth/react"
import Image from 'next/image';
import avatar from "@/public/images/placeholder.jpg"
import { User2 } from "lucide-react";
import { GraduationCap, ScrollText, Rocket, Heart } from "lucide-react";
import { useRouter } from "next/navigation";

export const UserHome = ({
  currentUser
}: {
  currentUser: User
}) => {
  var buttonSize = "w-56 h-16";
  var iconStyle = "mr-2 h-4 w-4";
  const router = useRouter();
  const [buttonClickedProfile, setButtonClickedProfile] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleClickProfile = () => {
    setButtonClickedProfile(true);
    router.push('/profile');
  }
  const handleClickListing = () => {
    setButtonClicked(true);
    router.push('/listing');
  }

  const handleClickProject = () => {
    setButtonClicked(true);
    router.push('/project');
  }

  const handleClickResume = () => {
    setButtonClicked(true);
    router.push('/resume');
  }

  const handleClickFavorite = () => {
    setButtonClicked(true);
    router.push('/favorite');
  }

  return (
    <div className="w-full items-center justify-center flex flex-col p-2">
      <div className="border-4 shadow-md flex md:flex-row flex-col items-center justify-center w-2/3 mt-10 py-8 gap-4">
        <div>
          <Image
            className='rounded-full cursor-pointer w-15 h-15'
            height='60'
            width='60'
            alt='Avatar'
            src={currentUser?.imageUrl || avatar}
          />
        </div>
        <div>
          <p >{currentUser.email}</p>
        </div>
        <div>
          <Button 
            className="lg:w-48 lg:h-12 w-32 h-9 p-5" 
            onClick={handleClickProfile} 
            disabled={buttonClickedProfile}
          >
            <User2 className="mr-2 h-4 w-4" /> 
            Profile
          </Button>
        </div>
      </div>


      <div className="flex flex-col justify-center items-center my-10 mx-auto">
        <h2>Home Page </h2>
        <p>Where Internships and Simplicity at a place</p>

        <div className="mt-10 grid sm:grid-cols-2 gap-8 grid-cols-1">
          <div>
            <Button 
              className={buttonSize} 
              variant="outline" 
              onClick={handleClickListing} 
              disabled={buttonClicked}
            >
              <GraduationCap className={iconStyle} /> 
              Internship Listing
            </Button>
          </div>
          <div>
            <Button 
              className={buttonSize} 
              variant="outline" 
              onClick={handleClickProject} 
              disabled={buttonClicked}
            >
              <Rocket className={iconStyle} />
              Project Showcase
            </Button>
          </div>
          <div>
            <Button 
              className={buttonSize} 
              variant="outline" 
              onClick={handleClickResume} 
              disabled={buttonClicked}
            >
              <ScrollText className={iconStyle} />
              Resume Upload
            </Button>
          </div>
          <div>
            <Button 
              className={buttonSize} 
              variant="outline" 
              onClick={handleClickFavorite} 
              disabled={buttonClicked}
            >
              <Heart className={iconStyle} />
              Favorite
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}