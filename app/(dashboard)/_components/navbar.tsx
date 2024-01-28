import { NavbarRoutes } from "@/app/(dashboard)/_components/navbar-routes";
import { MobileSidebar } from "./mobile-sidebar";
import { User } from "@prisma/client";

export const Navbar = ({
  currentUser
}: { currentUser?: User | null }) => {
  return (
    <div className="p-4 px-8 border-b h-full flex items-center shadow-sm">
      <MobileSidebar currentUser={currentUser} />
      <NavbarRoutes currentUser={currentUser} />
    </div>
  );
}
