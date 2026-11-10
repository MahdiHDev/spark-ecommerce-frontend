"use client";

import Image from "next/image";
import { useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { GrFormNext, GrFormPrevious } from "react-icons/gr";
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
        slug: "oversized-casual-shirt-2",
    },
    {
        id: 6,
        name: "Premium oversized casual shirt",
        price: 1199,
        image: "/images/products/product6.jpg",
        slug: "oversized-casual-shirt-3",
    },
];

export default function NewArrivals({
    products = defaultProducts,
    onAddToCart,
}: NewArrivalsProps) {
    const [swiper, setSwiper] = useState<SwiperType | null>(null);

    return (
        <section className="relative w-full overflow-x-clip bg-[#EDE5E1] py-16 md:py-24 lg:py-28">
            <div className="mx-auto max-w-[1800px]">
                <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(280px,0.85fr)_minmax(0,2fr)] lg:gap-12">
                    {/* LEFT CONTENT */}
                    <div className="relative z-10 self-start px-5 md:px-10 lg:sticky lg:top-40 lg:h-fit lg:px-0 lg:pl-10 xl:pl-16">
                        <div className="flex md:flex-col items-center md:items-start md:justify-start justify-between">
                            <h2 className="w-full md:max-w-[500px] text-3xl font-extrabold leading-[0.95]  text-black md:text-6xl xl:text-7xl">
                                New Arrivals
                                <span className="text-orange-600">.</span>
                            </h2>

                            <p className="mt-6 max-w-sm text-base leading-7 text-gray-600 md:text-lg hidden md:block">
                                The latest drops. Fresh styles added weekly.
                                Discover pieces designed to elevate your
                                everyday wardrobe.
                            </p>

                            <a
                                href="/collections/new-arrivals"
                                className="group mt-8 w-fit items-center gap-3 border-b border-black pb-2 text-sm font-bold uppercase tracking-wider text-black hidden md:flex"
                            >
                                Shop Collection
                                <span className="transition-transform duration-300 group-hover:translate-x-1">
                                    →
                                </span>
                            </a>

                            {/* SLIDER CONTROLS */}
                            <div className="md:mt-12 flex gap-3">
                                <button
                                    onClick={() => swiper?.slidePrev()}
                                    aria-label="Previous products"
                                    className="cursor-pointer flex h-12 w-12 items-center justify-center rounded-full border border-black/20 text-xl text-black transition-all duration-300 hover:border-black hover:bg-black hover:text-white"
                                >
                                    <GrFormPrevious className="text-2xl" />
                                </button>

                                <button
                                    onClick={() => swiper?.slideNext()}
                                    aria-label="Next products"
                                    className="cursor-pointer flex h-12 w-12 items-center justify-center rounded-full border border-black/20 text-xl text-black transition-all duration-300 hover:border-black hover:bg-black hover:text-white"
                                >
                                    <GrFormNext className="text-2xl" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT PRODUCT SLIDER */}
                    <div className="relative z-0 min-w-0 overflow-hidden pl-5 md:pl-10 lg:pl-0">
                        <Swiper
                            onSwiper={setSwiper}
                            spaceBetween={24}
                            slidesPerView="auto"
                            grabCursor
                            speed={700}
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
                                    <div className="group">
                                        {/* PRODUCT IMAGE */}
                                        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#D9D2CD]">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                sizes="(max-width: 640px) 75vw, (max-width: 1280px) 350px, 420px"
                                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                            />

                                            {/* ADD TO CART */}
                                            <div className="absolute inset-x-0 bottom-0 p-3 opacity-100 transition-all duration-300 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                                                <button className="w-full rounded-full bg-black/60 hover:bg-black/80 text-white/90 hover:text-white backdrop-blur-xs px-5 py-4 text-xs font-bold uppercase tracking-wider shadow-lg transition-all duration-300 md:text-sm cursor-pointer">
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>

                                        {/* PRODUCT DETAILS */}
                                        <div className="mt-5 flex items-start justify-between gap-4">
                                            <a
                                                href={`/products/${product.slug}`}
                                                className="max-w-[75%] text-base font-semibold leading-6 text-gray-900 transition-colors hover:text-gray-500 md:text-lg"
                                            >
                                                {product.name}
                                            </a>

                                            <span className="shrink-0 text-base font-bold text-black">
                                                ৳{product.price}
                                            </span>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}

                            {/* BROWSE ALL CARD */}
                            <SwiperSlide className="!w-[75vw] sm:!w-[350px] xl:!w-[420px]">
                                <a
                                    href="/collections/new-arrivals"
                                    className="group flex aspect-[3/4] flex-col items-center justify-center rounded-2xl bg-[#DCD3CD] transition-colors duration-500 hover:bg-[#171717]"
                                >
                                    <span className="text-3xl font-extrabold tracking-tight text-black transition-colors group-hover:text-white md:text-4xl">
                                        Browse All
                                    </span>

                                    <span className="mt-6 flex h-14 w-14 items-center justify-center rounded-full border border-black text-2xl text-black transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-black">
                                        →
                                    </span>

                                    <span className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-gray-600 transition-colors group-hover:text-gray-300">
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
