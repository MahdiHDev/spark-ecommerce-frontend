"use client";

import { useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

interface Shoe {
    id: number;
    name: string;
    price: number;
    image: string;
    slug: string;
}

const shoes: Shoe[] = [
    {
        id: 1,
        name: "Premium White Sneakers",
        price: 2499,
        image: "/images/shoes/shoe1.jpg",
        slug: "premium-white-sneakers",
    },
    {
        id: 2,
        name: "Classic Black Leather Shoes",
        price: 2999,
        image: "/images/shoes/shoe2.jpg",
        slug: "black-leather-shoes",
    },
    {
        id: 3,
        name: "Minimal Everyday Sneakers",
        price: 2199,
        image: "/images/shoes/shoe3.jpg",
        slug: "everyday-sneakers",
    },
    {
        id: 4,
        name: "Retro Streetwear Sneakers",
        price: 2799,
        image: "/images/shoes/shoe4.jpg",
        slug: "retro-sneakers",
    },
];

export default function ShoesSection() {
    const [swiper, setSwiper] = useState<SwiperType | null>(null);

    return (
        <section className="relative w-full overflow-x-clip bg-[#EDE5E1] py-16 md:py-24 lg:py-28">
            <div className="mx-auto max-w-[1800px] px-5 md:px-10 lg:px-16">
                {/* SECTION HEADER */}
                <div className="mb-10 flex items-end justify-between md:mb-14">
                    <div>
                        <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-orange-600">
                            Step Into Style
                        </p>

                        <h2 className="text-4xl font-extrabold tracking-tight text-black md:text-6xl xl:text-7xl">
                            Shoes<span className="text-orange-600">.</span>
                        </h2>

                        <p className="mt-4 text-sm text-gray-600 md:text-base">
                            Find your perfect pair. Designed for every step.
                        </p>
                    </div>

                    {/* NAVIGATION */}
                    <div className="flex shrink-0 gap-2 md:gap-3">
                        <button
                            onClick={() => swiper?.slidePrev()}
                            aria-label="Previous shoe"
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-black/20 text-xl transition-all duration-300 hover:bg-black hover:text-white md:h-14 md:w-14"
                        >
                            ←
                        </button>

                        <button
                            onClick={() => swiper?.slideNext()}
                            aria-label="Next shoe"
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-black/20 text-xl transition-all duration-300 hover:bg-black hover:text-white md:h-14 md:w-14"
                        >
                            →
                        </button>
                    </div>
                </div>

                {/* SHOES SLIDER */}
                <Swiper
                    onSwiper={setSwiper}
                    slidesPerView={1}
                    slidesPerGroup={1}
                    spaceBetween={0}
                    speed={800}
                    grabCursor={false}
                    simulateTouch={false}
                    allowTouchMove={true}
                    loop={false}
                    className="w-full"
                >
                    {shoes.map((shoe) => (
                        <SwiperSlide key={shoe.id}></SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
