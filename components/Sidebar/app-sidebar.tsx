import { Gift, CalendarClock, ChefHat } from "lucide-react";
import { ToggleDarkMode } from "@/components/Theme/Theme";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

export async function AppSidebar() {
  const session = await auth();

  if (!session) {
    return redirect("/login");
  }

  const items =
    session.user?.name === "Papy"
      ? [
          {
            title: "Date",
            url: "/",
            icon: CalendarClock,
          },
          {
            title: "Manger",
            url: "/manger",
            icon: ChefHat,
          },
        ]
      : [
          {
            title: "Date",
            url: "/",
            icon: CalendarClock,
          },
          {
            title: "Cadeaux",
            url: "/cadeaux",
            icon: Gift,
          },
          {
            title: "Manger",
            url: "/manger",
            icon: ChefHat,
          },
        ];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center justify-evenly">
          <p>{session.user?.name}</p>
          <ToggleDarkMode />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
