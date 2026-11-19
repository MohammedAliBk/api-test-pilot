import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { AppHeader } from './AppHeader';

export interface AppShellProps {
  children: React.ReactNode;
  currentRoute?: string;
  onNavigate?: (route: string) => void;
  onSignOut?: () => void;
  userEmail?: string;
  userName?: string;
}

export const AppShell: React.FC<AppShellProps> = ({
  children,
  currentRoute = 'dashboard',
  onNavigate,
  onSignOut,
  userEmail,
  userName,
}) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar
        currentRoute={currentRoute}
        onNavigate={onNavigate}
        onSignOut={onSignOut}
        userEmail={userEmail}
        userName={userName}
      />
      <SidebarInset className="flex flex-col min-h-screen w-full bg-background overflow-x-hidden">
        <AppHeader title={currentRoute} />
        <div className="flex flex-1 flex-col p-4 pt-0">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
