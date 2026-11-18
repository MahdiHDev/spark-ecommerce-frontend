"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    KeyRound,
    LayoutDashboard,
    LogOut,
    Settings,
    UserRound,
} from "lucide-react";
import Link from "next/link";

export function Profilemodel() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                render={
                    <Button className="size-10 shrink-0 p-0 text-white transition hover:text-zinc-300">
                        <UserRound
                            className="size-5 shrink-0"
                            strokeWidth={2}
                        />
                    </Button>
                }
            />

            <DropdownMenuContent
                className="w-56 p-2 pt-6"
                align="end"
                side="bottom"
            >
                <DropdownMenuGroup>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuItem>
                        <Link
                            href={"/dashboard"}
                            className="flex gap-1 items-center"
                        >
                            <LayoutDashboard className="mr-2 size-4" />
                            Dashboard
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                        <UserRound className="mr-2 size-4" />
                        My Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Settings className="mr-2 size-4" />
                        Account Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <KeyRound className="mr-2 size-4" />
                        Change Password
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    <DropdownMenuItem className="text-destructive focus:text-destructive">
                        <LogOut className="mr-2 size-4" />
                        Log out
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
