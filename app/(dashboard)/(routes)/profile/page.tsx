import getCurrentUser from "@/actions/getCurrentUser";
import { redirect } from "next/navigation";
import { ProfileImage } from "./_components/profile-image";

const ProfilePage = async () => {
  const currentUser = await getCurrentUser();

  if(!currentUser) {
    return redirect("/");
  }

  return (  
    <div className="p-6 w-full">
      <ProfileImage currentUser={currentUser} />
    </div>
  );
}
 
export default ProfilePage;