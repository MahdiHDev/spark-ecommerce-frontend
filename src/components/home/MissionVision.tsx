"use client";

import Image from "next/image";
import { useState } from "react";

const tabs = [
    {
        id: "mission",
        label: "Our Mission",
        heading: "Style for Every Day",
        description:
            "Our mission is to create thoughtfully designed clothing that blends comfort, quality, and modern style, helping everyone feel confident in what they wear every day.",
    },
    {
        id: "vision",
        label: "Our Vision",
        heading: "A Wardrobe for Every Moment",
        description:
            "We envision a clothing brand known for versatile designs, lasting quality, and effortless style—made to fit seamlessly into the moments that matter.",
    },
];

export default function MissionVision() {
    const [activeTab, setActiveTab] = useState("mission");

    const activeContent = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];

    return (
        <section className="w-full overflow-hidden bg-[#EDE5E1] py-16 md:py-24 lg:py-28">
            <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-16">
                <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 lg:gap-16">
                    {/* LEFT IMAGE */}
                    <div className="relative  min-h-[300px] overflow-hidden rounded-2xl bg-[#DCD3CD] md:min-h-[400px]">
                        <Image
                            src="/images/our-mission-cover.jpg"
                            alt="Our Mission and Vision"
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover transition-transform duration-700 hover:scale-105"
                        />
                    </div>

                    {/* RIGHT CONTENT */}
                    <div className="flex w-full flex-col items-center justify-center py-5 text-center md:py-10">
                        {/* TABS */}
                        <div
                            role="tablist"
                            aria-label="Our mission and vision"
                            className="mb-10 flex w-full max-w-md items-center justify-center border-b border-black/15"
                        >
                            {tabs.map((tab) => {
                                const isActive = activeTab === tab.id;

                                return (
                                    <button
                                        key={tab.id}
                                        id={`${tab.id}-tab`}
                                        role="tab"
                                        aria-selected={isActive}
                                        aria-controls="mission-vision-panel"
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`relative flex-1 px-5 py-4 text-sm font-bold uppercase tracking-widest transition-colors duration-300 ${
                                            isActive
                                                ? "text-black"
                                                : "text-gray-500 hover:text-black"
                                        }`}
                                    >
                                        {tab.label}

                                        <span
                                            className={`absolute bottom-0 left-0 h-[2px] w-full origin-left bg-black transition-transform duration-300 ${
                                                isActive
                                                    ? "scale-x-100"
                                                    : "scale-x-0"
                                            }`}
                                        />
                                    </button>
                                );
                            })}
                        </div>

                        {/* TAB CONTENT */}
                        <div
                            key={activeContent.id}
                            id="mission-vision-panel"
                            role="tabpanel"
                            aria-labelledby={`${activeContent.id}-tab`}
                            className="w-full animate-[fadeUp_0.5s_ease-out]"
                        >
                            <h2 className="mx-auto max-w-xl text-3xl font-extrabold leading-tight tracking-tight text-black md:text-4xl lg:text-5xl">
                                {activeContent.heading}
                                <span className="text-orange-600">.</span>
                            </h2>

                            <p className="mx-auto mt-7 max-w-xl text-sm leading-8 text-gray-600 md:text-base md:leading-9">
                                {activeContent.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeUp {
                    from {
                        opacity: 0;
                        transform: translateY(15px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </section>
    );
}
