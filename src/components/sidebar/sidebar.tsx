"use client";

import { ROUTES } from "@/app/_utils/routes";
import { type SidebarItems } from "@/lib/types";
import {
  BarChart2,
  ClipboardList,
  FileText,
  Home,
  MoreHorizontal,
  Settings,
  User,
  Users,
} from "lucide-react";
import { useMediaQuery } from "usehooks-ts";
import { SidebarButton } from "./sidebar-button";
import { SidebarDesktop } from "./sidebar-desktop";
import { SidebarMobile } from "./sidebar-mobile";

const sidebarItems: SidebarItems = {
  links: [
    { label: "Dashboard", href: ROUTES.DASHBOARD, icon: Home },
    { label: "Volunteers", href: ROUTES.VOLUNTEERS, icon: Users },
    { label: "Attendance", href: ROUTES.ATTENDANCE, icon: ClipboardList },
    { label: "Activities", href: ROUTES.ACTIVITIES, icon: FileText },
    { label: "Reports", href: ROUTES.REPORTS, icon: BarChart2 },
    {
      label: "Settings",
      href: ROUTES.SETTINGS,
      icon: Settings,
    },
    {
      label: "Profile Settings",
      href: ROUTES.SETTINGS_PROFILE,
      icon: User,
    },
  ],
  extras: (
    <div className="flex flex-col gap-2">
      {/* <SidebarButton icon={MoreHorizontal} className="w-full">
        More
      </SidebarButton>
      <SidebarButton className="w-full justify-center" variant="default">
        Tweet
      </SidebarButton> */}
    </div>
  ),
};

export function Sidebar() {
  const isDesktop = useMediaQuery("(min-width: 640px)", {
    initializeWithValue: false,
  });

  if (isDesktop) {
    return <SidebarDesktop sidebarItems={sidebarItems} />;
  }

  return <SidebarMobile sidebarItems={sidebarItems} />;
}
