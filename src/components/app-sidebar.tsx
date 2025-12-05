"use client";

import * as React from "react";
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  SunMoon,
  MessageCircleQuestionMark,
  Settings,
  LayoutDashboard,
  Users,
  Calendar,
  Files,
  Clock,
  Banknote,
  Bell,
  ClipboardPlusIcon,
  CalendarPlus,
  CircleDollarSign,
  Briefcase,
  PlusCircle,
  WalletCards,
  UserPlus,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavActions } from "@/components/nav-actions";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// This is sample data.
const data = {
  user: {
    name: "Admin",
    email: "m@example.com",
    avatar: "/sample.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard-01",
      icon: LayoutDashboard,
      isActive: true,
      items: [
        {
          title: "Home",
          url: "/dashboard-01",
        },
        {
          title: "Team Overview",
          url: "/dashboard-01/team-overview",
        },
      ],
    },
    {
      title: "Employees",
      url: "#",
      icon: Users,
      items: [
        {
          title: "Directory",
          url: "#",
        },
        {
          title: "Onboarding",
          url: "#",
        },
        {
          title: "Performance",
          url: "#",
        },
      ],
    },
    {
      // Elevated to the top level for direct access
      title: "Timesheets",
      url: "#",
      icon: Clock,
      items: [
        {
          title: "My Timesheets",
          url: "#",
        },
        {
          title: "Time Clock",
          url: "#",
        },
        {
          title: "Approvals",
          url: "#",
        },
      ],
    },
    {
      // Elevated to the top level for direct access
      title: "Leave",
      url: "#",
      icon: Calendar,
      items: [
        {
          title: "Request Leave",
          url: "#",
        },
        {
          title: "Approvals",
          url: "#",
        },
        {
          title: "Team Calendar",
          url: "#",
        },
      ],
    },
    {
      title: "Payroll",
      url: "#",
      icon: Banknote,
      items: [
        {
          title: "Paystubs",
          url: "#",
        },
        {
          title: "Taxes",
          url: "#",
        },
        {
          title: "History",
          url: "#",
        },
      ],
    },
    {
      title: "Documents",
      url: "#",
      icon: Files,
      items: [
        {
          title: "Policies",
          url: "#",
        },
        {
          title: "Forms",
          url: "#",
        },
        {
          title: "Handbooks",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
      items: [
        {
          title: "My Profile",
          url: "#",
        },
        {
          title: "Company Profile",
          url: "#",
        },
        {
          title: "Billing & Plans",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Dark Mode",
      url: "#",
      icon: SunMoon,
    },
    {
      title: "Get Help",
      url: "#",
      icon: MessageCircleQuestionMark,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
  ],
  actions: [
    {
      name: "Create Timesheet",
      action: "create-timesheet",
      icon: ClipboardPlusIcon,
    },
    {
      name: "Request Leave",
      action: "request-leave",
      icon: CalendarPlus,
    },
    {
      name: "Onboard New Employee",
      action: "onboard-employee", // Not implemented in this example
      icon: UserPlus,
    },
    {
      name: "Log a New Task",
      action: "log-task", // Not implemented in this example
      icon: Briefcase,
    },
    {
      name: "View Paystub",
      action: "view-paystub", // Not implemented in this example
      icon: WalletCards,
    },
  ],
};

const notificationsData = [
  {
    id: "1",
    message: "A new leave request from John Doe requires your approval.",
    timestamp: "2 hours ago",
    isRead: false,
  },
  {
    id: "2",
    message: "Your monthly payroll has been processed and is now available.",
    timestamp: "Today, 9:30 AM",
    isRead: false,
  },
  {
    id: "3",
    message: "The new employee handbook has been published.",
    timestamp: "Yesterday, 4:00 PM",
    isRead: true,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} /> */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <AvatarImage src="https://images.unsplash.com/photo-1742197062761-1e44b0d7fd2e?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                <AvatarFallback>CI</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Corp Inc.</span>
                <span className="truncate text-xs">Pro</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavActions
          createItems={data.actions}
          notifications={notificationsData}
        />
        <NavMain items={data.navMain} />
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
