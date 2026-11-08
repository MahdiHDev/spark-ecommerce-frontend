"use client";

import Image from "next/image";
import { useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    slug: string;
}

interface NewArrivalsProps {
    products?: Product[];
    onAddToCart?: (product: Product) => void;
}

const defaultProducts: Product[] = [
    {
        id: 1,
        name: "Off-white color denim trouser with semi baggy leg opening",
        price: 999,
        image: "/images/products/product1.jpg",
        slug: "off-white-denim-trouser",
    },
    {
        id: 2,
        name: "Introducing our Dark Coffee Denim Trouser",
        price: 999,
        image: "/images/products/product2.jpg",
        slug: "dark-coffee-denim",
    },
    {
        id: 3,
        name: "Chocolate color boxy fit contrast shirt",
        price: 1299,
        image: "/images/products/product3.jpg",
        slug: "chocolate-boxy-shirt",
    },
    {
        id: 4,
        name: "Premium oversized casual shirt",
        price: 1199,
        image: "/images/products/product4.jpg",
        slug: "oversized-casual-shirt",
    },
    {
        id: 5,
        name: "Premium oversized casual shirt",
        price: 1199,
        image: "/images/products/product5.jpg",
        slug: "oversized-casual-shirt",
    },
    {
        id: 6,
        name: "Premium oversized casual shirt",
        price: 1199,
        image: "/images/products/product6.jpg",
        slug: "oversized-casual-shirt",
    },
];

export default function NewArrivals({
    products = defaultProducts,
    onAddToCart,
}: NewArrivalsProps) {
    const [swiper, setSwiper] = useState<SwiperType | null>(null);

    return (
        <section className="w-full overflow-hidden bg-[#EDE5E1] py-16 md:py-24">
            <div className="mx-auto max-w-[1800px]">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(280px,0.85fr)_minmax(0,2fr)] lg:gap-12 ">
                    {/* LEFT CONTENT */}
                    <div className="relative z-10 flex flex-col justify-start px-5 md:px-10 lg:sticky lg:top-28 lg:h-fit lg:self-start">
                        <h2 className="text-5xl font-extrabold tracking-tight text-black md:text-6xl xl:text-7xl">
                            New Arrivals
                        </h2>

                        <p className="mt-4 max-w-sm text-base text-gray-500 md:text-lg">
                            The latest drops. Fresh styles added weekly.
                        </p>

                        <a
                            href="/collections/new-arrivals"
                            className="mt-7 w-fit border-b border-black pb-1 text-sm font-semibold text-black"
                        >
                            Shop Collection
                        </a>

                        <div className="mt-8 flex gap-3">
                            <button
                                onClick={() => swiper?.slidePrev()}
                                aria-label="Previous products"
                                className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 hover:bg-black hover:text-white"
                            >
                                ←
                            </button>

                            <button
                                onClick={() => swiper?.slideNext()}
                                aria-label="Next products"
                                className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 hover:bg-black hover:text-white"
                            >
                                →
                            </button>
                        </div>
                    </div>

                    {/* RIGHT PRODUCT SLIDER */}
                    <div className="relative z-0 min-w-0 overflow-hidden pl-5 md:pl-10 lg:pl-0">
                        <Swiper
                            onSwiper={setSwiper}
                            spaceBetween={24}
                            slidesPerView="auto"
                            grabCursor
                            speed={600}
                            breakpoints={{
                                640: {
                                    spaceBetween: 24,
                                },
                                1024: {
                                    spaceBetween: 28,
                                },
                            }}
                            className="w-full overflow-hidden!"
                        >
                            {products.map((product) => (
                                <SwiperSlide
                                    key={product.id}
                                    className="!w-[75vw] sm:!w-[350px] xl:!w-[420px]"
                                >
                                    {/* Keep your existing product card here */}
                                    <div className="group">
                                        {/* PRODUCT IMAGE */}
                                        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gray-100">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                sizes="(max-width: 640px) 75vw, (max-width: 1280px) 350px, 420px"
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />

                                            {/* ADD TO CART */}
                                            <div className="absolute inset-x-0 bottom-0 p-4 opacity-100 transition-all duration-300 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                                                <button
                                                    onClick={() =>
                                                        onAddToCart?.(product)
                                                    }
                                                    className="w-full rounded-full bg-white px-6 py-4 text-sm font-bold text-black shadow-lg transition-colors hover:bg-black hover:text-white"
                                                >
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>

                                        {/* PRODUCT DETAILS */}
                                        <div className="mt-5 flex items-start justify-between gap-3">
                                            <a
                                                href={`/products/${product.slug}`}
                                                className="text-base font-semibold leading-7 text-gray-900 transition-colors hover:text-gray-500 md:text-lg"
                                            >
                                                {product.name}
                                            </a>

                                            <span className="shrink-0 text-base font-semibold text-orange-600">
                                                ৳{product.price}
                                            </span>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}

                            {/* BROWSE ALL CARD - LAST SLIDE */}
                            <SwiperSlide className="!w-[75vw] sm:!w-[350px] xl:!w-[420px]">
                                <a
                                    href="/collections/new-arrivals"
                                    className="group flex aspect-[3/4] flex-col items-center justify-center rounded-2xl bg-[#EAE7E1] transition-colors duration-300 hover:bg-[#171717]"
                                >
                                    <span className="text-3xl font-bold tracking-tight text-black transition-colors group-hover:text-white md:text-4xl">
                                        Browse All
                                    </span>

                                    <span className="mt-4 flex h-12 w-12 items-center justify-center rounded-full border border-black text-black transition-all group-hover:border-white group-hover:bg-white group-hover:text-black">
                                        →
                                    </span>

                                    <span className="mt-5 text-sm text-gray-500 transition-colors group-hover:text-gray-300">
                                        Explore all new arrivals
                                    </span>
                                </a>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    );
}
