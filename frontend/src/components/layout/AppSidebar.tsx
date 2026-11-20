import React from 'react';
import { Logo } from '@/components/ui/Logo';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  FileCode2,
  Activity,
  Sparkles,
  KeyRound,
  Settings,
} from 'lucide-react';
import { NavUser } from './NavUser';

export interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  currentRoute?: string;
  onNavigate?: (route: string) => void;
  onSignOut?: () => void;
  userEmail?: string;
  userName?: string;
}

const navItems = [
  { id: 'dashboard', label: 'Overview', icon: LayoutDashboard, badge: undefined },
  { id: 'specs', label: 'OpenAPI Specs', icon: FileCode2, badge: 'Soon' },
  { id: 'runs', label: 'Test Matrix', icon: Activity, badge: undefined },
  { id: 'recovery', label: 'AI Recovery', icon: Sparkles, badge: 'AI' },
  { id: 'secrets', label: 'Secrets & Keys', icon: KeyRound, badge: undefined },
  { id: 'settings', label: 'Settings', icon: Settings, badge: undefined },
];

export const AppSidebar: React.FC<AppSidebarProps> = ({
  currentRoute = 'dashboard',
  onNavigate,
  onSignOut,
  userEmail = 'developer@apitestpilot.com',
  userName = 'Developer',
  ...props
}) => {
  return (
    <Sidebar collapsible="icon" {...props}>
      {/* Brand Header (Logo Only — shrinks cleanly in collapsible="icon" mode) */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              onClick={() => onNavigate?.('dashboard')}
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-control border border-sidebar-border bg-secondary p-1.5 shadow-scalar-1 shrink-0">
                <Logo size={20} showWordmark={false} />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-display font-bold tracking-tight text-sidebar-foreground">
                  ApiTest<span className="gradient-text">Pilot</span>
                </span>
                <span className="truncate text-2xs font-mono text-sidebar-foreground/60">
                  v0.0.1-alpha
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Main Platform Workspace Navigation */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentRoute === item.id;
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      tooltip={item.label}
                      isActive={isActive}
                      onClick={() => onNavigate?.(item.id)}
                    >
                      <Icon className="size-4 shrink-0" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                    {item.badge && (
                      <SidebarMenuBadge className="rounded-control border border-sidebar-border bg-secondary px-1.5 py-0.5 text-2xs font-mono font-semibold uppercase text-secondary-foreground">
                        {item.badge}
                      </SidebarMenuBadge>
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Official shadcn SidebarFooter with NavUser dropdown */}
      <SidebarFooter>
        <NavUser
          userName={userName}
          userEmail={userEmail}
          onSignOut={onSignOut}
        />
      </SidebarFooter>

      {/* Interactive Sidebar Rail for collapsing/expanding */}
      <SidebarRail />
    </Sidebar>
  );
};
