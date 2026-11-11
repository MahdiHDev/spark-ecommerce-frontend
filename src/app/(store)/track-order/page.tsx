"use client";

import {
    AlertCircle,
    ArrowLeft,
    CheckCircle2,
    Clock,
    MapPin,
    Package,
    Search,
    ShieldCheck,
    ShoppingBag,
    Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type OrderItem = {
    id: number | string;
    name: string;
    image: string;
    price: number;
    quantity: number;
    size?: string;
    color?: string;
};

type Order = {
    id: string | number;
    orderNumber: string;
    status: string;
    paymentMethod: string;
    paymentStatus: string;
    customerName: string;
    phone: string;
    address: string;
    city: string;
    items: OrderItem[];
    subtotal: number;
    deliveryFee: number;
    total: number;
    createdAt: string;
    updatedAt?: string;
};

const formatPrice = (price: number) => `৳ ${price.toLocaleString("en-BD")}`;

const trackingSteps = [
    {
        status: "confirmed",
        title: "Order Confirmed",
        description: "Your order has been successfully received.",
        icon: CheckCircle2,
    },
    {
        status: "processing",
        title: "Processing",
        description: "Your items are being prepared.",
        icon: Package,
    },
    {
        status: "shipped",
        title: "Shipped",
        description: "Your order is on its way.",
        icon: Truck,
    },
    {
        status: "delivered",
        title: "Delivered",
        description: "Your order has been delivered.",
        icon: CheckCircle2,
    },
];

const statusOrder = [
    "pending",
    "confirmed",
    "processing",
    "shipped",
    "delivered",
];

export default function TrackOrderPage() {
    const [orderNumber, setOrderNumber] = useState("");
    const [phone, setPhone] = useState("");
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleTrackOrder = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);
        setError("");
        setOrder(null);

        try {
            const response = await fetch("/api/orders/track", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    orderNumber: orderNumber.trim(),
                    phone: phone.trim(),
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Unable to find your order.");
            }

            setOrder(data.order);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Something went wrong. Please try again.",
            );
        } finally {
            setLoading(false);
        }
    };

    const currentStatus = order
        ? statusOrder.indexOf(order.status.toLowerCase())
        : -1;

    const isCancelled = order?.status.toLowerCase() === "cancelled";

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="border-b border-gray-200 bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
                    <Link href="/">
                        <Image
                            src="/images/logo.png"
                            alt="SPARK"
                            width={120}
                            height={38}
                            className="h-auto brightness-0"
                            priority
                        />
                    </Link>

                    <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-gray-500">
                        <ShieldCheck size={16} />
                        Order Tracking
                    </span>
                </div>
            </header>

            <div className="mx-auto max-w-4xl px-5 py-10 sm:py-14">
                {/* Page heading */}
                <div className="mb-9 text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
                        SPARK MENS FASHION
                    </p>

                    <h1 className="mt-3 text-3xl font-bold tracking-tight text-black sm:text-4xl">
                        Track Your Order
                    </h1>

                    <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
                        Enter your order number and phone number to see the
                        latest status of your purchase.
                    </p>
                </div>

                {/* Tracking form */}
                <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-8">
                    <div className="mb-6 flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100">
                            <Search size={20} />
                        </div>

                        <div>
                            <h2 className="font-bold">Find Your Order</h2>
                            <p className="text-xs text-gray-500">
                                Enter your order details below
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleTrackOrder} className="space-y-5">
                        <div>
                            <label
                                htmlFor="orderNumber"
                                className="mb-2 block text-sm font-medium"
                            >
                                Order Number
                            </label>

                            <input
                                id="orderNumber"
                                type="text"
                                required
                                value={orderNumber}
                                onChange={(e) => setOrderNumber(e.target.value)}
                                placeholder="e.g. SPK-2026-001"
                                className="h-12 w-full rounded-md border border-gray-300 px-4 text-sm outline-none transition focus:border-black"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="phone"
                                className="mb-2 block text-sm font-medium"
                            >
                                Phone Number
                            </label>

                            <input
                                id="phone"
                                type="tel"
                                required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="01XXXXXXXXX"
                                className="h-12 w-full rounded-md border border-gray-300 px-4 text-sm outline-none transition focus:border-black"
                            />
                        </div>

                        {error && (
                            <div
                                role="alert"
                                className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700"
                            >
                                <AlertCircle
                                    size={18}
                                    className="mt-0.5 shrink-0"
                                />
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex h-13 w-full items-center justify-center gap-2 rounded-md bg-black px-5 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? (
                                <>
                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                    Searching...
                                </>
                            ) : (
                                <>
                                    <Search size={18} />
                                    Track Order
                                </>
                            )}
                        </button>
                    </form>
                </section>

                {/* Order result */}
                {order && (
                    <div className="mt-7 space-y-6">
                        {/* Order overview */}
                        <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-7">
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-gray-500">
                                        Order Number
                                    </p>

                                    <h2 className="mt-2 text-xl font-bold">
                                        #{order.orderNumber}
                                    </h2>

                                    <p className="mt-2 text-xs text-gray-500">
                                        Placed on{" "}
                                        {new Date(
                                            order.createdAt,
                                        ).toLocaleDateString("en-BD", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        })}
                                    </p>
                                </div>

                                <span
                                    className={`rounded-full px-4 py-2 text-xs font-bold capitalize ${
                                        isCancelled
                                            ? "bg-red-50 text-red-700"
                                            : order.status === "delivered"
                                              ? "bg-green-50 text-green-700"
                                              : "bg-gray-100 text-gray-800"
                                    }`}
                                >
                                    {order.status.replaceAll("_", " ")}
                                </span>
                            </div>

                            {/* Progress */}
                            {isCancelled ? (
                                <div className="mt-7 rounded-lg border border-red-200 bg-red-50 p-4">
                                    <p className="font-semibold text-red-700">
                                        This order has been cancelled.
                                    </p>
                                    <p className="mt-1 text-sm text-red-600">
                                        Please contact our support team if you
                                        need assistance.
                                    </p>
                                </div>
                            ) : (
                                <div className="mt-9">
                                    <div className="relative">
                                        <div className="absolute left-[12.5%] right-[12.5%] top-5 h-0.5 bg-gray-200" />

                                        <div
                                            className="absolute left-[12.5%] top-5 h-0.5 bg-black transition-all duration-500"
                                            style={{
                                                width:
                                                    currentStatus <= 0
                                                        ? "0%"
                                                        : `${Math.min(currentStatus, 3) * 25}%`,
                                            }}
                                        />

                                        <div className="relative grid grid-cols-4 gap-1">
                                            {trackingSteps.map(
                                                (step, index) => {
                                                    const Icon = step.icon;
                                                    const completed =
                                                        currentStatus >= index;

                                                    return (
                                                        <div
                                                            key={step.status}
                                                            className="flex flex-col items-center text-center"
                                                        >
                                                            <div
                                                                className={`z-10 flex h-10 w-10 items-center justify-center rounded-full transition ${
                                                                    completed
                                                                        ? "bg-black text-white"
                                                                        : "border border-gray-200 bg-white text-gray-400"
                                                                }`}
                                                            >
                                                                <Icon
                                                                    size={18}
                                                                />
                                                            </div>

                                                            <p
                                                                className={`mt-3 text-[10px] font-bold sm:text-xs ${
                                                                    completed
                                                                        ? "text-black"
                                                                        : "text-gray-400"
                                                                }`}
                                                            >
                                                                {step.title}
                                                            </p>

                                                            <p className="mt-1 hidden max-w-[100px] text-[10px] leading-4 text-gray-400 sm:block">
                                                                {
                                                                    step.description
                                                                }
                                                            </p>
                                                        </div>
                                                    );
                                                },
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {order.updatedAt && (
                                <p className="mt-7 flex items-center gap-2 border-t border-gray-200 pt-4 text-xs text-gray-500">
                                    <Clock size={14} />
                                    Last updated:{" "}
                                    {new Date(order.updatedAt).toLocaleString(
                                        "en-BD",
                                    )}
                                </p>
                            )}
                        </section>

                        {/* Products */}
                        <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-7">
                            <h2 className="text-lg font-bold">Your Products</h2>

                            <div className="mt-5 space-y-5">
                                {order.items.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-md bg-gray-100">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                sizes="64px"
                                                className="object-cover"
                                            />
                                        </div>

                                        <div className="flex flex-1 items-center justify-between gap-3">
                                            <div>
                                                <h3 className="text-sm font-semibold">
                                                    {item.name}
                                                </h3>

                                                <p className="mt-1 text-xs text-gray-500">
                                                    {item.color || "Standard"}
                                                    {item.size
                                                        ? ` / ${item.size}`
                                                        : ""}
                                                </p>

                                                <p className="mt-1 text-xs text-gray-500">
                                                    Quantity: {item.quantity}
                                                </p>
                                            </div>

                                            <p className="whitespace-nowrap text-sm font-semibold">
                                                {formatPrice(
                                                    item.price * item.quantity,
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 space-y-3 border-t border-gray-200 pt-5">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">
                                        Subtotal
                                    </span>
                                    <span>{formatPrice(order.subtotal)}</span>
                                </div>

                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">
                                        Delivery Fee
                                    </span>
                                    <span>
                                        {formatPrice(order.deliveryFee)}
                                    </span>
                                </div>

                                <div className="flex justify-between border-t border-gray-200 pt-4">
                                    <span className="font-bold">Total</span>
                                    <span className="text-xl font-bold">
                                        {formatPrice(order.total)}
                                    </span>
                                </div>
                            </div>
                        </section>

                        {/* Delivery details */}
                        <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-7">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                                    <MapPin size={19} />
                                </div>

                                <h2 className="font-bold">
                                    Delivery Information
                                </h2>
                            </div>

                            <p className="mt-5 text-sm font-semibold">
                                {order.customerName}
                            </p>

                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                {order.address}
                                <br />
                                {order.city}
                            </p>

                            <p className="mt-2 text-sm text-gray-500">
                                {order.phone}
                            </p>
                        </section>

                        {/* Payment details */}
                        <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-7">
                            <h2 className="font-bold">Payment Information</h2>

                            <div className="mt-4 flex items-center justify-between gap-3 text-sm">
                                <span className="text-gray-500">
                                    Payment Method
                                </span>
                                <span className="font-semibold capitalize">
                                    {order.paymentMethod.replaceAll("_", " ")}
                                </span>
                            </div>

                            <div className="mt-3 flex items-center justify-between gap-3 text-sm">
                                <span className="text-gray-500">
                                    Payment Status
                                </span>
                                <span className="font-semibold capitalize">
                                    {order.paymentStatus.replaceAll("_", " ")}
                                </span>
                            </div>
                        </section>
                    </div>
                )}

                {/* Bottom links */}
                <div className="mt-8 flex flex-col items-center justify-center gap-4">
                    <Link
                        href="/products"
                        className="flex h-12 w-full max-w-sm items-center justify-center gap-2 rounded-md bg-black px-5 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-gray-800"
                    >
                        <ShoppingBag size={17} />
                        Continue Shopping
                    </Link>

                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-black"
                    >
                        <ArrowLeft size={15} />
                        Back to Home
                    </Link>
                </div>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Need help?{" "}
                    <Link
                        href="/contact"
                        className="font-semibold text-black underline underline-offset-4"
                    >
                        Contact SPARK Support
                    </Link>
                </p>
            </div>

            <footer className="border-t border-gray-200 bg-white py-6">
                <p className="text-center text-xs tracking-wide text-gray-500">
                    © {new Date().getFullYear()} SPARK MENS FASHION. ALL RIGHTS
                    RESERVED.
                </p>
            </footer>
        </main>
    );
}
