"use client";

import { Menu, ShoppingBag, ShoppingBasket } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaHome } from "react-icons/fa";
import { CartDrawer } from "../common/CartDrawer";
import SideDrawer from "../navbar/SideDrawer";
import { navLinks } from "./Navbar";

const BottomTabNavigation = () => {
    const pathname = usePathname();

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const isHome = pathname === "/";
    const isSearch = pathname === "/products";

    return (
        <>
            <nav
                aria-label="Mobile navigation"
                className="fixed inset-x-0 bottom-0 z-50 border-t border-zinc-200 bg-white lg:hidden"
            >
                <div className="grid h-[72px] grid-cols-4 items-center px-2 pb-[env(safe-area-inset-bottom)]">
                    <Link
                        href="/"
                        className={`flex h-full flex-col items-center justify-center gap-1 text-[13px] font-medium ${
                            isHome ? "text-orange-500" : "text-zinc-950"
                        }`}
                    >
                        <FaHome size={21} strokeWidth={isHome ? 2 : 1.6} />
                        <span>Home</span>
                    </Link>

                    <Link
                        href="/products"
                        className={`flex h-full flex-col items-center justify-center gap-1 text-[13px] font-medium ${
                            isSearch ? "text-orange-500" : "text-zinc-950"
                        }`}
                    >
                        <ShoppingBasket
                            size={21}
                            strokeWidth={isSearch ? 2 : 1.6}
                        />
                        <span>Shop</span>
                    </Link>

                    <button
                        type="button"
                        onClick={() => setIsCartOpen(true)}
                        aria-label="Open shopping cart"
                        className="flex h-full flex-col items-center justify-center gap-1 text-[13px] font-medium text-zinc-950"
                    >
                        <ShoppingBag size={21} strokeWidth={1.6} />
                        <span>Cart</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setIsOpen(true)}
                        aria-label="Open shopping cart"
                        className="flex h-full flex-col items-center justify-center gap-1 text-[13px] font-medium text-zinc-950"
                    >
                        <Menu size={21} strokeWidth={1.6} />
                        <span>Cart</span>
                    </button>
                </div>
            </nav>

            <CartDrawer
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
            />

            <SideDrawer
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                navLinks={navLinks}
            />
        </>
    );
};

export default BottomTabNavigation;
