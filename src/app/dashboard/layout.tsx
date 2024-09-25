import { Sidebar } from "@/components/sidebar/sidebar";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <>
    <Sidebar />
    <main className="mx-5 mt-16 sm:ml-[300px] sm:mt-3">{children}</main>
  </>
);

export default Layout;
