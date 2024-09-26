"use client"
import { Sidebar } from "@/components/sidebar/sidebar";
import { SessionProvider } from "next-auth/react";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <>
    <SessionProvider>
      <Sidebar />
    </SessionProvider>
    <main className="mx-5 mt-16 sm:ml-[300px] sm:mt-3">{children}</main>
  </>
);

export default Layout;
