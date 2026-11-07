"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
    {
        id: 1,
        image: "/images/banners/hero-banner.png",
        eyebrow: "NEW COLLECTION 2026",
        title: "STYLE IN MOTION",
        description:
            "Discover the latest styles designed for everyday confidence.",
        buttonText: "Explore Collection",
        href: "/products",
        position: "center",
    },
    {
        id: 2,
        image: "/images/banners/hero-banner2.png",
        eyebrow: "PREMIUM ESSENTIALS",
        title: "DEFINE YOUR STYLE",
        description: "Elevate your everyday wardrobe with timeless essentials.",
        buttonText: "Shop Now",
        href: "/products",
        position: "center",
    },
    {
        id: 3,
        image: "/images/banners/hero-banner3.png",
        eyebrow: "FRESH ARRIVALS",
        title: "MADE TO STAND OUT",
        description: "Find your next favorite look from our latest collection.",
        buttonText: "Discover More",
        href: "/products?sort=newest",
        position: "center",
    },
];

export function HeroCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="mx-auto w-full max-w-360 px-4 py-4 md:px-8 md:py-6">
            {/* Carousel */}
            <div className="group relative aspect-[2.9/1] w-full overflow-hidden rounded-lg bg-zinc-200 sm:aspect-[16/7] lg:aspect-[2.93/1]">
                {/* Slides */}
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                            currentSlide === index
                                ? "opacity-100"
                                : "opacity-0 pointer-events-none"
                        }`}
                    >
                        {/* Background Image */}
                        <Image
                            src={slide.image}
                            alt={slide.title}
                            fill
                            priority={index === 0}
                            sizes="(max-width: 768px) 100vw, 1440px"
                            className="object-cover object-center"
                            style={{
                                objectPosition: slide.position,
                            }}
                        />
                        \
                    </div>
                ))}

                {/* Previous Button */}
                <button
                    onClick={prevSlide}
                    aria-label="Previous slide"
                    className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-black opacity-0 shadow-md transition-all hover:bg-orange-500 hover:text-white group-hover:opacity-100 sm:left-5 sm:h-11 sm:w-11"
                >
                    <ChevronLeft size={22} />
                </button>

                {/* Next Button */}
                <button
                    onClick={nextSlide}
                    aria-label="Next slide"
                    className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-black opacity-0 shadow-md transition-all hover:bg-orange-500 hover:text-white group-hover:opacity-100 sm:right-5 sm:h-11 sm:w-11"
                >
                    <ChevronRight size={22} />
                </button>

                {/* Pagination Dots */}
                <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 sm:bottom-6">
                    {slides.map((slide, index) => (
                        <button
                            key={slide.id}
                            onClick={() => setCurrentSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                currentSlide === index
                                    ? "w-8 bg-orange-500"
                                    : "w-2 bg-white/70 hover:bg-white"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
