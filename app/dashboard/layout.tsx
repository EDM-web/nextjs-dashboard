import SideNav from "../ui/dashboard/sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex md:flex-row flex-col h-screen md:overflow-hidden">
      <div className="flex-none w-full md:w-64">
        <SideNav />
      </div>
      <div className="p-6 md:p-12 md:overflow-y-auto grow">{children}</div>
    </div>
  );
}
