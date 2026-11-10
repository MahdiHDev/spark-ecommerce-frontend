"use client";

import Image from "next/image";
import { useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import "swiper/css";

const shoeProducts = [
    {
        id: 1,
        name: "Urban Classic Sneakers",
        price: 2499,
        image: "/images/shoes/shoe1.jpg",
        slug: "urban-classic-sneakers",
    },
    {
        id: 2,
        name: "Minimal Leather Sneakers",
        price: 2999,
        image: "/images/shoes/shoe2.jpg",
        slug: "minimal-leather-sneakers",
    },
    {
        id: 3,
        name: "Retro Street Sneakers",
        price: 2799,
        image: "/images/shoes/shoe3.jpg",
        slug: "retro-street-sneakers",
    },
    {
        id: 4,
        name: "Premium Casual Shoes",
        price: 2599,
        image: "/images/shoes/shoe4.jpg",
        slug: "premium-casual-shoes",
    },
    {
        id: 5,
        name: "Everyday White Sneakers",
        price: 2299,
        image: "/images/shoes/shoe5.jpg",
        slug: "everyday-white-sneakers",
    },
    {
        id: 6,
        name: "Everyday White Sneakers",
        price: 2299,
        image: "/images/shoes/shoe6.jpg",
        slug: "everyday-white-sneakers",
    },
    {
        id: 7,
        name: "Everyday White Sneakers",
        price: 2299,
        image: "/images/shoes/shoe7.jpg",
        slug: "everyday-white-sneakers",
    },
    {
        id: 8,
        name: "Everyday White Sneakers",
        price: 2299,
        image: "/images/shoes/shoe8.jpg",
        slug: "everyday-white-sneakers",
    },
    {
        id: 9,
        name: "Everyday White Sneakers",
        price: 2299,
        image: "/images/shoes/shoe9.jpg",
        slug: "everyday-white-sneakers",
    },
    {
        id: 10,
        name: "Everyday White Sneakers",
        price: 2299,
        image: "/images/shoes/shoe10.jpg",
        slug: "everyday-white-sneakers",
    },
];

export default function ShoesSection() {
    const [swiper, setSwiper] = useState<SwiperType | null>(null);

    return (
        <section className="w-full overflow-x-clip bg-white py-16 md:py-24 lg:py-28">
            <div className="mx-auto max-w-[1800px]">
                {/* HEADER */}
                <div className="mb-10 flex items-end justify-between px-5 md:mb-14 md:px-10 lg:px-16">
                    <div>
                        <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-orange-600 hidden md:block">
                            Walk Your Own Way
                        </p>

                        <h2 className="text-4xl font-extrabold tracking-tight text-black md:text-6xl xl:text-7xl">
                            Shoes<span className="text-orange-600">.</span>
                        </h2>

                        <p className="mt-4 text-sm text-gray-600 md:text-base hidden md:block">
                            Find your style. Make every step count.
                        </p>
                    </div>

                    {/* NAVIGATION */}
                    <div className="flex shrink-0 gap-3">
                        <button
                            onClick={() => swiper?.slidePrev()}
                            aria-label="Previous shoes"
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-black/20 text-xl transition-all hover:bg-black hover:text-white md:h-14 md:w-14"
                        >
                            <GrFormPrevious className="text-2xl" />
                        </button>

                        <button
                            onClick={() => swiper?.slideNext()}
                            aria-label="Next shoes"
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-black/20 text-xl transition-all hover:bg-black hover:text-white md:h-14 md:w-14"
                        >
                            <GrFormNext className="text-2xl" />
                        </button>
                    </div>
                </div>

                {/* SHOES SLIDER */}
                <div className="pl-5 md:pl-10 lg:pl-16">
                    <Swiper
                        onSwiper={setSwiper}
                        slidesPerView={1.2}
                        slidesPerGroup={1}
                        spaceBetween={16}
                        speed={700}
                        simulateTouch={false}
                        allowTouchMove={true}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 24,
                            },
                            1280: {
                                slidesPerView: 4,
                                spaceBetween: 28,
                            },
                        }}
                        className="!overflow-visible"
                    >
                        {shoeProducts.map((shoe) => (
                            <SwiperSlide key={shoe.id}>
                                <div className="group">
                                    {/* SQUARE IMAGE */}
                                    <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#DCD3CD]">
                                        <Image
                                            src={shoe.image}
                                            alt={shoe.name}
                                            fill
                                            sizes="(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 25vw"
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />

                                        <span className="absolute left-4 top-4 rounded-full bg-white/20 backdrop-blur-md px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-black">
                                            New Drop
                                        </span>

                                        {/* ADD TO CART */}
                                        <div className="absolute inset-x-0 bottom-0 p-3 opacity-100 transition-all duration-300 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                                            <button className="w-full rounded-full bg-black/60 hover:bg-black/80 text-white/90 hover:text-white backdrop-blur-xs px-5 py-4 text-xs font-bold uppercase tracking-wider shadow-lg transition-all duration-300 md:text-sm cursor-pointer">
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>

                                    {/* PRODUCT DETAILS */}
                                    <div className="mt-4 flex items-start justify-between gap-3">
                                        <a
                                            href={`/products/${shoe.slug}`}
                                            className="text-sm font-semibold leading-6 text-gray-900 transition-colors hover:text-gray-500 md:text-base"
                                        >
                                            {shoe.name}
                                        </a>

                                        <span className="shrink-0 text-sm font-bold text-orange-600 md:text-base">
                                            ৳{shoe.price}
                                        </span>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}

                        {/* BROWSE ALL */}
                        <SwiperSlide>
                            <a
                                href="/collections/shoes"
                                className="group flex aspect-square flex-col items-center justify-center rounded-2xl bg-[#DCD3CD] transition-colors duration-500 hover:bg-black"
                            >
                                <span className="text-2xl font-extrabold tracking-tight text-black transition-colors group-hover:text-white md:text-3xl">
                                    Browse All
                                </span>

                                <span className="mt-5 flex h-12 w-12 items-center justify-center rounded-full border border-black text-xl text-black transition-all group-hover:border-white group-hover:bg-white group-hover:text-black">
                                    →
                                </span>

                                <span className="mt-4 text-[10px] font-semibold uppercase tracking-widest text-gray-600 transition-colors group-hover:text-gray-300">
                                    Explore Shoes
                                </span>
                            </a>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </section>
    );
}
