"use client";

import { type ROUTES } from "@/app/_utils/routes";
import { type SidebarItems } from "@/lib/types";
import { LogOut, MoreHorizontal, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarButton } from "./sidebar-button";
import { Separator } from "../ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";

interface SidebarDesktopProps {
  sidebarItems: SidebarItems;
}

export function SidebarDesktop(props: SidebarDesktopProps) {
  const pathname = usePathname();
  const session = useSession()

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-[270px] max-w-xs border-r">
      <div className="h-full px-3 py-4">
        <h3 className="mx-3 text-lg font-semibold text-foreground">VolunTrack</h3>
        <div className="mt-5">
          <div className="flex w-full flex-col gap-1">
            {props.sidebarItems.links.map((link, index) => (
              <Link key={index} href={link.href}>
                <SidebarButton
                  variant={
                    (pathname as ROUTES) === link.href ? "secondary" : "ghost"
                  }
                  icon={link.icon}
                  className="w-full"
                >
                  {link.label}
                </SidebarButton>
              </Link>
            ))}
            {props.sidebarItems.extras}
          </div>
          <div className="absolute bottom-3 left-0 w-full px-3">
            <Separator className="absolute -top-3 left-0 w-full" />
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="w-full justify-start p-2">
                  <div className="flex w-full items-center justify-between">
                    <div className="flex gap-2">
                      <Avatar className="h-5 w-5">
                        <AvatarImage src={session.data?.user.image ?? "https://github.com/max-programming.png"} />
                        <AvatarFallback>{session.data?.user.name}</AvatarFallback>
                      </Avatar>
                      <span className="text-ellipsis">{session.data?.user.name}</span>
                    </div>
                    <MoreHorizontal size={20} />
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="mb-2 w-56 rounded-[1rem] p-3">
                <div className="space-y-1">
                  <Link href="/">
                    <SidebarButton size="sm" icon={Settings} className="w-full">
                      Account Settings
                    </SidebarButton>
                  </Link>
                  <SidebarButton size="sm" icon={LogOut} className="w-full">
                    Log Out
                  </SidebarButton>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </aside>
  );
}
