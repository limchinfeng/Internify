import { redirect } from "next/navigation";

const ProfileIdPage = ({
  params,
}: {
  params: { profileId: string };
}) => {
  return redirect(`/profile/${params.profileId}`)
}
 
export default ProfileIdPage;