/*
  TASK - perming
  create a home page (simple or sipek beautiful landing page)


  Task 1
  1. get current user
  2. check if current user is valid 
    2.1 if log in then will show them the landing page
    2.2 if not log in them redirect them to register or login
  
  Task 1 -> 2
  3. do the home page


  Task 3
  forgot passward and verified email

  1. create a function for the user to verify their email
  2. if they forgot password can let them reset their password 
*/

import getCurrentUser from "@/actions/getCurrentUser";
import { UserHome } from "./_components/user-home";
import { Unauthorized } from "./_components/unauthorized";
import { Button } from "@/components/ui/button"
import { GraduationCap, ScrollText, Rocket, Heart } from "lucide-react";
import Register from "../(auth)/register/page";
import { redirect } from "next/navigation";


const Home = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return redirect("/register");
  }

  const onSubmit = () => {
    return redirect("/register");
  }

  var buttonSize = "w-56 h-16";
  var iconStyle = "mr-2 h-4 w-4";

  return (
    <div>
      {currentUser ? (
        <div>
          <div className="border-4 shadow-md  w-6/12 text-center my-4 mx-auto">
            {currentUser
              ? <UserHome currentUser={currentUser} />
              : <Unauthorized />
            }
          </div>

          <div>
            <div className="text-center my-10 mx-auto">
              <h2>Home Page </h2>
              <p>Where Internships and Simplicity at a place</p>

              <div className="mt-10 space-x-5 > * + *">
                <Button className={buttonSize} variant="outline">
                  <GraduationCap className={iconStyle} /> Internship Listing

                </Button>
                <Button className={buttonSize} variant="outline">
                  <Rocket className={iconStyle} />Project Showcase</Button>
              </div>
              <div className="mt-5 space-x-5 > * + *">
                <Button className={buttonSize} variant="outline">
                  <ScrollText className={iconStyle} />Resume Upload</Button>
                <Button className={buttonSize} variant="outline">
                  <Heart className={iconStyle} />Favorite</Button>
              </div>
            </div>
          </div>


        </div>
      ) : (
        <div>
          <div>
            <h1>Invalid Account!</h1>
          </div>
          <div>
            <Button onSubmit={onSubmit}>Register Now</Button>
          </div>

        </div>

      )

      }
    </div>


  );
}

export default Home;