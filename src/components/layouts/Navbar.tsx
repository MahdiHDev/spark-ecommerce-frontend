"use client";

import { Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CartDrawer } from "../common/CartDrawer";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/products" },
    { name: "New Arrivals", href: "/products?sort=newest" },
    { name: "Collections", href: "/collections" },
    { name: "About", href: "/about" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
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
                <div className="flex shrink-0 items-center gap-4 md:gap-6">
                    <button
                        onClick={() => setIsCartOpen(true)}
                        aria-label="Open shopping cart"
                        className="text-white transition hover:text-zinc-300"
                    >
                        <ShoppingBag size={21} />
                    </button>{" "}
                    <Link
                        href="/profile"
                        aria-label="profile"
                        className="text-white transition hover:text-zinc-300 hidden lg:block"
                    >
                        <UserRound size={21} />
                    </Link>{" "}
                    {/* Mobile Menu */}
                    <button
                        onClick={() => setIsOpen(true)}
                        aria-label="Open menu"
                        aria-expanded={isOpen}
                        className="text-white lg:hidden"
                    >
                        <Menu size={23} />
                    </button>
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
            <div className="px-4 pb-4 md:hidden">
                <form
                    action="/search"
                    className="p-0.5 flex h-10 w-full items-center overflow-hidden rounded-3xl bg-white"
                >
                    <input
                        type="text"
                        name="q"
                        placeholder="Search for products..."
                        className="h-full flex-1 px-3 text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
                    />
                    <button
                        type="submit"
                        aria-label="Search products"
                        className="flex h-full w-14 items-center justify-center bg-orange-500 text-white rounded-3xl"
                    >
                        <Search size={18} />
                    </button>
                </form>
            </div>

            {/* Mobile Navigation */}

            {/* Mobile Side Drawer */}
            <div
                className={`fixed inset-0 z-[100] lg:hidden ${
                    isOpen ? "visible" : "invisible pointer-events-none"
                }`}
            >
                {/* Overlay */}
                <div
                    onClick={() => setIsOpen(false)}
                    className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
                        isOpen ? "opacity-100" : "opacity-0"
                    }`}
                />

                {/* Drawer */}
                <aside
                    className={`absolute right-0 top-0 flex h-full w-[85%] max-w-sm flex-col bg-primary shadow-2xl transition-transform duration-300 ease-in-out ${
                        isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                >
                    {/* Drawer Header */}
                    <div className="flex h-[76px] items-center justify-end border-b border-white/10 px-5">
                        <button
                            onClick={() => setIsOpen(false)}
                            aria-label="Close menu"
                            className="rounded-full p-2 text-white transition hover:bg-white/10"
                        >
                            <X size={23} />
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex flex-col px-5 py-6">
                        <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                            Menu
                        </p>

                        {navLinks.map((link, index) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="group flex items-center justify-between border-b border-white/10 px-3 py-4 text-sm font-medium text-white/80 transition-all duration-300 hover:pl-5 hover:text-white"
                            >
                                {link.name}

                                <span className="text-white/30 transition group-hover:text-white">
                                    →
                                </span>
                            </Link>
                        ))}
                    </nav>

                    {/* Bottom Section */}
                    <div className="mt-auto border-t border-white/10 p-6">
                        <Link
                            href="/cart"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
                        >
                            <ShoppingBag size={18} />
                            View Shopping Bag
                        </Link>

                        <p className="mt-5 text-center text-xs text-white/40">
                            SPARK Men&apos;s Fashion
                        </p>
                    </div>
                </aside>
            </div>
            {/* End of Mobile Side Drawer */}

            {/* Cart Drawer */}
            <CartDrawer
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
            />
        </header>
    );
}
