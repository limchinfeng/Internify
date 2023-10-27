import { ToastProvider } from "@/providers/toaster-provider";

const mainLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="h-full">
      <div className="h-[80px] fixed inset-y-0 w-full z-50 border border-b">
        Navbar
      </div>
      <main className="pt-[80px] h-full">
        <ToastProvider />
        {children}
      </main>
  </div>
  )
}

export default mainLayout;