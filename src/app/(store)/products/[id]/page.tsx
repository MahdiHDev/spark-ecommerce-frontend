"use client";

import {
    ArrowLeft,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Heart,
    Minus,
    Plus,
    RotateCcw,
    ShieldCheck,
    ShoppingBag,
    Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

const products = [
    {
        id: 1,
        name: "Brutalism Oversized T-Shirt",
        category: "T-Shirt",
        price: 599,
        oldPrice: 799,
        image: "/images/products/product1.jpg",
        badge: "Bestseller",
        description:
            "Make a statement with a relaxed oversized silhouette. Designed for effortless everyday styling and a clean streetwear look.",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Black", "White", "Grey"],
    },
    {
        id: 2,
        name: "Essential Black Hoodie",
        category: "Hoodie",
        price: 1199,
        oldPrice: 1499,
        image: "/images/products/product2.jpg",
        badge: "New",
        description:
            "A versatile hoodie with a relaxed fit. An everyday essential for layering and casual streetwear outfits.",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Black", "Grey"],
    },
    {
        id: 3,
        name: "Classic Oversized T-Shirt",
        category: "T-Shirt",
        price: 649,
        oldPrice: 799,
        image: "/images/products/product3.jpg",
        badge: "",
        description:
            "A timeless oversized tee with a relaxed silhouette. An easy everyday piece that works with almost any outfit.",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Black", "White", "Grey"],
    },
    {
        id: 4,
        name: "Premium Cotton Sweatshirt",
        category: "Sweatshirt",
        price: 999,
        oldPrice: 1299,
        image: "/images/products/product4.jpg",
        badge: "New",
        description:
            "Keep your everyday look simple with this relaxed sweatshirt. Made for comfortable casual styling.",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Black", "White", "Grey"],
    },
    {
        id: 5,
        name: "Graphic Drop Shoulder Tee",
        category: "T-Shirt",
        price: 599,
        oldPrice: 750,
        image: "/images/products/product5.jpg",
        badge: "",
        description:
            "A graphic-inspired streetwear essential featuring a relaxed drop shoulder look.",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Black", "White"],
    },
    {
        id: 6,
        name: "Minimal Black Hoodie",
        category: "Hoodie",
        price: 1199,
        oldPrice: 1499,
        image: "/images/products/product6.jpg",
        badge: "",
        description:
            "Minimal styling meets everyday comfort in this versatile hoodie.",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Black", "Grey"],
    },
    {
        id: 7,
        name: "Urban Streetwear Tee",
        category: "T-Shirt",
        price: 699,
        oldPrice: 899,
        image: "/images/products/product1.jpg",
        badge: "",
        description:
            "Bring a relaxed urban feel to your wardrobe with this streetwear-inspired tee.",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Black", "White", "Grey"],
    },
    {
        id: 8,
        name: "Everyday Zip Jacket",
        category: "Jacket",
        price: 1599,
        oldPrice: 1999,
        image: "/images/products/product2.jpg",
        badge: "New",
        description:
            "A versatile outer layer designed to complete your everyday casual look.",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Black", "Grey"],
    },
    {
        id: 9,
        name: "Relaxed Fit Sweatshirt",
        category: "Sweatshirt",
        price: 999,
        oldPrice: 1299,
        image: "/images/products/product3.jpg",
        badge: "",
        description:
            "A relaxed everyday sweatshirt that keeps your style understated and versatile.",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Black", "White", "Grey"],
    },
    {
        id: 10,
        name: "Premium Plain T-Shirt",
        category: "T-Shirt",
        price: 499,
        oldPrice: 650,
        image: "/images/products/product4.jpg",
        badge: "",
        description: "A clean, minimal T-shirt for easy everyday styling.",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Black", "White", "Grey"],
    },
    {
        id: 11,
        name: "Signature Oversized Hoodie",
        category: "Hoodie",
        price: 1299,
        oldPrice: 1599,
        image: "/images/products/product5.jpg",
        badge: "Bestseller",
        description:
            "A statement hoodie with a relaxed silhouette, designed for modern casual outfits.",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Black", "Grey"],
    },
    {
        id: 12,
        name: "Streetwear Graphic Tee",
        category: "T-Shirt",
        price: 599,
        oldPrice: 799,
        image: "/images/products/product6.jpg",
        badge: "",
        description:
            "Add a streetwear-inspired touch to your everyday wardrobe with this graphic tee.",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Black", "White"],
    },
];

const formatPrice = (price: number) => `৳ ${price.toLocaleString("en-BD")}`;

const colorClasses: Record<string, string> = {
    Black: "bg-black",
    White: "bg-white",
    Grey: "bg-gray-400",
};

export default function ProductDetailsPage() {
    const params = useParams<{ id: string }>();
    const product = products.find((item) => item.id === Number(params.id));

    const [activeImage, setActiveImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [cartMessage, setCartMessage] = useState("");

    // Add these additional image files for a complete gallery:
    // product1-2.jpg, product1-3.jpg, product1-4.jpg, etc.
    const galleryImages = product
        ? [
              product.image,
              product.image.replace("1.jpg", "-2.jpg"),
              product.image.replace("1.jpg", "-3.jpg"),
              product.image.replace("1.jpg", "-4.jpg"),
          ]
        : [];

    const changeImage = (direction: number) => {
        setActiveImage((current) => {
            return (
                (current + direction + galleryImages.length) %
                galleryImages.length
            );
        });
    };

    const addToCart = () => {
        if (!selectedSize) {
            setCartMessage("Please select a size first.");
            return;
        }

        if (!selectedColor) {
            setCartMessage("Please select a color first.");
            return;
        }

        // Connect your cart store/API here.
        setCartMessage(`${quantity} item(s) added to your cart.`);
    };

    if (!product) {
        return (
            <main className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
                <ShoppingBag size={42} className="mb-5 text-gray-300" />
                <h1 className="text-2xl font-bold">Product Not Found</h1>
                <p className="mt-2 text-sm text-gray-500">
                    This product may have been removed or is unavailable.
                </p>
                <Link
                    href="/products"
                    className="mt-6 rounded-md bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800"
                >
                    Back to Shop
                </Link>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-white text-gray-950">
            {/* Breadcrumb */}
            <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
                <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                    <Link href="/" className="hover:text-black">
                        Home
                    </Link>
                    <span>/</span>
                    <Link href="/products" className="hover:text-black">
                        Shop
                    </Link>
                    <span>/</span>
                    <span className="text-gray-900">{product.category}</span>
                    <span>/</span>
                    <span className="font-medium text-gray-900">
                        {product.name}
                    </span>
                </div>
            </div>

            {/* Product section */}
            <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-14">
                    {/* Image gallery */}
                    <div>
                        <div className="group relative aspect-[4/5] overflow-hidden rounded-lg bg-gray-100">
                            <Image
                                key={galleryImages[activeImage]}
                                src={galleryImages[activeImage]}
                                alt={`${product.name} - Image ${activeImage + 1}`}
                                fill
                                priority
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover"
                                onError={(event) => {
                                    event.currentTarget.src = product.image;
                                }}
                            />

                            {product.badge && (
                                <span className="absolute left-4 top-4 z-10 bg-black px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-white">
                                    {product.badge}
                                </span>
                            )}

                            {/* Carousel arrows */}
                            <button
                                onClick={() => changeImage(-1)}
                                aria-label="Previous image"
                                className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white/90 text-black shadow-sm transition hover:bg-black hover:text-white"
                            >
                                <ChevronLeft size={20} />
                            </button>

                            <button
                                onClick={() => changeImage(1)}
                                aria-label="Next image"
                                className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white/90 text-black shadow-sm transition hover:bg-black hover:text-white"
                            >
                                <ChevronRight size={20} />
                            </button>

                            {/* Image counter */}
                            <span className="absolute bottom-4 right-4 rounded-full bg-black/75 px-3 py-1.5 text-[11px] text-white">
                                {activeImage + 1} / {galleryImages.length}
                            </span>
                        </div>

                        {/* Thumbnail gallery */}
                        <div className="mt-4 grid grid-cols-4 gap-3">
                            {galleryImages.map((image, index) => (
                                <button
                                    key={image}
                                    onClick={() => setActiveImage(index)}
                                    aria-label={`View product image ${index + 1}`}
                                    className={`relative aspect-square overflow-hidden rounded-md bg-gray-100 ${
                                        activeImage === index
                                            ? "border-2 border-black"
                                            : "border border-gray-200 opacity-70 hover:opacity-100"
                                    }`}
                                >
                                    <Image
                                        src={image}
                                        alt={`${product.name} thumbnail ${index + 1}`}
                                        fill
                                        sizes="120px"
                                        className="object-cover"
                                        onError={(event) => {
                                            event.currentTarget.src =
                                                product.image;
                                        }}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product information */}
                    <div className="flex flex-col">
                        <div className="mb-3 flex items-center justify-between">
                            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                                {product.category}
                            </span>

                            <button
                                onClick={() => setIsWishlisted(!isWishlisted)}
                                aria-label="Toggle wishlist"
                                className={`flex h-10 w-10 items-center justify-center rounded-full border transition ${
                                    isWishlisted
                                        ? "border-black bg-black text-white"
                                        : "border-gray-200 text-gray-600 hover:border-black hover:text-black"
                                }`}
                            >
                                <Heart
                                    size={19}
                                    fill={
                                        isWishlisted ? "currentColor" : "none"
                                    }
                                />
                            </button>
                        </div>

                        <h1 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl lg:text-4xl">
                            {product.name}
                        </h1>

                        <div className="mt-5 flex flex-wrap items-center gap-3">
                            <span className="text-2xl font-bold">
                                {formatPrice(product.price)}
                            </span>
                            <span className="text-base text-gray-400 line-through">
                                {formatPrice(product.oldPrice)}
                            </span>
                            <span className="rounded-sm bg-gray-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-gray-700">
                                Save{" "}
                                {Math.round(
                                    ((product.oldPrice - product.price) /
                                        product.oldPrice) *
                                        100,
                                )}
                                %
                            </span>
                        </div>

                        <p className="mt-6 text-sm leading-7 text-gray-600">
                            {product.description}
                        </p>

                        <div className="my-7 border-t border-gray-200" />

                        {/* Color selection */}
                        <div>
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-xs font-bold uppercase tracking-widest">
                                    Select Color
                                </h3>
                                <span className="text-xs text-gray-500">
                                    {selectedColor || "Choose a color"}
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                {product.colors.map((color) => (
                                    <button
                                        key={color}
                                        onClick={() => {
                                            setSelectedColor(color);
                                            setCartMessage("");
                                        }}
                                        aria-label={`Select ${color}`}
                                        title={color}
                                        className={`flex h-9 w-9 items-center justify-center rounded-full border ${
                                            selectedColor === color
                                                ? "border-black ring-2 ring-black ring-offset-2"
                                                : "border-gray-300"
                                        }`}
                                    >
                                        <span
                                            className={`h-6 w-6 rounded-full border border-gray-200 ${
                                                colorClasses[color]
                                            }`}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Size selection */}
                        <div className="mt-8">
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-xs font-bold uppercase tracking-widest">
                                    Select Size
                                </h3>
                                <button className="text-xs text-gray-500 underline underline-offset-4 hover:text-black">
                                    Size Guide
                                </button>
                            </div>

                            <div className="grid grid-cols-5 gap-2">
                                {product.sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => {
                                            setSelectedSize(size);
                                            setCartMessage("");
                                        }}
                                        className={`h-12 rounded-md border text-sm font-semibold transition ${
                                            selectedSize === size
                                                ? "border-black bg-black text-white"
                                                : "border-gray-300 text-gray-700 hover:border-black"
                                        }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity */}
                        <div className="mt-8">
                            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest">
                                Quantity
                            </h3>

                            <div className="flex h-12 w-36 items-center justify-between rounded-md border border-gray-300">
                                <button
                                    onClick={() =>
                                        setQuantity((current) =>
                                            Math.max(1, current - 1),
                                        )
                                    }
                                    aria-label="Decrease quantity"
                                    className="flex h-full w-11 items-center justify-center hover:bg-gray-100"
                                >
                                    <Minus size={15} />
                                </button>

                                <span className="text-sm font-semibold">
                                    {quantity}
                                </span>

                                <button
                                    onClick={() =>
                                        setQuantity((current) =>
                                            Math.min(10, current + 1),
                                        )
                                    }
                                    aria-label="Increase quantity"
                                    className="flex h-full w-11 items-center justify-center hover:bg-gray-100"
                                >
                                    <Plus size={15} />
                                </button>
                            </div>
                        </div>

                        {/* Cart message */}
                        {cartMessage && (
                            <p
                                className="mt-4 text-sm font-medium text-gray-700"
                                role="status"
                            >
                                {cartMessage}
                            </p>
                        )}

                        {/* Actions */}
                        <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <button
                                onClick={addToCart}
                                className="flex h-14 items-center justify-center gap-3 rounded-md bg-black px-5 text-xs font-bold uppercase tracking-[0.15em] text-white transition hover:bg-gray-800"
                            >
                                <ShoppingBag size={18} />
                                Add to Cart
                            </button>

                            <button
                                onClick={() => setIsWishlisted(!isWishlisted)}
                                className="flex h-14 items-center justify-center gap-3 rounded-md border border-gray-300 px-5 text-xs font-bold uppercase tracking-[0.15em] transition hover:border-black"
                            >
                                <Heart
                                    size={18}
                                    fill={
                                        isWishlisted ? "currentColor" : "none"
                                    }
                                />
                                {isWishlisted ? "Wishlisted" : "Wishlist"}
                            </button>
                        </div>

                        {/* Shopping information */}
                        <div className="mt-8 space-y-5 border-t border-gray-200 pt-6">
                            <div className="flex items-center gap-4">
                                <Truck
                                    size={20}
                                    className="shrink-0 text-gray-500"
                                />
                                <div>
                                    <p className="text-sm font-semibold">
                                        Delivery Information
                                    </p>
                                    <p className="mt-1 text-xs text-gray-500">
                                        Available delivery options are shown at
                                        checkout.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <RotateCcw
                                    size={20}
                                    className="shrink-0 text-gray-500"
                                />
                                <div>
                                    <p className="text-sm font-semibold">
                                        Returns & Exchanges
                                    </p>
                                    <p className="mt-1 text-xs text-gray-500">
                                        Check our return policy before placing
                                        your order.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <ShieldCheck
                                    size={20}
                                    className="shrink-0 text-gray-500"
                                />
                                <div>
                                    <p className="text-sm font-semibold">
                                        Secure Checkout
                                    </p>
                                    <p className="mt-1 text-xs text-gray-500">
                                        Complete your purchase through our
                                        secure checkout.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Product information accordion */}
                        <div className="mt-8 border-t border-gray-200">
                            <details className="group border-b border-gray-200 py-5">
                                <summary className="flex cursor-pointer list-none items-center justify-between text-xs font-bold uppercase tracking-widest">
                                    Product Description
                                    <ChevronDown
                                        size={17}
                                        className="transition group-open:rotate-180"
                                    />
                                </summary>
                                <p className="mt-4 text-sm leading-7 text-gray-600">
                                    {product.description}
                                </p>
                            </details>

                            <details className="group border-b border-gray-200 py-5">
                                <summary className="flex cursor-pointer list-none items-center justify-between text-xs font-bold uppercase tracking-widest">
                                    Size & Fit
                                    <ChevronDown
                                        size={17}
                                        className="transition group-open:rotate-180"
                                    />
                                </summary>
                                <p className="mt-4 text-sm leading-7 text-gray-600">
                                    Available sizes: {product.sizes.join(", ")}.
                                    Please refer to the size guide and product
                                    measurements before ordering.
                                </p>
                            </details>
                        </div>
                    </div>
                </div>
            </section>

            {/* Back to shop */}
            <section className="border-t border-gray-200 px-5 py-10">
                <div className="mx-auto max-w-7xl">
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-600 transition hover:text-black"
                    >
                        <ArrowLeft size={16} />
                        Continue Shopping
                    </Link>
                </div>
            </section>
        </main>
    );
}
