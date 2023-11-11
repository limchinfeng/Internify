/*
  TASK - perming
  create a home page (simple or sipek beautiful landing page)

  1. get current user
  2. check if current user is valid 
    2.1 if log in then will show them the landing page
    2.2 if not log in them redirect them to register or login
  3. do the home page

  forgot passward and verified email

  1. create a function for the user to verify their email
  2. if they forgot password can let them reset their password 
*/

import getCurrentUser from "@/actions/getCurrentUser";
import { UserHome } from "./_components/user-home";
import { Unauthorized } from "./_components/unauthorized";

const Home = async () => {

  const currentUser = await getCurrentUser();

  return (
    <div>
      <h2>
        hone Page
      </h2>
      {currentUser
        ? <UserHome currentUser={currentUser} />
        : <Unauthorized />
      }
    </div>
  );
}

export default Home;