import getCurrentUser from "@/actions/getCurrentUser";
import { redirect } from "next/navigation";
import { ProfileImage } from "./_components/profile-image";
import { ProfileName } from "./_components/profile-name";
import { ProfilePhone } from "./_components/profile-phone";
import { ProfileEmail } from "./_components/profile-email";
import { ProfileLink } from "./_components/profile-link";
import { ProfileDescription } from "./_components/profile-description";


const ProfilePage = async () => {
  const currentUser = await getCurrentUser();

  if(!currentUser) {
    return redirect("/");
  }

  return (  
    <div className="p-6 w-full flex flex-col items-center justify-center gap-10">
      <ProfileImage currentUser={currentUser} />
      <div className="w-[80%] grid grid-cols-1 md:grid-cols-2 md:gap-16 lg:gap-36 items-center">
        <div className="md:w-80 w-5/6 space-y-6">
          <div>

          <ProfileName currentUser={currentUser} />
          <ProfilePhone currentUser={currentUser} />
          <ProfileEmail currentUser={currentUser} />
          </div>
        </div>

        <div className="md:w-80 w-5/6 space-y-6">
          <div>
            <ProfileLink currentUser={currentUser} />
            <ProfileDescription currentUser={currentUser} />
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default ProfilePage;