"use client"

import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import styles from "../../../../../styles/Model-Unauthorized.module.scss";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
  AnimationControls,
} from "framer-motion";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export const Unauthorized = () => {

  const { resolvedTheme } = useTheme();
  const router = useRouter();
  const [buttonClicked, setButtonClicked] = useState(false);
  const handleClickLogin = () => {
    setButtonClicked(true);
    router.push('/login');
  }
  const handleClickRegister = () => {
    setButtonClicked(true);
    router.push('/register');
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

  var buttonSize = `w-56 h-16 bg-transparent border-black font-bold`;
  var buttonSizeDark = `w-56 h-16 bg-transparent border-white font-bold`;

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
          <div className="text-center my-32 mx-auto">
            <h2>Your Account is Unauthorized!</h2>
            <p className="pt-2">Log In/Register to view all the content </p>
            <div className="mt-10 space-x-5 > * + *">
              <Button className={cn(resolvedTheme === "light" ? buttonSize : buttonSizeDark)} variant="outline" onClick={handleClickLogin} disabled={buttonClicked}>
                Login
              </Button>
              <Button className={cn(resolvedTheme === "light" ? buttonSize : buttonSizeDark)} variant="outline" onClick={handleClickRegister} disabled={buttonClicked}>
                Register
              </Button>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </AnimatePresence>

  )
}