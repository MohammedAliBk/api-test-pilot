import React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import {
  ChevronsUpDown,
  LogOut,
  Moon,
  Sun,
  UserCheck,
} from 'lucide-react';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

export interface NavUserProps {
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
  onSignOut?: () => void;
}

export const NavUser: React.FC<NavUserProps> = ({
  userName = 'Developer',
  userEmail = 'developer@apitestpilot.com',
  userAvatar,
  onSignOut,
}) => {
  const { isMobile } = useSidebar();
  const [isDark, setIsDark] = React.useState(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.getAttribute('data-theme') !== 'light';
    }
    return true;
  });

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  };

  const initials = userName
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'AP';

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenuPrimitive.Root>
          <DropdownMenuPrimitive.Trigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
            >
              <AvatarPrimitive.Root className="h-8 w-8 rounded-control shrink-0 overflow-hidden border border-sidebar-border bg-secondary flex items-center justify-center">
                {userAvatar ? (
                  <AvatarPrimitive.Image
                    src={userAvatar}
                    alt={userName}
                    className="h-full w-full object-cover"
                  />
                ) : null}
                <AvatarPrimitive.Fallback className="flex h-full w-full items-center justify-center rounded-control bg-primary/15 text-primary font-mono text-xs font-bold">
                  {initials}
                </AvatarPrimitive.Fallback>
              </AvatarPrimitive.Root>
              <div className="grid flex-1 text-left text-xs leading-tight">
                <span className="truncate font-semibold text-sidebar-foreground">
                  {userName}
                </span>
                <span className="truncate text-2xs font-mono text-sidebar-foreground/70">
                  {userEmail}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4 shrink-0 text-sidebar-foreground/60" />
            </SidebarMenuButton>
          </DropdownMenuPrimitive.Trigger>

          <DropdownMenuPrimitive.Portal>
            <DropdownMenuPrimitive.Content
              side={isMobile ? 'bottom' : 'right'}
              align="end"
              sideOffset={6}
              className="z-50 min-w-56 rounded-card border border-border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95"
            >
              <DropdownMenuPrimitive.Label className="p-0 font-normal">
                <div className="flex items-center gap-2.5 px-2 py-2 text-left text-xs">
                  <AvatarPrimitive.Root className="h-8 w-8 rounded-control shrink-0 overflow-hidden border border-border bg-secondary flex items-center justify-center">
                    <AvatarPrimitive.Fallback className="flex h-full w-full items-center justify-center rounded-control bg-primary/15 text-primary font-mono text-xs font-bold">
                      {initials}
                    </AvatarPrimitive.Fallback>
                  </AvatarPrimitive.Root>
                  <div className="grid flex-1 text-left text-xs leading-tight">
                    <span className="truncate font-semibold text-foreground">
                      {userName}
                    </span>
                    <span className="truncate text-2xs font-mono text-muted-foreground">
                      {userEmail}
                    </span>
                  </div>
                </div>
              </DropdownMenuPrimitive.Label>

              <DropdownMenuPrimitive.Separator className="-mx-1 my-1 h-px bg-border" />

              <DropdownMenuPrimitive.Group>
                <DropdownMenuPrimitive.Item className="relative flex cursor-pointer select-none items-center gap-2 rounded-control px-2 py-1.5 text-xs outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <UserCheck className="size-4 shrink-0 text-muted-foreground" />
                  <span>Workspace Profile</span>
                </DropdownMenuPrimitive.Item>

                <DropdownMenuPrimitive.Item
                  onSelect={toggleTheme}
                  className="relative flex cursor-pointer select-none items-center gap-2 rounded-control px-2 py-1.5 text-xs outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  {isDark ? (
                    <Sun className="size-4 shrink-0 text-muted-foreground" />
                  ) : (
                    <Moon className="size-4 shrink-0 text-muted-foreground" />
                  )}
                  <span>{isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</span>
                </DropdownMenuPrimitive.Item>
              </DropdownMenuPrimitive.Group>

              <DropdownMenuPrimitive.Separator className="-mx-1 my-1 h-px bg-border" />

              <DropdownMenuPrimitive.Item
                onSelect={onSignOut}
                className="relative flex cursor-pointer select-none items-center gap-2 rounded-control px-2 py-1.5 text-xs text-destructive outline-none transition-colors hover:bg-destructive/10 focus:bg-destructive/10"
              >
                <LogOut className="size-4 shrink-0" />
                <span>Log out</span>
              </DropdownMenuPrimitive.Item>
            </DropdownMenuPrimitive.Content>
          </DropdownMenuPrimitive.Portal>
        </DropdownMenuPrimitive.Root>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
