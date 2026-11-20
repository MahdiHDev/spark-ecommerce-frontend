import { Suspense } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { DashboardBreadcrumbs } from "@/components/dashboard/DashboardBreadcrumbs";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";

export default function Page({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b">
                    <div className="flex items-center gap-2 px-3">
                        <SidebarTrigger />
                        <Separator
                            orientation="vertical"
                            className="mr-2 h-4"
                        />
                        <Suspense
                            fallback={
                                <div
                                    aria-hidden="true"
                                    className="h-5 w-28 animate-pulse rounded bg-muted"
                                />
                            }
                        >
                            <DashboardBreadcrumbs />
                        </Suspense>
                    </div>
                </header>
                {children}
            </SidebarInset>
        </SidebarProvider>
    );
}
