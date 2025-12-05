import { Bell } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge'; 

interface Notification {
  id: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

interface NotificationsDropdownProps {
  notifications: Notification[];
}

export function NavNotification({ notifications }: NotificationsDropdownProps) {
  // Count unread notifications
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-lg border border-gray-300">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Notifications</span>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[300px] p-0" align="end" side="right" sideOffset={12}>
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-64 overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map(notification => (
              <DropdownMenuItem
                key={notification.id}
                className={`flex flex-col items-start gap-1 p-2 ${!notification.isRead ? 'bg-accent font-medium' : ''}`}
              >
                <span className="text-sm">{notification.message}</span>
                <span className="text-xs text-gray-500">{notification.timestamp}</span>
              </DropdownMenuItem>
            ))
          ) : (
            <p className="p-4 text-sm text-center text-gray-500">You have no new notifications.</p>
          )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-center">
          View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}