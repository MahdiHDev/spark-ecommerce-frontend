"use client";

import {
    ArrowRight,
    Check,
    CheckCircle2,
    CreditCard,
    MapPin,
    Package,
    ShieldCheck,
    ShoppingBag,
    Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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
    email: string;
    phone: string;
    address: string;
    city: string;
    items: OrderItem[];
    subtotal: number;
    deliveryFee: number;
    total: number;
    createdAt: string;
};

const formatPrice = (price: number) => `৳ ${price.toLocaleString("en-BD")}`;

export default function OrderSuccessPage() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("orderId");

    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!orderId) {
            // setError("No order reference was provided.");
            // setLoading(false);
            return;
        }

        const fetchOrder = async () => {
            try {
                const response = await fetch(
                    `/api/orders/${encodeURIComponent(orderId)}`,
                    { cache: "no-store" },
                );

                if (!response.ok) {
                    throw new Error("Unable to retrieve your order.");
                }

                const data = await response.json();

                setOrder(data.order);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Something went wrong.",
                );
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId]);

    if (loading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-gray-50 px-5">
                <div className="text-center">
                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-black" />
                    <p className="mt-4 text-sm text-gray-500">
                        Loading your order...
                    </p>
                </div>
            </main>
        );
    }

    if (error || !order) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-gray-50 px-5">
                <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 text-center">
                    <Package size={36} className="mx-auto text-gray-400" />
                    <h1 className="mt-5 text-xl font-bold">Order not found</h1>
                    <p className="mt-2 text-sm text-gray-500">
                        {error || "We couldn't find your order details."}
                    </p>
                    <Link
                        href="/"
                        className="mt-6 inline-flex h-12 items-center justify-center rounded-md bg-black px-7 text-sm font-semibold text-white hover:bg-gray-800"
                    >
                        Back to Home
                    </Link>
                </div>
            </main>
        );
    }

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
                        Secure Shopping
                    </span>
                </div>
            </header>

            <div className="mx-auto max-w-4xl px-5 py-10 sm:py-14">
                {/* Success message */}
                <section className="text-center">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-black text-white">
                        <Check size={38} strokeWidth={2.5} />
                    </div>

                    <p className="mt-7 text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
                        SPARK MENS FASHION
                    </p>

                    <h1 className="mt-3 text-3xl font-bold tracking-tight text-black sm:text-4xl">
                        Thank You for Your Order!
                    </h1>

                    <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
                        Your order has been received successfully. We appreciate
                        your trust in SPARK.
                    </p>

                    <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm">
                        <CheckCircle2 size={17} />
                        Order #{order.orderNumber}
                    </div>
                </section>

                {/* Order status */}
                <section className="mt-10 rounded-xl border border-gray-200 bg-white p-5 sm:p-7">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <p className="text-xs uppercase tracking-wider text-gray-500">
                                Order Status
                            </p>
                            <h2 className="mt-2 text-lg font-bold capitalize">
                                {order.status}
                            </h2>
                        </div>

                        <span className="rounded-full bg-gray-100 px-4 py-2 text-xs font-semibold capitalize">
                            {order.status}
                        </span>
                    </div>

                    <div className="mt-6 grid grid-cols-3 gap-2">
                        <div className="text-center">
                            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
                                <Check size={18} />
                            </div>
                            <p className="mt-2 text-xs font-semibold">
                                Confirmed
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                                <Package size={18} />
                            </div>
                            <p className="mt-2 text-xs text-gray-500">
                                Processing
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                                <Truck size={18} />
                            </div>
                            <p className="mt-2 text-xs text-gray-500">
                                Delivered
                            </p>
                        </div>
                    </div>
                </section>

                {/* Order items */}
                <section className="mt-6 rounded-xl border border-gray-200 bg-white p-5 sm:p-7">
                    <h2 className="text-lg font-bold">Order Details</h2>

                    <p className="mt-1 text-xs text-gray-500">
                        {order.items.length} products in your order
                    </p>

                    <div className="my-6 space-y-5">
                        {order.items.map((item) => (
                            <div key={item.id} className="flex gap-4">
                                <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        sizes="80px"
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
                                            {item.size ? ` / ${item.size}` : ""}
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

                    {/* Price summary */}
                    <div className="space-y-3 border-t border-gray-200 pt-5">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Subtotal</span>
                            <span>{formatPrice(order.subtotal)}</span>
                        </div>

                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Delivery Fee</span>
                            <span>{formatPrice(order.deliveryFee)}</span>
                        </div>

                        <div className="flex justify-between border-t border-gray-200 pt-4">
                            <span className="font-bold">Total Paid / Due</span>
                            <span className="text-xl font-bold">
                                {formatPrice(order.total)}
                            </span>
                        </div>
                    </div>
                </section>

                {/* Customer and payment information */}
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                    <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
                        <div className="flex items-center gap-2">
                            <MapPin size={19} />
                            <h2 className="font-bold">Delivery Address</h2>
                        </div>

                        <p className="mt-5 text-sm font-semibold">
                            {order.customerName}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-gray-500">
                            {order.address}
                            <br />
                            {order.city}
                        </p>
                        <p className="mt-3 text-sm text-gray-500">
                            {order.phone}
                        </p>
                        <p className="mt-1 break-all text-sm text-gray-500">
                            {order.email}
                        </p>
                    </section>

                    <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
                        <div className="flex items-center gap-2">
                            <CreditCard size={19} />
                            <h2 className="font-bold">Payment Information</h2>
                        </div>

                        <p className="mt-5 text-xs text-gray-500">
                            Payment Method
                        </p>
                        <p className="mt-1 text-sm font-semibold capitalize">
                            {order.paymentMethod.replaceAll("_", " ")}
                        </p>

                        <p className="mt-4 text-xs text-gray-500">
                            Payment Status
                        </p>
                        <p className="mt-1 text-sm font-semibold capitalize">
                            {order.paymentStatus.replaceAll("_", " ")}
                        </p>

                        <p className="mt-4 text-xs text-gray-500">Order Date</p>
                        <p className="mt-1 text-sm font-semibold">
                            {new Date(order.createdAt).toLocaleDateString(
                                "en-BD",
                                {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                },
                            )}
                        </p>
                    </section>
                </div>

                {/* Actions */}
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    <Link
                        href={`/track-order?orderId=${encodeURIComponent(String(order.id))}`}
                        className="flex h-14 items-center justify-center gap-2 rounded-md bg-black px-5 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-gray-800"
                    >
                        Track Your Order
                        <ArrowRight size={18} />
                    </Link>

                    <Link
                        href="/products"
                        className="flex h-14 items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-5 text-sm font-bold uppercase tracking-wider text-black transition hover:bg-gray-100"
                    >
                        <ShoppingBag size={18} />
                        Continue Shopping
                    </Link>
                </div>

                <p className="mt-8 text-center text-sm text-gray-500">
                    Need help with your order?{" "}
                    <Link
                        href="/contact"
                        className="font-semibold text-black underline underline-offset-4"
                    >
                        Contact Us
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
