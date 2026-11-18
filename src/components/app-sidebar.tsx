"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";
import {
    BoxIcon,
    CarTaxiFront,
    Home,
    Settings2Icon,
    Users2,
} from "lucide-react";
import Image from "next/image";

// This is sample data.
const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },

    navMain: [
        {
            title: "Catelog",
            url: "#",
            icon: <BoxIcon />,
            isActive: true,
            items: [
                {
                    title: "Products",
                    url: "#",
                },
                {
                    title: "Categories",
                    url: "#",
                },
                {
                    title: "Brands",
                    url: "#",
                },
                {
                    title: "Collections",
                    url: "#",
                },
            ],
        },
        {
            title: "Orders",
            url: "#",
            icon: <CarTaxiFront />,
            items: [
                {
                    title: "All Orders",
                    url: "#",
                },
            ],
        },
        {
            title: "Customers",
            url: "#",
            icon: <Users2 />,
            // items: [],
        },
        {
            title: "Settings",
            url: "#",
            icon: <Settings2Icon />,
            items: [
                {
                    title: "General",
                    url: "#",
                },
            ],
        },
        {
            title: "Homepage",
            url: "/",
            icon: <Home />,
            // items: [],
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader className="flex items-center justify-center">
                <Image
                    src="/images/logo.png"
                    alt="Spark Ecommerce logo"
                    width={120}
                    height={40}
                    className="brightness-0"
                />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
