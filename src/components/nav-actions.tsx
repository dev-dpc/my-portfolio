/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { useState } from "react";
import { LucideIcon, PlusCircle, Bell } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import {
  TimesheetDialog,
  LeaveRequestDialog,
} from "@/components/dialogs/create-dialogs";
import { OnboardEmployeeDialog } from "@/components/dialogs/onboard-employee-dialog";
import { LogTaskDialog } from "@/components/dialogs/log-task-dialog";
import { ViewPaystubDialog } from "@/components/dialogs/view-paystub-dialog";

const DIALOG_COMPONENTS = {
  "create-timesheet": TimesheetDialog,
  "request-leave": LeaveRequestDialog,
  "view-paystub": ViewPaystubDialog,
  "log-task": LogTaskDialog,
  "onboard-employee": OnboardEmployeeDialog,
  // Add more mappings as you create more dialogs
} as const;

interface ActionItem {
  name: string;
  action: string;
  icon: LucideIcon;
}

interface Notification {
  id: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

export function NavActions({
  createItems,
  notifications,
}: {
  createItems: ActionItem[];
  notifications: Notification[];
}) {
  const { isMobile, state } = useSidebar();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState<string | null>(null);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleAction = (actionId: string) => {
    // Check if we have a dialog component for this action
    if (actionId in DIALOG_COMPONENTS) {
      setOpenDialog(actionId);
    } else {
      // Fallback to console log for unimplemented actions
      toast.info("Coming Soon", {
        description: "This feature is not yet implemented.",
      });
    }
  };

  const closeDialog = () => setOpenDialog(null);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
      <SidebarMenu>
        <DropdownMenu open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DropdownMenuTrigger
            asChild
            onMouseEnter={() => setIsCreateOpen(true)}
            onMouseLeave={() => setIsCreateOpen(false)}
          >
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="#">
                  <PlusCircle />
                  <span>Create</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-auto -ml-1 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align={isMobile ? "end" : "start"}
            onMouseEnter={() => setIsCreateOpen(true)}
            onMouseLeave={() => setIsCreateOpen(false)}
          >
            {createItems.map((item) => (
              <DropdownMenuItem
                key={item.name}
                onSelect={(e) => {
                  e.preventDefault(); // Prevent menu from closing
                  handleAction(item.action);
                }}
              >
                <item.icon className="text-muted-foreground mr-2 h-4 w-4" />
                <span>{item.name}</span>
              </DropdownMenuItem>
            ))}
            {openDialog && openDialog in DIALOG_COMPONENTS && (() => {
              const DialogComponent = DIALOG_COMPONENTS[openDialog as keyof typeof DIALOG_COMPONENTS];
              return (
                <DialogComponent 
                  isOpen={true} 
                  onOpenChange={(open) => !open && closeDialog()} 
                />
              );
            })()}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu
          open={isNotificationsOpen}
          onOpenChange={setIsNotificationsOpen}
        >
          <DropdownMenuTrigger
            asChild
            onMouseEnter={() => setIsNotificationsOpen(true)}
            onMouseLeave={() => setIsNotificationsOpen(false)}
          >
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="#" className="relative">
                  <Bell />
                  <span>Notifications</span>
                  {unreadCount > 0 && (
                    <Badge
                      variant="destructive"
                      className={`
                      absolute top-2 right-2 rounded-full p-0 flex items-center justify-center text-xs
                      ${state === "expanded" ? "h-4 w-4" : "h-2 w-2"}
                    `}
                    >
                      {unreadCount}
                    </Badge>
                  )}
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="min-w-[300px] -ml-2 p-0"
            side={isMobile ? "bottom" : "right"}
            align={isMobile ? "end" : "start"}
            onMouseEnter={() => setIsNotificationsOpen(true)}
            onMouseLeave={() => setIsNotificationsOpen(false)}
          >
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-64 overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className={`flex flex-col items-start gap-1 p-2 ${
                      !notification.isRead ? "bg-accent font-medium" : ""
                    }`}
                  >
                    <span className="text-sm">{notification.message}</span>
                    <span className="text-xs text-gray-500">
                      {notification.timestamp}
                    </span>
                  </DropdownMenuItem>
                ))
              ) : (
                <p className="p-4 text-sm text-center text-gray-500">
                  You have no new notifications.
                </p>
              )}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenu>
    </SidebarGroup>
  );
}
