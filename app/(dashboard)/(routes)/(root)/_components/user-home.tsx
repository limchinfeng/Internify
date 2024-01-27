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
import TypewriteroComponent from "typewriter-effect"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"



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
    router.push('/recommendation');
  }

  const handleClickFavorite = () => {
    setButtonClicked(true);
    router.push('/favorite');
  }

  const testimonials = [
    {
      name: "Supershuaifeng",
      avatar: "F",
      title: "Software Engineer",
      description: "Best application ever!"
    },
    {
      name: "Supershuaifeng",
      avatar: "F",
      title: "Software Engineer",
      description: "Best application ever!"
    },
    {
      name: "Supershuaifeng",
      avatar: "F",
      title: "Software Engineer",
      description: "Best application ever!"
    },
    {
      name: "Supershuaifeng",
      avatar: "F",
      title: "Software Engineer",
      description: "Best application ever!"
    },
    {
      name: "Supershuaifeng",
      avatar: "F",
      title: "Software Engineer",
      description: "Best application ever!"
    },
    {
      name: "Supershuaifeng",
      avatar: "F",
      title: "Software Engineer",
      description: "Best application ever!"
    },
    {
      name: "Supershuaifeng",
      avatar: "F",
      title: "Software Engineer",
      description: "Best application ever!"
    },
    {
      name: "Supershuaifeng",
      avatar: "F",
      title: "Software Engineer",
      description: "Best application ever!"
    },

  ]

  return (
    <div className="w-full items-center justify-center flex flex-col ">
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
        <h2>Internify: Your Gateway to  </h2>
        <div className="flex-row flex">
          <div className='text-transparent bg-clip-text bg-gradient-to-r pb-4
                from-purple-400 to-pink-600
            '>
            <h2>
              <TypewriteroComponent
                options={{
                  strings: [
                    "Discover",
                    "Connect",
                    "Land",
                    "Succeed",
                  ],
                  autoStart: true,
                  loop: true
                }}

              />
            </h2>
          </div>
          <div>
            <h2>Internship</h2>
          </div>
        </div>

        <p>Where Internships and Simplicity at a place</p>

        <div className="my-10 grid sm:grid-cols-2 gap-8 grid-cols-1">
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
              Recommendation
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

        <h2>Testimonials</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
            lg:grid-cols-4 gap-8 mt-10
        '>
          {testimonials.map((item) => (
            <Card key={item.description}
              className='bg-[#788DAA] border-none text-b'
            >
              <CardHeader>
                <CardTitle className='flex items-center gap-x-2'>
                  <div>
                    <h2 className='text-lg'>{item.name}</h2>
                    <p className='text-zinc-800 text-sm'>{item.title}</p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className='pt-4'>
                {item.description}
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </div>
  )
}