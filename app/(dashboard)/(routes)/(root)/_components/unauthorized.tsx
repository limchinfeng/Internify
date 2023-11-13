"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";

export const Unauthorized = () => {

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

  var buttonSize = "w-52 h-16";
  return (
    <div className="text-center my-32 mx-auto">

      <h2>Your Account is Unauthorized!</h2>
      <p className="pt-2">Log In/Register to view all the content </p>
      <div className="mt-10 space-x-5 > * + *">
        <Button className={buttonSize} variant="outline" onClick={handleClickLogin} disabled={buttonClicked}>
          Login
        </Button>
        <Button className={buttonSize} variant="outline" onClick={handleClickRegister} disabled={buttonClicked}>
          Register
        </Button>
      </div>



    </div>
  )
}