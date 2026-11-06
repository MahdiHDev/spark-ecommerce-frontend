"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const banners = [
    "/images/banners/hero-banner.png",
    "/images/banners/hero-banner2.png",
    "/images/banners/hero-banner.png",
];

export default function HeroSection() {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % banners.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="w-full px-4 md:px-6">
            <div className="relative mx-auto w-full max-w-[1440px] overflow-hidden rounded-xl">
                {/* Banner Slider */}
                <div className="relative aspect-[1920/656] w-full">
                    {banners.map((banner, index) => (
                        <div
                            key={banner}
                            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                                activeIndex === index
                                    ? "translate-y-0 opacity-100"
                                    : "translate-y-5 opacity-0"
                            }`}
                            style={{
                                zIndex: activeIndex === index ? 1 : 0,
                                pointerEvents:
                                    activeIndex === index ? "auto" : "none",
                            }}
                        >
                            <Image
                                src={banner}
                                alt={`SPARK Fashion Banner ${index + 1}`}
                                fill
                                priority={index === 0}
                                sizes="(max-width: 768px) 100vw, 1440px"
                                className="object-contain"
                            />
                        </div>
                    ))}
                </div>

                {/* Bottom Center Dots */}
                <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
                    {banners.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            aria-label={`Go to banner ${index + 1}`}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                activeIndex === index
                                    ? "w-6 bg-white"
                                    : "w-2 bg-white/50"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
