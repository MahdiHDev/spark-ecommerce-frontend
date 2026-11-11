"use client";

import {
    ArrowLeft,
    CheckCircle2,
    CreditCard,
    LockKeyhole,
    MapPin,
    Package,
    ShieldCheck,
    Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const cartItems = [
    {
        id: 1,
        name: "Brutalism Oversized T-Shirt",
        category: "T-Shirt",
        price: 599,
        quantity: 1,
        size: "L",
        color: "Black",
        image: "/images/products/product1.jpg",
    },
    {
        id: 2,
        name: "Essential Black Hoodie",
        category: "Hoodie",
        price: 1199,
        quantity: 1,
        size: "XL",
        color: "Black",
        image: "/images/products/product2.jpg",
    },
];

const formatPrice = (price: number) => `৳ ${price.toLocaleString("en-BD")}`;

export default function CheckoutPage() {
    const [paymentMethod, setPaymentMethod] = useState("cod");
    const [deliveryMethod, setDeliveryMethod] = useState("inside");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        area: "",
        postalCode: "",
        notes: "",
    });

    const subtotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
    );

    const deliveryFee = deliveryMethod === "inside" ? 60 : 120;
    const total = subtotal + deliveryFee;

    const updateField = (field: keyof typeof form, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsSubmitting(true);

        try {
            // Connect this to your order creation API.
            // Example: POST /api/orders

            console.log({
                customer: form,
                items: cartItems,
                paymentMethod,
                deliveryMethod,
                subtotal,
                deliveryFee,
                total,
            });

            alert(
                "Checkout UI is ready. Connect your order API to place orders.",
            );
        } catch {
            alert("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="border-b border-gray-200 bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
                    <Link href="/" className="flex items-center">
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
                        <LockKeyhole size={15} />
                        Secure Checkout
                    </div>
                </div>
            </header>

            <div className="mx-auto max-w-7xl px-5 py-8 sm:py-12">
                {/* Breadcrumb */}
                <Link
                    href="/"
                    className="mb-8 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-black"
                >
                    <ArrowLeft size={16} />
                    Continue Shopping
                </Link>

                <div className="mb-8">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
                        SPARK MENS FASHION
                    </p>
                    <h1 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
                        Checkout
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Complete your details to place your order.
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_400px]">
                        {/* Left: Checkout form */}
                        <div className="space-y-6">
                            {/* Contact information */}
                            <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-7">
                                <div className="mb-6 flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                                        <Package size={19} />
                                    </div>
                                    <div>
                                        <h2 className="font-bold text-black">
                                            Contact Information
                                        </h2>
                                        <p className="text-xs text-gray-500">
                                            Your contact details
                                        </p>
                                    </div>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="sm:col-span-2">
                                        <label className="mb-2 block text-sm font-medium">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={form.email}
                                            onChange={(e) =>
                                                updateField(
                                                    "email",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="example@email.com"
                                            className="h-12 w-full rounded-md border border-gray-300 px-4 text-sm outline-none transition focus:border-black"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium">
                                            First Name
                                        </label>
                                        <input
                                            required
                                            value={form.firstName}
                                            onChange={(e) =>
                                                updateField(
                                                    "firstName",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="First name"
                                            className="h-12 w-full rounded-md border border-gray-300 px-4 text-sm outline-none focus:border-black"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium">
                                            Last Name
                                        </label>
                                        <input
                                            required
                                            value={form.lastName}
                                            onChange={(e) =>
                                                updateField(
                                                    "lastName",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Last name"
                                            className="h-12 w-full rounded-md border border-gray-300 px-4 text-sm outline-none focus:border-black"
                                        />
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label className="mb-2 block text-sm font-medium">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            required
                                            value={form.phone}
                                            onChange={(e) =>
                                                updateField(
                                                    "phone",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="01XXXXXXXXX"
                                            className="h-12 w-full rounded-md border border-gray-300 px-4 text-sm outline-none focus:border-black"
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* Shipping address */}
                            <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-7">
                                <div className="mb-6 flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                                        <MapPin size={19} />
                                    </div>
                                    <div>
                                        <h2 className="font-bold text-black">
                                            Shipping Address
                                        </h2>
                                        <p className="text-xs text-gray-500">
                                            Where should we deliver your order?
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium">
                                            Street Address
                                        </label>
                                        <input
                                            required
                                            value={form.address}
                                            onChange={(e) =>
                                                updateField(
                                                    "address",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="House, road, street address"
                                            className="h-12 w-full rounded-md border border-gray-300 px-4 text-sm outline-none focus:border-black"
                                        />
                                    </div>

                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div>
                                            <label className="mb-2 block text-sm font-medium">
                                                City
                                            </label>
                                            <input
                                                required
                                                value={form.city}
                                                onChange={(e) =>
                                                    updateField(
                                                        "city",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="e.g. Dhaka"
                                                className="h-12 w-full rounded-md border border-gray-300 px-4 text-sm outline-none focus:border-black"
                                            />
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-sm font-medium">
                                                Area / District
                                            </label>
                                            <input
                                                required
                                                value={form.area}
                                                onChange={(e) =>
                                                    updateField(
                                                        "area",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Your area"
                                                className="h-12 w-full rounded-md border border-gray-300 px-4 text-sm outline-none focus:border-black"
                                            />
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label className="mb-2 block text-sm font-medium">
                                                Postal Code (Optional)
                                            </label>
                                            <input
                                                value={form.postalCode}
                                                onChange={(e) =>
                                                    updateField(
                                                        "postalCode",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Postal code"
                                                className="h-12 w-full rounded-md border border-gray-300 px-4 text-sm outline-none focus:border-black"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium">
                                            Order Notes (Optional)
                                        </label>
                                        <textarea
                                            rows={3}
                                            value={form.notes}
                                            onChange={(e) =>
                                                updateField(
                                                    "notes",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Any special delivery instructions?"
                                            className="w-full resize-none rounded-md border border-gray-300 p-4 text-sm outline-none focus:border-black"
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* Delivery method */}
                            <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-7">
                                <div className="mb-6 flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                                        <Truck size={19} />
                                    </div>
                                    <div>
                                        <h2 className="font-bold text-black">
                                            Delivery Method
                                        </h2>
                                        <p className="text-xs text-gray-500">
                                            Select your delivery location
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label
                                        className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 transition ${
                                            deliveryMethod === "inside"
                                                ? "border-black bg-gray-50"
                                                : "border-gray-200"
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="radio"
                                                name="delivery"
                                                value="inside"
                                                checked={
                                                    deliveryMethod === "inside"
                                                }
                                                onChange={() =>
                                                    setDeliveryMethod("inside")
                                                }
                                                className="accent-black"
                                            />
                                            <div>
                                                <p className="text-sm font-semibold">
                                                    Inside Dhaka
                                                </p>
                                                <p className="mt-1 text-xs text-gray-500">
                                                    Standard delivery
                                                </p>
                                            </div>
                                        </div>
                                        <span className="text-sm font-semibold">
                                            ৳ 60
                                        </span>
                                    </label>

                                    <label
                                        className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 transition ${
                                            deliveryMethod === "outside"
                                                ? "border-black bg-gray-50"
                                                : "border-gray-200"
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="radio"
                                                name="delivery"
                                                value="outside"
                                                checked={
                                                    deliveryMethod === "outside"
                                                }
                                                onChange={() =>
                                                    setDeliveryMethod("outside")
                                                }
                                                className="accent-black"
                                            />
                                            <div>
                                                <p className="text-sm font-semibold">
                                                    Outside Dhaka
                                                </p>
                                                <p className="mt-1 text-xs text-gray-500">
                                                    Nationwide delivery
                                                </p>
                                            </div>
                                        </div>
                                        <span className="text-sm font-semibold">
                                            ৳ 120
                                        </span>
                                    </label>
                                </div>
                            </section>

                            {/* Payment method */}
                            <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-7">
                                <div className="mb-6 flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                                        <CreditCard size={19} />
                                    </div>
                                    <div>
                                        <h2 className="font-bold text-black">
                                            Payment Method
                                        </h2>
                                        <p className="text-xs text-gray-500">
                                            Choose how you want to pay
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label
                                        className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition ${
                                            paymentMethod === "cod"
                                                ? "border-black bg-gray-50"
                                                : "border-gray-200"
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="cod"
                                            checked={paymentMethod === "cod"}
                                            onChange={() =>
                                                setPaymentMethod("cod")
                                            }
                                            className="accent-black"
                                        />
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold">
                                                Cash on Delivery
                                            </p>
                                            <p className="mt-1 text-xs text-gray-500">
                                                Pay when your order arrives
                                            </p>
                                        </div>
                                        <Package
                                            size={20}
                                            className="text-gray-500"
                                        />
                                    </label>

                                    <label
                                        className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition ${
                                            paymentMethod === "online"
                                                ? "border-black bg-gray-50"
                                                : "border-gray-200"
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="online"
                                            checked={paymentMethod === "online"}
                                            onChange={() =>
                                                setPaymentMethod("online")
                                            }
                                            className="accent-black"
                                        />
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold">
                                                Online Payment
                                            </p>
                                            <p className="mt-1 text-xs text-gray-500">
                                                Pay using your supported payment
                                                gateway
                                            </p>
                                        </div>
                                        <CreditCard
                                            size={20}
                                            className="text-gray-500"
                                        />
                                    </label>
                                </div>
                            </section>
                        </div>

                        {/* Right: Order summary */}
                        <aside className="h-fit rounded-xl border border-gray-200 bg-white p-5 sm:p-7 lg:sticky lg:top-6">
                            <h2 className="text-lg font-bold text-black">
                                Order Summary
                            </h2>
                            <p className="mt-1 text-xs text-gray-500">
                                {cartItems.length} items in your order
                            </p>

                            <div className="my-6 space-y-5">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="relative h-20 w-16 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                sizes="64px"
                                                className="object-cover"
                                            />
                                            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white">
                                                {item.quantity}
                                            </span>
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <h3 className="text-sm font-semibold text-black">
                                                {item.name}
                                            </h3>
                                            <p className="mt-1 text-xs text-gray-500">
                                                {item.color} / {item.size}
                                            </p>
                                            <p className="mt-2 text-sm font-semibold">
                                                {formatPrice(
                                                    item.price * item.quantity,
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-200 pt-5">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">
                                        Subtotal
                                    </span>
                                    <span className="font-medium">
                                        {formatPrice(subtotal)}
                                    </span>
                                </div>

                                <div className="mt-3 flex justify-between text-sm">
                                    <span className="text-gray-500">
                                        Delivery Fee
                                    </span>
                                    <span className="font-medium">
                                        {formatPrice(deliveryFee)}
                                    </span>
                                </div>

                                <div className="mt-5 flex justify-between border-t border-gray-200 pt-5">
                                    <span className="font-bold">Total</span>
                                    <span className="text-xl font-bold">
                                        {formatPrice(total)}
                                    </span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="mt-7 flex h-14 w-full items-center justify-center gap-2 rounded-md bg-black text-sm font-bold uppercase tracking-wider text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isSubmitting ? "Processing..." : "Place Order"}
                                {!isSubmitting && <CheckCircle2 size={18} />}
                            </button>

                            <div className="mt-5 flex items-start gap-2 text-xs leading-5 text-gray-500">
                                <ShieldCheck
                                    size={17}
                                    className="mt-0.5 flex-shrink-0"
                                />
                                <p>
                                    Your information is protected. By placing
                                    your order, you agree to our Terms &
                                    Conditions.
                                </p>
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-3 border-t border-gray-200 pt-5">
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <LockKeyhole size={15} />
                                    Secure Checkout
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <Truck size={15} />
                                    Fast Delivery
                                </div>
                            </div>
                        </aside>
                    </div>
                </form>
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
