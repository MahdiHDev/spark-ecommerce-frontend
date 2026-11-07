"use client";

import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type CartItem = {
    id: string;
    name: string;
    image: string;
    price: number;
    size: string;
    color: string;
    quantity: number;
};

type CartDrawerProps = {
    isOpen: boolean;
    onClose: () => void;
};

const initialCart: CartItem[] = [
    {
        id: "1",
        name: "Premium Oversized T-Shirt",
        image: "/images/products/product-1.jpg",
        price: 1290,
        size: "L",
        color: "Black",
        quantity: 1,
    },
    {
        id: "2",
        name: "Classic Casual Shirt",
        image: "/images/products/product-2.jpg",
        price: 1890,
        size: "M",
        color: "White",
        quantity: 1,
    },
];

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
    const [cartItems, setCartItems] = useState<CartItem[]>(initialCart);

    const subtotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
    );

    const updateQuantity = (id: string, amount: number) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + amount) }
                    : item,
            ),
        );
    };

    const removeItem = (id: string) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <div
            className={`fixed inset-0 z-[100] ${
                isOpen ? "visible" : "invisible pointer-events-none"
            }`}
        >
            {/* Overlay */}
            <div
                onClick={onClose}
                className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
                    isOpen ? "opacity-100" : "opacity-0"
                }`}
            />

            {/* Cart Drawer */}
            <aside
                className={`absolute right-0 top-0 flex h-full w-[90%] max-w-md flex-col bg-white text-zinc-900 shadow-2xl transition-transform duration-300 ease-in-out ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                {/* Header */}
                <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-zinc-200 px-6">
                    <div className="flex items-center gap-2">
                        <ShoppingBag size={21} />

                        <h2 className="text-lg font-semibold">Shopping Bag</h2>

                        <span className="text-sm text-zinc-400">
                            ({cartItems.length} items)
                        </span>
                    </div>

                    <button
                        onClick={onClose}
                        aria-label="Close cart"
                        className="rounded-full p-2 transition hover:bg-zinc-100"
                    >
                        <X size={22} />
                    </button>
                </div>

                {/* Cart Content */}
                <div className="flex-1 overflow-y-auto px-6 py-5">
                    {cartItems.length === 0 ? (
                        <div className="flex h-full flex-col items-center justify-center text-center">
                            <ShoppingBag
                                size={48}
                                strokeWidth={1}
                                className="text-zinc-300"
                            />

                            <h3 className="mt-5 text-lg font-semibold">
                                Your bag is empty
                            </h3>

                            <p className="mt-2 text-sm text-zinc-500">
                                Looks like you haven&apos;t added anything yet.
                            </p>

                            <Link
                                href="/products"
                                onClick={onClose}
                                className="mt-6 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex gap-4 border-b border-zinc-100 pb-6"
                                >
                                    {/* Product Image */}
                                    <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-md bg-zinc-100">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            sizes="96px"
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex min-w-0 flex-1 flex-col">
                                        <div className="flex justify-between gap-2">
                                            <h3 className="text-sm font-semibold leading-5">
                                                {item.name}
                                            </h3>

                                            <button
                                                onClick={() =>
                                                    removeItem(item.id)
                                                }
                                                aria-label="Remove product"
                                                className="h-fit text-zinc-400 transition hover:text-red-500"
                                            >
                                                <Trash2 size={17} />
                                            </button>
                                        </div>

                                        <p className="mt-2 text-xs text-zinc-500">
                                            Size: {item.size} / Color:{" "}
                                            {item.color}
                                        </p>

                                        <p className="mt-2 text-sm font-semibold">
                                            ৳
                                            {item.price.toLocaleString("en-BD")}
                                        </p>

                                        {/* Quantity */}
                                        <div className="mt-auto flex items-center justify-between pt-3">
                                            <div className="flex items-center rounded-full border border-zinc-200">
                                                <button
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.id,
                                                            -1,
                                                        )
                                                    }
                                                    aria-label="Decrease quantity"
                                                    className="p-2 transition hover:text-orange-500"
                                                >
                                                    <Minus size={13} />
                                                </button>

                                                <span className="min-w-6 text-center text-xs font-medium">
                                                    {item.quantity}
                                                </span>

                                                <button
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.id,
                                                            1,
                                                        )
                                                    }
                                                    aria-label="Increase quantity"
                                                    className="p-2 transition hover:text-orange-500"
                                                >
                                                    <Plus size={13} />
                                                </button>
                                            </div>

                                            <span className="text-sm font-semibold">
                                                ৳
                                                {(
                                                    item.price * item.quantity
                                                ).toLocaleString("en-BD")}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {cartItems.length > 0 && (
                    <div className="shrink-0 border-t border-zinc-200 bg-white px-6 py-5">
                        <div className="flex justify-between text-sm">
                            <span className="text-zinc-500">Subtotal</span>

                            <span className="font-semibold">
                                ৳{subtotal.toLocaleString("en-BD")}
                            </span>
                        </div>

                        <p className="mt-2 text-xs text-zinc-400">
                            Shipping and taxes calculated at checkout.
                        </p>

                        <Link
                            href="/checkout"
                            onClick={onClose}
                            className="mt-5 flex h-12 items-center justify-center rounded-full bg-orange-500 text-sm font-semibold text-white transition hover:bg-orange-600"
                        >
                            Proceed to Checkout
                        </Link>

                        <button
                            onClick={onClose}
                            className="mt-3 w-full text-center text-sm font-medium text-zinc-500 transition hover:text-black"
                        >
                            Continue Shopping
                        </button>
                    </div>
                )}
            </aside>
        </div>
    );
}
