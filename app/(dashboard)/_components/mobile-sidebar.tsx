import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { Sidebar } from "./sidebar"
import { User } from "@prisma/client"

export const MobileSidebar = ({
  currentUser
}: {currentUser?: User | null}) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white">
        <Sidebar currentUser={currentUser}/>
      </SheetContent>
    </Sheet>
  )
}