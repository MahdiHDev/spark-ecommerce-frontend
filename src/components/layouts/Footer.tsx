import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BsInstagram } from "react-icons/bs";
import { FaFacebookF, FaTiktok } from "react-icons/fa";
import { CurrentYear } from "../common/CurrentYear";

const shopLinks = [
    { name: "All Products", href: "/products" },
    { name: "New Arrivals", href: "/products?sort=newest" },
    { name: "Collections", href: "/collections" },
    { name: "Best Sellers", href: "/products?sort=best-selling" },
];

const supportLinks = [
    { name: "My Account", href: "/account" },
    { name: "Shopping Cart", href: "/cart" },
    { name: "Shipping Policy", href: "/shipping-policy" },
    { name: "Return & Exchange", href: "/return-policy" },
    { name: "Contact Us", href: "/contact" },
    { name: "terms & Conditions", href: "/terms-and-conditions" },
    { name: "Privacy Policy", href: "/privacy-policy" },
];

export function Footer() {
    return (
        <footer className="bg-primary text-white">
            {/* Main Footer */}
            <div className="mx-auto max-w-7xl px-4 py-14 md:px-8">
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Brand Information */}
                    <div>
                        <Link href="/" className="relative block h-12 w-36">
                            <Image
                                src="/images/logo.png"
                                alt="SPARK Men's Fashion"
                                fill
                                className="object-contain object-left"
                            />
                        </Link>

                        <p className="mt-5 max-w-xs text-sm leading-7 text-white/50">
                            Discover your style with SPARK. We bring you modern
                            fashion, timeless essentials, and quality pieces
                            designed for everyday confidence.
                        </p>

                        {/* Social Media */}
                        <div className="mt-6 flex items-center gap-3">
                            <Link
                                href="https://facebook.com"
                                target="_blank"
                                aria-label="Facebook"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-orange-500 hover:bg-orange-500 hover:text-white"
                            >
                                <FaFacebookF size={18} />
                            </Link>
                            <Link
                                href="https://instagram.com"
                                target="_blank"
                                aria-label="Instagram"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-orange-500 hover:bg-orange-500 hover:text-white"
                            >
                                <BsInstagram size={18} />
                            </Link>{" "}
                            <Link
                                href="https://instagram.com"
                                target="_blank"
                                aria-label="Instagram"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-orange-500 hover:bg-orange-500 hover:text-white"
                            >
                                <FaTiktok size={18} />
                            </Link>
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider">
                            Shop
                        </h3>

                        <ul className="space-y-4">
                            {shopLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="inline-block text-sm text-white/50 transition-all duration-200 ease-in hover:pl-1 hover:text-orange-500"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Customer Support */}
                    <div>
                        <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider">
                            Customer Service
                        </h3>

                        <ul className="space-y-4">
                            {supportLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-white/50 ease-in transition-all duration-100 hover:pl-1 hover:text-orange-500"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Information */}
                    <div>
                        <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider">
                            Get in Touch
                        </h3>

                        <ul className="space-y-5">
                            <li className="flex items-start gap-3">
                                <MapPin
                                    size={18}
                                    className="mt-0.5 shrink-0 text-orange-500"
                                />
                                <span className="text-sm leading-6 text-white/50">
                                    Sylhet, Bangladesh
                                </span>
                            </li>

                            <li className="flex items-center gap-3">
                                <Phone
                                    size={18}
                                    className="shrink-0 text-orange-500"
                                />
                                <Link
                                    href="tel:+8801XXXXXXXXX"
                                    className="text-sm text-white/50 transition hover:text-orange-500"
                                >
                                    +880 1XXXXXXXXX
                                </Link>
                            </li>

                            <li className="flex items-center gap-3">
                                <Mail
                                    size={18}
                                    className="shrink-0 text-orange-500"
                                />
                                <Link
                                    href="mailto:support@spark.com"
                                    className="break-all text-sm text-white/50 transition hover:text-orange-500"
                                >
                                    support@spark.com
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-white/10">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-center md:flex-row md:px-8">
                    <p className="text-xs text-white/40">
                        © <CurrentYear /> SPARK Men&apos;s Fashion. All rights
                        reserved.
                    </p>

                    <p className="text-xs text-white/40">
                        Developed by{" "}
                        <Link
                            href="https://mahdihussain.vercel.app/"
                            target="_blank"
                            className="text-white/60 hover:underline"
                        >
                            Mahdi Hussain
                        </Link>
                    </p>
                </div>
            </div>
        </footer>
    );
}
