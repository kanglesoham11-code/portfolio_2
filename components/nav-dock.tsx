"use client";

import {
  User,
  Layers,
  FolderKanban,
  Trophy,
  Mail,
  Send,
} from "lucide-react";
import { Dock, DockIcon, DockItem, DockLabel } from "@/components/core/dock";

const NAV_ITEMS = [
  { title: "About", icon: User, href: "#about" },
  { title: "Skills", icon: Layers, href: "#skills" },
  { title: "Work", icon: FolderKanban, href: "#work" },
  { title: "Journey", icon: Trophy, href: "#journey" },
  { title: "Contact", icon: Mail, href: "#contact" },
  {
    title: "Let\u2019s talk",
    icon: Send,
    href: "mailto:kanglesoham11@gmail.com",
  },
];

export function NavDock() {
  return (
    <div className="fixed bottom-4 left-1/2 z-[101] max-w-[95vw] -translate-x-1/2 overflow-x-auto hide-scrollbar rounded-2xl">
      <Dock className="items-end pb-3 flex-nowrap w-max">
        {NAV_ITEMS.map((item) => {
          const isExternal = item.href.startsWith("mailto");
          return (
            <a
              key={item.title}
              href={item.href}
              {...(isExternal
                ? { target: "_blank", rel: "noreferrer" }
                : {})}
            >
              <DockItem className="aspect-square rounded-full bg-[rgba(237,245,255,0.75)]">
                <DockLabel>{item.title}</DockLabel>
                <DockIcon>
                  <item.icon className="h-1/2 w-1/2 text-foreground" />
                </DockIcon>
              </DockItem>
            </a>
          );
        })}
      </Dock>
    </div>
  );
}
