"use client";

import { FilterPanel, formatPrice } from "@/components/products/FilterPanel";
import {
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ShoppingBag,
    SlidersHorizontal,
    X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

const products = [
    {
        id: 1,
        name: "Brutalism Oversized T-Shirt",
        category: "T-Shirt",
        price: 599,
        oldPrice: 799,
        image: "/images/products/product1.jpg",
        badge: "Bestseller",
    },
    {
        id: 2,
        name: "Essential Black Hoodie",
        category: "Hoodie",
        price: 1199,
        oldPrice: 1499,
        image: "/images/products/product2.jpg",
        badge: "New",
    },
    {
        id: 3,
        name: "Classic Oversized T-Shirt",
        category: "T-Shirt",
        price: 649,
        oldPrice: 799,
        image: "/images/products/product3.jpg",
        badge: "",
    },
    {
        id: 4,
        name: "Premium Cotton Sweatshirt",
        category: "Sweatshirt",
        price: 999,
        oldPrice: 1299,
        image: "/images/products/product4.jpg",
        badge: "New",
    },
    {
        id: 5,
        name: "Graphic Drop Shoulder Tee",
        category: "T-Shirt",
        price: 599,
        oldPrice: 750,
        image: "/images/products/product5.jpg",
        badge: "",
    },
    {
        id: 6,
        name: "Minimal Black Hoodie",
        category: "Hoodie",
        price: 1199,
        oldPrice: 1499,
        image: "/images/products/product6.jpg",
        badge: "",
    },
    {
        id: 7,
        name: "Urban Streetwear Tee",
        category: "T-Shirt",
        price: 699,
        oldPrice: 899,
        image: "/images/products/product1.jpg",
        badge: "",
    },
    {
        id: 8,
        name: "Everyday Zip Jacket",
        category: "Jacket",
        price: 1599,
        oldPrice: 1999,
        image: "/images/products/product2.jpg",
        badge: "New",
    },
    {
        id: 9,
        name: "Relaxed Fit Sweatshirt",
        category: "Sweatshirt",
        price: 999,
        oldPrice: 1299,
        image: "/images/products/product3.jpg",
        badge: "",
    },
    {
        id: 10,
        name: "Premium Plain T-Shirt",
        category: "T-Shirt",
        price: 499,
        oldPrice: 650,
        image: "/images/products/product4.jpg",
        badge: "",
    },
    {
        id: 11,
        name: "Signature Oversized Hoodie",
        category: "Hoodie",
        price: 1299,
        oldPrice: 1599,
        image: "/images/products/product5.jpg",
        badge: "Bestseller",
    },
    {
        id: 12,
        name: "Streetwear Graphic Tee",
        category: "T-Shirt",
        price: 599,
        oldPrice: 799,
        image: "/images/products/product6.jpg",
        badge: "",
    },
];

export default function ProductsPage() {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sort, setSort] = useState("featured");
    const [maxPrice, setMaxPrice] = useState(2500);
    const [page, setPage] = useState(1);
    const [mobileFilters, setMobileFilters] = useState(false);
    const [cartCount, setCartCount] = useState(0);

    const productsPerPage = 9;

    const filteredProducts = useMemo(() => {
        let result = products.filter((product) => {
            const matchesSearch = product.name
                .toLowerCase()
                .includes(search.toLowerCase());

            const matchesCategory =
                selectedCategory === "All" ||
                product.category === selectedCategory;

            const matchesPrice = product.price <= maxPrice;

            return matchesSearch && matchesCategory && matchesPrice;
        });

        if (sort === "price-low") {
            result = [...result].sort((a, b) => a.price - b.price);
        } else if (sort === "price-high") {
            result = [...result].sort((a, b) => b.price - a.price);
        } else if (sort === "newest") {
            result = [...result].reverse();
        }

        return result;
    }, [search, selectedCategory, maxPrice, sort]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredProducts.length / productsPerPage),
    );

    const currentProducts = filteredProducts.slice(
        (page - 1) * productsPerPage,
        page * productsPerPage,
    );

    const selectCategory = (category: string) => {
        setSelectedCategory(category);
        setPage(1);
        setMobileFilters(false);
    };

    const clearFilters = () => {
        setSearch("");
        setSelectedCategory("All");
        setMaxPrice(2500);
        setSort("featured");
        setPage(1);
    };

    return (
        <main className="min-h-screen bg-white text-gray-950">
            {/* Page heading */}
            <section className="border-b border-gray-200 px-5 py-10 sm:py-14">
                <div className="mx-auto max-w-7xl text-center">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
                        SPARK MENS FASHION
                    </p>

                    <h1 className="text-3xl font-bold uppercase tracking-[0.15em] sm:text-5xl">
                        {selectedCategory}
                    </h1>

                    <p className="mt-3 text-sm text-gray-500">
                        Discover your style. Wear your confidence.
                    </p>
                </div>
            </section>

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Toolbar */}
                <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h2 className="text-lg font-semibold">All Products</h2>
                        <p className="mt-1 text-xs text-gray-500">
                            Showing {filteredProducts.length} products
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setMobileFilters(true)}
                            className="flex h-10 items-center gap-2 rounded-md border border-gray-300 px-3 text-sm font-medium lg:hidden"
                        >
                            <SlidersHorizontal size={16} />
                            Filters
                        </button>

                        <label className="flex h-10 items-center gap-2 rounded-md border border-gray-300 px-3">
                            <span className="hidden text-xs text-gray-500 sm:inline">
                                Sort by
                            </span>
                            <select
                                value={sort}
                                onChange={(e) => {
                                    setSort(e.target.value);
                                    setPage(1);
                                }}
                                className="max-w-[125px] bg-transparent text-sm outline-none"
                            >
                                <option value="featured">Featured</option>
                                <option value="newest">Newest</option>
                                <option value="price-low">
                                    Price: Low to High
                                </option>
                                <option value="price-high">
                                    Price: High to Low
                                </option>
                            </select>
                            <ChevronDown size={15} className="text-gray-500" />
                        </label>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
                    {/* Desktop sidebar */}
                    <aside className="hidden lg:block">
                        <FilterPanel
                            search={search}
                            setSearch={setSearch}
                            selectedCategory={selectedCategory}
                            selectCategory={selectCategory}
                            maxPrice={maxPrice}
                            setMaxPrice={setMaxPrice}
                            clearFilters={clearFilters}
                        />
                    </aside>

                    {/* Product grid */}
                    <section>
                        {currentProducts.length > 0 ? (
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:gap-5">
                                {currentProducts.map((product) => (
                                    <article
                                        key={product.id}
                                        className="group overflow-hidden rounded-lg border border-gray-200 bg-white transition duration-300 hover:border-gray-400 hover:shadow-lg"
                                    >
                                        <Link
                                            href={`/products/${product.id}`}
                                            className="relative block aspect-[4/5] overflow-hidden bg-gray-100"
                                        >
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                                className="object-cover transition duration-500 group-hover:scale-105"
                                            />

                                            {product.badge && (
                                                <span className="absolute left-3 top-3 rounded-sm bg-black px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                                                    {product.badge}
                                                </span>
                                            )}
                                        </Link>

                                        <div className="p-3 sm:p-4">
                                            <p className="mb-1 text-[10px] uppercase tracking-widest text-gray-400">
                                                {product.category}
                                            </p>

                                            <Link
                                                href={`/products/${product.id}`}
                                            >
                                                <h3 className="line-clamp-2 min-h-10 text-xs font-semibold leading-5 text-gray-900 transition hover:text-gray-500 sm:text-sm">
                                                    {product.name}
                                                </h3>
                                            </Link>

                                            <div className="mt-2 flex flex-wrap items-center gap-2">
                                                <span className="text-sm font-bold">
                                                    {formatPrice(product.price)}
                                                </span>
                                                <span className="text-xs text-gray-400 line-through">
                                                    {formatPrice(
                                                        product.oldPrice,
                                                    )}
                                                </span>
                                            </div>

                                            <button
                                                onClick={() =>
                                                    setCartCount(
                                                        (count) => count + 1,
                                                    )
                                                }
                                                className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-md bg-black text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-gray-800"
                                            >
                                                <ShoppingBag size={15} />
                                                Add to Cart
                                            </button>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        ) : (
                            <div className="flex min-h-80 flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 text-center">
                                <ShoppingBag
                                    size={35}
                                    className="mb-4 text-gray-300"
                                />
                                <h3 className="text-lg font-semibold">
                                    No products found
                                </h3>
                                <p className="mt-2 text-sm text-gray-500">
                                    Try changing your search or filters.
                                </p>
                                <button
                                    onClick={clearFilters}
                                    className="mt-5 text-sm font-semibold underline underline-offset-4"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}

                        {/* Pagination */}
                        {filteredProducts.length > 0 && (
                            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 pt-6">
                                <p className="text-xs text-gray-500">
                                    Page {page} of {totalPages}
                                </p>

                                <div className="flex items-center gap-1">
                                    <button
                                        disabled={page === 1}
                                        onClick={() =>
                                            setPage((p) => Math.max(1, p - 1))
                                        }
                                        className="flex h-9 items-center gap-1 rounded-md border border-gray-300 px-3 text-xs disabled:opacity-40"
                                    >
                                        <ChevronLeft size={15} />
                                        <span className="hidden sm:inline">
                                            Previous
                                        </span>
                                    </button>

                                    {Array.from(
                                        { length: totalPages },
                                        (_, i) => i + 1,
                                    ).map((number) => (
                                        <button
                                            key={number}
                                            onClick={() => setPage(number)}
                                            className={`h-9 min-w-9 rounded-md border px-2 text-xs ${
                                                page === number
                                                    ? "border-black bg-black text-white"
                                                    : "border-gray-300 hover:bg-gray-100"
                                            }`}
                                        >
                                            {number}
                                        </button>
                                    ))}

                                    <button
                                        disabled={page === totalPages}
                                        onClick={() =>
                                            setPage((p) =>
                                                Math.min(totalPages, p + 1),
                                            )
                                        }
                                        className="flex h-9 items-center gap-1 rounded-md border border-gray-300 px-3 text-xs disabled:opacity-40"
                                    >
                                        <span className="hidden sm:inline">
                                            Next
                                        </span>
                                        <ChevronRight size={15} />
                                    </button>
                                </div>

                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <span>Per page</span>
                                    <span className="font-semibold text-gray-900">
                                        {productsPerPage}
                                    </span>
                                </div>
                            </div>
                        )}
                    </section>
                </div>
            </div>

            {/* Mobile filter drawer */}
            <div
                className={`fixed inset-0 z-50 lg:hidden transition-[visibility] duration-300 ${
                    mobileFilters ? "visible" : "invisible delay-300"
                }`}
            >
                {/* Background overlay */}
                <button
                    aria-label="Close filters"
                    onClick={() => setMobileFilters(false)}
                    className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
                        mobileFilters ? "opacity-100" : "opacity-0"
                    }`}
                />

                {/* Drawer */}
                <div
                    className={`absolute right-0 top-0 h-full w-[85%] max-w-sm overflow-y-auto bg-white p-5 shadow-xl
    transform transition-transform duration-300 ease-in-out
    ${mobileFilters ? "translate-x-0" : "translate-x-full"}`}
                >
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-lg font-bold">Filters</h2>

                        <button
                            onClick={() => setMobileFilters(false)}
                            aria-label="Close filters"
                        >
                            <X size={22} />
                        </button>
                    </div>

                    <FilterPanel
                        search={search}
                        setSearch={setSearch}
                        selectedCategory={selectedCategory}
                        selectCategory={selectCategory}
                        maxPrice={maxPrice}
                        setMaxPrice={setMaxPrice}
                        clearFilters={clearFilters}
                    />

                    <button
                        onClick={() => setMobileFilters(false)}
                        className="mt-6 h-12 w-full rounded-md bg-black text-sm font-semibold uppercase tracking-wider text-white"
                    >
                        Show Products
                    </button>
                </div>
            </div>

            {/* Cart indicator */}
            {cartCount > 0 && (
                <div className="fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-lg bg-black px-5 py-3 text-sm text-white shadow-xl">
                    <ShoppingBag size={17} />
                    {cartCount} item{cartCount !== 1 ? "s" : ""} added
                    <button
                        onClick={() => setCartCount(0)}
                        className="ml-2 text-xs text-gray-300 underline"
                    >
                        Dismiss
                    </button>
                </div>
            )}
        </main>
    );
}
