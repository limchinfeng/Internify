import getCurrentUser from "@/actions/getCurrentUser";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

const mainLayout = async ({
  children
}: {
  children: React.ReactNode
}) => {
  const currentUser = await getCurrentUser();

  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50 border border-b">
        <Navbar currentUser={currentUser} />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50 border border-r">
        <Sidebar currentUser={currentUser} />
      </div>
      <main className="md:pl-56 pt-[80px] h-full">
        {children}
      </main>
  </div>
  )
}

export default mainLayout;