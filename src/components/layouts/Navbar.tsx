"use client";

import { Heart, Search, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CartDrawer } from "../common/CartDrawer";
import { Profilemodel } from "../navbar/Profilemodel";

export const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/products" },
    { name: "New Arrivals", href: "/products?sort=newest" },
    { name: "Collections", href: "/collections" },
    { name: "About", href: "/about" },
];

export function Navbar() {
    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full bg-primary text-white border-b border-gray-100">
            {/* First Row - Logo, Search & Actions */}
            <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-2 px-4 md:px-8">
                <div className="flex items-center gap-1">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="relative block h-11 w-32 shrink-0"
                    >
                        <Image
                            src="/images/logo.png"
                            alt="SPARK Men's Fashion"
                            fill
                            priority
                            className="object-contain object-left"
                        />
                    </Link>
                </div>
                {/* Search Bar - Desktop */}
                <div className="hidden max-w-xl flex-1 md:block">
                    <form
                        action="/search"
                        className=" p-0.5 flex h-11 w-full items-center overflow-hidden rounded-3xl bg-white"
                    >
                        <input
                            type="text"
                            name="q"
                            placeholder="Search for products..."
                            className="h-full flex-1 px-4 text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
                        />
                        <button
                            type="submit"
                            aria-label="Search products"
                            className="mx-0.5 flex h-full w-14 items-center justify-center bg-orange-500 text-white transition hover:bg-zinc-800 rounded-3xl cursor-pointer dueration-300"
                        >
                            <Search size={19} />
                        </button>
                    </form>
                </div>

                {/* Action Icons */}
                <div className="flex shrink-0 items-center gap-1">
                    <button
                        onClick={() => setIsCartOpen(true)}
                        aria-label="Open shopping cart"
                        className=" size-10 shrink-0 items-center justify-center p-0 text-white transition hover:text-zinc-300 hidden lg:flex"
                    >
                        <ShoppingBag size={21} />
                    </button>

                    <button
                        aria-label="Search"
                        className="flex lg:hidden size-10 shrink-0 items-center justify-center p-0 text-orange-500 hover:text-orange-600 transition "
                    >
                        <Search size={21} />
                    </button>

                    <button
                        aria-label="Wishlist"
                        className="flex size-10 shrink-0 items-center justify-center p-0 text-white transition hover:text-zinc-300"
                    >
                        <Heart size={21} />
                    </button>

                    <Profilemodel />
                </div>
            </div>

            {/* Second Row - Desktop Navigation */}
            <div className="hidden border-t border-white/10 lg:block bg-white">
                <nav className="mx-auto flex h-12 max-w-7xl items-center justify-center gap-10 px-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="relative text-sm font-medium text-primary/80 transition hover:text-primary after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-full after:-translate-x-1/2 after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 after:content-[''] hover:after:scale-x-100"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Mobile Search */}
            {/* <div className="px-4 pb-4 md:hidden">
                <form
                    action="/search"
                    className="p-0.5 flex h-10 w-full items-center overflow-hidden rounded-3xl bg-white"
                >
                    <input
                        type="text"
                        name="q"
                        placeholder="Search for products..."
                        className="h-full flex-1 px-3 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 hidden"
                    />
                    <button
                        type="submit"
                        aria-label="Search products"
                        className="flex h-full w-14 items-center justify-center bg-orange-500 text-white rounded-3xl"
                    >
                        <Search size={18} />
                    </button>
                </form>
            </div> */}

            {/* Mobile Navigation */}

            {/* Cart Drawer */}
            <CartDrawer
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
            />
        </header>
    );
}
