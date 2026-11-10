"use client";

import { useState } from "react";

const faqs = [
    {
        question: "How long does delivery take?",
        answer: "Inside Dhaka, delivery usually takes 1–3 working days. Outside Dhaka, it may take 3–5 working days.",
    },
    {
        question: "Do you offer Cash on Delivery (COD)?",
        answer: "Yes! You can pay cash when your order is delivered to your doorstep.",
    },
    {
        question: "Can I exchange or return a product?",
        answer: "Yes, eligible products can be exchanged or returned according to our return and exchange policy.",
    },
    {
        question: "How do I choose the right fitting size?",
        answer: "You can check our size guide on the product page. If you need help, contact our customer support team.",
    },
    {
        question: "Do you restock sold-out items?",
        answer: "Some sold-out products are restocked. Follow our website and social media pages for new stock updates.",
    },
    {
        question: "How can I contact customer support?",
        answer: "You can contact our support team through our contact page or live chat for assistance with your order.",
    },
];

export default function FAQSection() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <section className="w-full bg-white py-16 md:py-24">
            <div className="mx-auto  max-w-7xl grid-cols-1 gap-12 px-5 md:px-10 lg:grid-cols-[1.8fr_1fr] lg:gap-20 lg:px-16">
                <div>
                    <h2 className="mb-8 text-3xl font-bold tracking-tight text-gray-900 md:mb-10 md:text-4xl text-center">
                        Frequently Asked Questions
                    </h2>

                    <div className="w-full">
                        {faqs.map((faq, index) => {
                            const isOpen = activeIndex === index;

                            return (
                                <div
                                    key={index}
                                    className="border-b border-gray-200"
                                >
                                    <button
                                        onClick={() =>
                                            setActiveIndex(
                                                isOpen ? null : index,
                                            )
                                        }
                                        aria-expanded={isOpen}
                                        className="flex w-full items-center justify-between gap-5 py-5 text-left md:py-6"
                                    >
                                        <span className="text-base font-semibold text-gray-900 md:text-xl">
                                            {faq.question}
                                        </span>

                                        <svg
                                            className={`h-5 w-5 shrink-0 text-gray-900 transition-transform duration-300 ${
                                                isOpen ? "rotate-180" : ""
                                            }`}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path
                                                d="m6 9 6 6 6-6"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </button>

                                    <div
                                        className={`grid transition-all duration-300 ease-in-out ${
                                            isOpen
                                                ? "grid-rows-[1fr] opacity-100"
                                                : "grid-rows-[0fr] opacity-0"
                                        }`}
                                    >
                                        <div className="overflow-hidden">
                                            <p className="max-w-3xl pb-6 pr-8 text-sm leading-7 text-gray-600 md:text-base">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
