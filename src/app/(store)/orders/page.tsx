"use client";

import {
    AlertCircle,
    ArrowRight,
    CheckCircle2,
    ChevronRight,
    Clock,
    Package,
    RefreshCw,
    Search,
    ShieldCheck,
    ShoppingBag,
    Truck,
    XCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type OrderItem = {
    id: string | number;
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
    paymentStatus: string;
    paymentMethod: string;
    items: OrderItem[];
    subtotal: number;
    deliveryFee: number;
    total: number;
    createdAt: string;
};

const formatPrice = (price: number) => `৳ ${price.toLocaleString("en-BD")}`;

const statusStyles: Record<string, string> = {
    pending: "bg-yellow-50 text-yellow-700",
    confirmed: "bg-blue-50 text-blue-700",
    processing: "bg-purple-50 text-purple-700",
    shipped: "bg-indigo-50 text-indigo-700",
    delivered: "bg-green-50 text-green-700",
    cancelled: "bg-red-50 text-red-700",
};

function StatusIcon({ status }: { status: string }) {
    const iconClass = "h-4 w-4";

    switch (status.toLowerCase()) {
        case "delivered":
            return <CheckCircle2 className={iconClass} />;
        case "shipped":
            return <Truck className={iconClass} />;
        case "cancelled":
            return <XCircle className={iconClass} />;
        case "processing":
            return <RefreshCw className={iconClass} />;
        default:
            return <Clock className={iconClass} />;
    }
}

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [activeFilter, setActiveFilter] = useState("all");
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch("/api/orders/my-orders", {
                    cache: "no-store",
                });

                if (!response.ok) {
                    if (response.status === 401) {
                        throw new Error("Please log in to view your orders.");
                    }

                    throw new Error("Unable to load your orders.");
                }

                const data = await response.json();
                setOrders(data.orders || []);
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

        fetchOrders();
    }, []);

    const filters = [
        { label: "All Orders", value: "all" },
        { label: "Processing", value: "processing" },
        { label: "Shipped", value: "shipped" },
        { label: "Delivered", value: "delivered" },
        { label: "Cancelled", value: "cancelled" },
    ];

    const filteredOrders = orders.filter((order) => {
        const matchesFilter =
            activeFilter === "all" ||
            order.status.toLowerCase() === activeFilter;

        const matchesSearch = order.orderNumber
            .toLowerCase()
            .includes(search.toLowerCase());

        return matchesFilter && matchesSearch;
    });

    const totalSpent = orders
        .filter((order) => order.paymentStatus.toLowerCase() === "paid")
        .reduce((total, order) => total + order.total, 0);

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

                    <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-gray-500">
                        <ShieldCheck size={16} />
                        My Account
                    </div>
                </div>
            </header>

            <div className="mx-auto max-w-7xl px-5 py-10 sm:py-14">
                {/* Breadcrumb */}
                <div className="mb-8 flex items-center gap-2 text-sm text-gray-500">
                    <Link href="/" className="hover:text-black">
                        Home
                    </Link>
                    <ChevronRight size={15} />
                    <span className="font-medium text-black">My Orders</span>
                </div>

                {/* Heading */}
                <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
                            SPARK MENS FASHION
                        </p>

                        <h1 className="mt-3 text-3xl font-bold tracking-tight text-black sm:text-4xl">
                            My Orders
                        </h1>

                        <p className="mt-2 text-sm text-gray-500">
                            View and manage your purchases.
                        </p>
                    </div>

                    <Link
                        href="/products"
                        className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-black px-6 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-gray-800"
                    >
                        <ShoppingBag size={17} />
                        Shop Now
                    </Link>
                </div>

                {/* Summary cards */}
                <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                            <Package size={19} />
                        </div>
                        <p className="mt-4 text-2xl font-bold">
                            {orders.length}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                            Total Orders
                        </p>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                            <RefreshCw size={19} />
                        </div>
                        <p className="mt-4 text-2xl font-bold">
                            {
                                orders.filter((o) =>
                                    [
                                        "pending",
                                        "confirmed",
                                        "processing",
                                    ].includes(o.status.toLowerCase()),
                                ).length
                            }
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                            In Progress
                        </p>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                            <CheckCircle2 size={19} />
                        </div>
                        <p className="mt-4 text-2xl font-bold">
                            {
                                orders.filter(
                                    (o) =>
                                        o.status.toLowerCase() === "delivered",
                                ).length
                            }
                        </p>
                        <p className="mt-1 text-xs text-gray-500">Delivered</p>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                            <ShoppingBag size={19} />
                        </div>
                        <p className="mt-4 text-2xl font-bold">
                            {formatPrice(totalSpent)}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">Total Paid</p>
                    </div>
                </div>

                {/* Filters and search */}
                <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex gap-2 overflow-x-auto pb-1">
                            {filters.map((filter) => (
                                <button
                                    key={filter.value}
                                    onClick={() =>
                                        setActiveFilter(filter.value)
                                    }
                                    className={`whitespace-nowrap rounded-md px-4 py-2.5 text-xs font-semibold transition ${
                                        activeFilter === filter.value
                                            ? "bg-black text-white"
                                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                                >
                                    {filter.label}
                                </button>
                            ))}
                        </div>

                        <div className="relative w-full lg:max-w-xs">
                            <Search
                                size={17}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search order number..."
                                className="h-11 w-full rounded-md border border-gray-200 pl-11 pr-4 text-sm outline-none transition focus:border-black"
                            />
                        </div>
                    </div>
                </section>

                {/* Orders list */}
                <div className="mt-6 space-y-5">
                    {loading ? (
                        <div className="rounded-xl border border-gray-200 bg-white py-20 text-center">
                            <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-gray-200 border-t-black" />
                            <p className="mt-4 text-sm text-gray-500">
                                Loading your orders...
                            </p>
                        </div>
                    ) : error ? (
                        <div className="rounded-xl border border-gray-200 bg-white px-5 py-16 text-center">
                            <AlertCircle
                                size={35}
                                className="mx-auto text-gray-400"
                            />
                            <h2 className="mt-4 text-lg font-bold">
                                Unable to load orders
                            </h2>
                            <p className="mt-2 text-sm text-gray-500">
                                {error}
                            </p>
                            <Link
                                href="/login"
                                className="mt-6 inline-flex h-11 items-center rounded-md bg-black px-6 text-sm font-semibold text-white"
                            >
                                Log In
                            </Link>
                        </div>
                    ) : filteredOrders.length === 0 ? (
                        <div className="rounded-xl border border-gray-200 bg-white px-5 py-16 text-center">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                                <Package size={28} className="text-gray-500" />
                            </div>

                            <h2 className="mt-5 text-xl font-bold">
                                {orders.length === 0
                                    ? "No Orders Yet"
                                    : "No Orders Found"}
                            </h2>

                            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                                {orders.length === 0
                                    ? "You haven't placed any orders yet. Explore our collection and find your style."
                                    : "Try another filter or search for a different order number."}
                            </p>

                            {orders.length === 0 && (
                                <Link
                                    href="/products"
                                    className="mt-6 inline-flex h-12 items-center gap-2 rounded-md bg-black px-7 text-sm font-bold uppercase tracking-wider text-white hover:bg-gray-800"
                                >
                                    Explore Products
                                    <ArrowRight size={17} />
                                </Link>
                            )}
                        </div>
                    ) : (
                        filteredOrders.map((order) => (
                            <article
                                key={order.id}
                                className="overflow-hidden rounded-xl border border-gray-200 bg-white"
                            >
                                {/* Order header */}
                                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 p-5 sm:px-7">
                                    <div className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3">
                                        <div>
                                            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                                                Order Number
                                            </p>
                                            <p className="mt-1 text-sm font-bold">
                                                #{order.orderNumber}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                                                Order Date
                                            </p>
                                            <p className="mt-1 text-sm font-medium">
                                                {new Date(
                                                    order.createdAt,
                                                ).toLocaleDateString("en-BD", {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                                                Total Amount
                                            </p>
                                            <p className="mt-1 text-sm font-bold">
                                                {formatPrice(order.total)}
                                            </p>
                                        </div>
                                    </div>

                                    <span
                                        className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-bold capitalize ${
                                            statusStyles[
                                                order.status.toLowerCase()
                                            ] || "bg-gray-100 text-gray-700"
                                        }`}
                                    >
                                        <StatusIcon status={order.status} />
                                        {order.status.replaceAll("_", " ")}
                                    </span>
                                </div>

                                {/* Order products */}
                                <div className="space-y-4 p-5 sm:px-7">
                                    {order.items.slice(0, 2).map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center gap-4"
                                        >
                                            <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-md bg-gray-100">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    sizes="64px"
                                                    className="object-cover"
                                                />
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <h3 className="text-sm font-semibold text-black">
                                                    {item.name}
                                                </h3>

                                                <p className="mt-1 text-xs text-gray-500">
                                                    {item.color || "Standard"}
                                                    {item.size
                                                        ? ` / ${item.size}`
                                                        : ""}
                                                </p>

                                                <p className="mt-1 text-xs text-gray-500">
                                                    Qty: {item.quantity}
                                                </p>
                                            </div>

                                            <p className="whitespace-nowrap text-sm font-semibold">
                                                {formatPrice(
                                                    item.price * item.quantity,
                                                )}
                                            </p>
                                        </div>
                                    ))}

                                    {order.items.length > 2 && (
                                        <p className="text-xs font-medium text-gray-500">
                                            + {order.items.length - 2} more
                                            products
                                        </p>
                                    )}
                                </div>

                                {/* Order footer */}
                                <div className="flex flex-col gap-3 border-t border-gray-200 bg-gray-50 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                                    <p className="text-xs text-gray-500">
                                        Payment:{" "}
                                        <span className="font-semibold capitalize text-black">
                                            {order.paymentStatus.replaceAll(
                                                "_",
                                                " ",
                                            )}
                                        </span>
                                    </p>

                                    <div className="grid grid-cols-2 gap-2 sm:flex">
                                        <Link
                                            href={`/track-order?orderId=${encodeURIComponent(
                                                String(order.id),
                                            )}`}
                                            className="flex h-10 items-center justify-center rounded-md border border-gray-300 bg-white px-4 text-xs font-semibold transition hover:border-black"
                                        >
                                            Track Order
                                        </Link>

                                        <Link
                                            href={`/account/orders/${encodeURIComponent(
                                                String(order.id),
                                            )}`}
                                            className="flex h-10 items-center justify-center gap-2 rounded-md bg-black px-4 text-xs font-semibold text-white transition hover:bg-gray-800"
                                        >
                                            View Details
                                            <ArrowRight size={14} />
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))
                    )}
                </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-gray-200 bg-white py-6">
                <p className="text-center text-xs tracking-wide text-gray-500">
                    © {new Date().getFullYear()} SPARK MENS FASHION. ALL RIGHTS
                    RESERVED.
                </p>
            </footer>
        </main>
    );
}
