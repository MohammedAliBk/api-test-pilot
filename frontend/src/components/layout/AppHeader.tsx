import React from 'react';
import { ChevronRight } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';

export interface AppHeaderProps {
  title?: string;
}

const routeTitles: Record<string, string> = {
  dashboard: 'Overview',
  specs: 'OpenAPI Specs',
  runs: 'Test Matrix',
  recovery: 'AI Recovery',
  secrets: 'Secrets & Keys',
  settings: 'Settings',
};

export const AppHeader: React.FC<AppHeaderProps> = ({
  title = 'dashboard',
}) => {
  const displayTitle = routeTitles[title] || title;

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background/85 px-4 backdrop-blur-md transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <nav aria-label="breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground sm:gap-2">
            <li className="hidden md:inline-flex items-center gap-1.5">
              <span className="transition-colors hover:text-foreground">
                Platform Workspace
              </span>
            </li>
            <li
              role="presentation"
              aria-hidden="true"
              className="hidden md:inline-flex"
            >
              <ChevronRight className="size-3.5 shrink-0" />
            </li>
            <li className="inline-flex items-center gap-1.5">
              <span
                role="link"
                aria-disabled="true"
                aria-current="page"
                className="font-semibold text-foreground"
              >
                {displayTitle}
              </span>
            </li>
          </ol>
        </nav>
      </div>
    </header>
  );
};
