"use client";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

const segmentLabels: Record<string, string> = {
    dashboard: "Dashboard",
    categories: "Categories",
    create: "Create Category",
    edit: "Edit Category",
};

function formatSegment(segment: string): string {
    return (
        segmentLabels[segment] ??
        decodeURIComponent(segment)
            .replace(/[-_]/g, " ")
            .replace(/\b\w/g, (letter) => letter.toUpperCase())
    );
}

export function DashboardBreadcrumbs() {
    const pathname = usePathname();
    const segments = pathname.split("/").filter(Boolean);
    const dashboardIndex = segments.indexOf("dashboard");
    const visibleSegments = segments
        .map((segment, sourceIndex) => ({ segment, sourceIndex }))
        .slice(dashboardIndex >= 0 ? dashboardIndex : 0)
        .filter(
            ({ segment, sourceIndex }) =>
                segment === "categories" ||
                segments[sourceIndex + 1] !== "edit",
        );

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {visibleSegments.map(({ segment, sourceIndex }, index) => {
                    const href = `/${segments
                        .slice(0, sourceIndex + 1)
                        .join("/")}`;
                    const isCurrent = index === visibleSegments.length - 1;

                    return (
                        <Fragment key={href}>
                            {index > 0 && <BreadcrumbSeparator />}
                            <BreadcrumbItem>
                                {isCurrent ? (
                                    <BreadcrumbPage>
                                        {formatSegment(segment)}
                                    </BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink href={href}>
                                        {formatSegment(segment)}
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                        </Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
