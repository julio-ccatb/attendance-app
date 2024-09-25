import { type ROUTES } from "@/app/_utils/routes";
import { type LucideIcon } from "lucide-react";
import { type ReactNode } from "react";

export interface SidebarItems {
  links: Array<{
    label: string;
    href: ROUTES;
    icon?: LucideIcon;
  }>;
  extras?: ReactNode;
}
