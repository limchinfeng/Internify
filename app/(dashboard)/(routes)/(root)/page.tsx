import getCurrentUser from "@/actions/getCurrentUser";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import Test from "./_components/test";

const Home = async () => {

  const currentUser = await getCurrentUser();

  return (  
    <div>
      <p>
        hone 0page
      </p>
      { currentUser 
        ? <Test currentUser={currentUser} />
        : <div className="flex flex-row gap-3 text-lg font-bold p-5 cursor-pointer hover:text-primary transition">
            <a href="/login">Login</a>
            <a href="/register">register</a>
          </div>
      }
    </div>
  );
}
 
export default Home;