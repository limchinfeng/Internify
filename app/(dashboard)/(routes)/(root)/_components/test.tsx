"use client"

import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";



const Test = ({
  currentUser
}: {
  currentUser: User
}) => {
  return (  
    <div className="flex justify-center items-center h-20 border"> 
      {currentUser.email}
      <Button onClick={() => signOut()}>
        Log Out
      </Button>
    </div>
  );
}
 
export default Test;
