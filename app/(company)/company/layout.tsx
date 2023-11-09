import { ToastProvider } from "@/providers/toaster-provider";

const CompanyLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="h-full">
      <main className="h-full">
        <ToastProvider />
        {children}
      </main>
  </div>
  )
}

export default CompanyLayout;