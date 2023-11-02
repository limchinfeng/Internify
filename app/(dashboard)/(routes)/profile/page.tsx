import getCurrentUser from "@/actions/getCurrentUser";
import { redirect } from "next/navigation";
import { ProfileImage } from "./_components/profile-image";
import { ProfileName } from "./_components/profile-name";

const ProfilePage = async () => {
  const currentUser = await getCurrentUser();

  if(!currentUser) {
    return redirect("/");
  }

  return (  
    <div className="p-6 w-full flex flex-col items-center justify-center gap-10">
      <ProfileImage currentUser={currentUser} />
      <div className="w-[80%] md:w-[800px] lg:w-[1000px] grid grid-cols-1 md:grid-cols-2 md:gap-16 lg:gap-36 items-center">
        <div className="md:w-80 w-5/6 space-y-6">
          <div>

          <ProfileName currentUser={currentUser} />
          <br />
          phone
          <br />
          email
          </div>
        </div>

        <div className="md:w-80 w-full space-y-6">
          <div>
            <div className="flex items-center gap-x-2">
              link
              <br />
              description
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default ProfilePage;