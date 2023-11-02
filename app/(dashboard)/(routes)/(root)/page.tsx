import getCurrentUser from "@/actions/getCurrentUser";
import { UserHome } from "./_components/user-home";
import { Unauthorized } from "./_components/unauthorized";

const Home = async () => {

  const currentUser = await getCurrentUser();

  return (  
    <div>
      <p>
        hone 0page
      </p>
      { currentUser 
        ? <UserHome currentUser={currentUser} />
        : <Unauthorized />
      }
    </div>
  );
}
 
export default Home;