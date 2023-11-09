import getCurrentUser from "@/actions/getCurrentUser";
import { CompanyNavbar } from "./_components/company-navbar";


const mainLayout = async ({
  children
}: {
  children: React.ReactNode
}) => {
  const currentUser = await getCurrentUser();

  return (
    <div className="h-full">
      <div className="h-[80px] fixed inset-y-0 w-full z-50 border border-b">
        <CompanyNavbar currentUser={currentUser} />
      </div>
      <main className="pt-[80px] h-full">
        {children}
      </main>
  </div>
  )
}

export default mainLayout;