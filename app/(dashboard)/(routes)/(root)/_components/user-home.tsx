"use client"

import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button"
import { User } from "@prisma/client"
import { signOut } from "next-auth/react"
import Image from 'next/image';
import avatar from "@/public/images/placeholder.jpg"
import { User2 } from "lucide-react";
import { GraduationCap, ScrollText, Rocket, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { Fade } from "react-reveal";
import TypewriteroComponent from "typewriter-effect"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import styles from "../../../../../styles/Model.module.scss";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
  AnimationControls,
} from "framer-motion";




export const UserHome = ({
  currentUser
}: {
  currentUser: User
}) => {
  var buttonSize = "w-56 h-16 bg-white/60 border-black font-bold";
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

  const duration = 2.4;

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xStiff = useMotionValue(0);
  const yStiff = useMotionValue(0);

  const gridRef = useRef<HTMLDivElement | null>(null);

  const handleGridParallax = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (gridRef.current) {
      const speed = -10;
      const { width, height } = gridRef.current.getBoundingClientRect();
      const offsetX = event.pageX - width * 0.5;
      const offsetY = event.pageY - height * 0.5;

      const newTransformX = (offsetX * speed) / 100;
      const newTransformY = (offsetY * speed) / 100;

      x.set(newTransformX);
      y.set(newTransformY);
    }
  };

  const xMotion = useSpring(x, { stiffness: 400, damping: 90 });
  const yMotion = useSpring(y, { stiffness: 400, damping: 90 });

  const xStiffMotion = useSpring(xStiff, { stiffness: 400, damping: 90 });
  const yStiffMotion = useSpring(yStiff, { stiffness: 400, damping: 90 });

  const transition = { duration: 0.6, ease: [0.6, 0.01, -0.05, 0.9] };

  const testimonials = [
    {
      name: "Jane Doe",
      avatar: "JD",
      title: "Data Analyst Intern",
      description: "Internify was a game-changer in my internship search. It matched me with a role that was a perfect fit for my skills."
    },
    {
      name: "John Smith",
      avatar: "JS",
      title: "Marketing Intern",
      description: "The project showcase feature helped me stand out and land an amazing internship at a top marketing firm!"
    },
    {
      name: "Alice Johnson",
      avatar: "AJ",
      title: "HR Coordinator",
      description: "We found our star intern through Internify. Their AI recommendations really do bring the best candidates to you."
    },
    {
      name: "Omar Faruk",
      avatar: "OF",
      title: "Tech Startup CEO",
      description: "Internify's talent pool is impressive. We hired interns with cutting-edge skills that added value from day one."
    },
    {
      name: "Emma Brown",
      avatar: "EB",
      title: "Graphic Design Intern",
      description: "Landing my dream internship was seamless with Internify. Their user interface made the process incredibly easy."
    },
    {
      name: "Liu Wei",
      avatar: "LW",
      title: "Research Intern",
      description: "Thanks to Internify, I connected with a research team that was the perfect match for my thesis topic."
    },
    {
      name: "Sophia Taylor",
      avatar: "ST",
      title: "Product Manager",
      description: "Internify streamlined our search for a product management intern and we were thrilled with the quick and quality matches."
    },
    {
      name: "Carlos Rodriguez",
      avatar: "CR",
      title: "Engineering Intern",
      description: "I never knew finding an internship could be so tailored to my interests until I used Internify. Highly recommend!"
    },
  ];


  return (
    <AnimatePresence>
      <motion.div className={styles.LandingContainer}>
        <div className={styles["movableContainer"]}>
          <motion.div
            className={styles["imageContainer"]}
            onMouseMove={handleGridParallax}
            ref={gridRef}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: duration, ...transition }}
            style={{
              x: xMotion,
              y: yMotion,
            }}
          ></motion.div>
        </div>
        <motion.div className={styles["contentContainer"]}
          onMouseMove={handleGridParallax}
          ref={gridRef}
          style={{
            x: xStiffMotion,
            y: yStiffMotion,
          }}>
          {/* <div className="border-4 shadow-md flex md:flex-row flex-col items-center justify-center w-2/3 mt-10 py-8 gap-4 	">
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
          </div> */}


          <div className="flex flex-col justify-center items-center my-10 mx-auto">
            <h2 className="text-5xl pb-2">Internify</h2>
            <h3 className="font-normal pb-5">Where Internships and Simplicity at a place</h3>
            <div className="flex-col flex">
              <p className="text-2xl">
                Your Gateway to
              </p>
              <div className='text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>
                <h2 className="text-3xl font-extrabold">
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
                <p className="text-2xl">Internship</p>
              </div>
            </div>

            <div className="my-10 grid sm:grid-cols-2 md:gap-12 gap-5 grid-cols-1">
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

            <div className="flex flex-col items-center justify-center mt-8">
              <div className="flex flex-row items-center justify-center gap-3">
                <h2>Testimonials</h2>
                <Image
                  className='rounded-full cursor-pointer w-15 h-15'
                  height='60'
                  width='60'
                  alt='Testimonials'
                  src="/Testimonials.png"
                />
              </div>
              <Fade bottom delay={70}>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8 p-12'>

                  {testimonials.map((item) => (

                    <Card key={item.description}
                      className='border-[#1A374F] border-2 '
                    >

                      <CardHeader>
                        <CardTitle className='flex items-center gap-x-2 justify-center	'>
                          <div>
                            <h2 className='text-transparent bg-clip-text bg-gradient-to-r pb-4 from-purple-600 to-pink-600'>
                              {item.name}
                            </h2>
                            <p className=' text-sm font-bold'>
                              {item.title}
                            </p>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className='pt-2 justify-center items-center space-y-2'>
                        <p className="text-center text-base leading-relaxed ">{item.description}</p>
                      </CardContent>
                    </Card>

                  ))}
                </div>
              </Fade>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>

  )
}