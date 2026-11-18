import Link from "next/link";
import { ShoppingBag, X } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

export interface SideDrawerLink {
    name: string;
    href: string;
}

interface SideDrawerProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    navLinks: SideDrawerLink[];
    cartHref?: string;
    cartLabel?: string;
    brandLabel?: string;
}

export default function SideDrawer({
    isOpen,
    setIsOpen,
    navLinks,
    cartHref = "/cart",
    cartLabel = "View Shopping Bag",
    brandLabel = "SPARK Men's Fashion",
}: SideDrawerProps) {
    const closeDrawer = () => setIsOpen(false);

    return (
        <div
            className={`fixed inset-0 z-[100] lg:hidden ${
                isOpen ? "visible" : "invisible pointer-events-none"
            }`}
        >
            {/* Overlay */}
            <button
                type="button"
                aria-label="Close menu overlay"
                onClick={closeDrawer}
                className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
                    isOpen ? "opacity-100" : "opacity-0"
                }`}
            />

            {/* Drawer */}
            <aside
                role="dialog"
                aria-modal="true"
                aria-label="Mobile navigation"
                className={`absolute right-0 top-0 flex h-full w-[85%] max-w-sm flex-col bg-primary shadow-2xl transition-transform duration-300 ease-in-out ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                {/* Drawer Header */}
                <div className="flex h-[76px] items-center justify-end border-b border-white/10 px-5">
                    <button
                        type="button"
                        onClick={closeDrawer}
                        aria-label="Close menu"
                        className="rounded-full p-2 text-white transition hover:bg-white/10"
                    >
                        <X size={23} />
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col px-5 py-6" aria-label="Mobile menu">
                    <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                        Menu
                    </p>

                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={closeDrawer}
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
                        href={cartHref}
                        onClick={closeDrawer}
                        className="flex items-center justify-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
                    >
                        <ShoppingBag size={18} />
                        {cartLabel}
                    </Link>

                    <p className="mt-5 text-center text-xs text-white/40">
                        {brandLabel}
                    </p>
                </div>
            </aside>
        </div>
    );
}
