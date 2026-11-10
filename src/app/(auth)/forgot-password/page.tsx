"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Validation schema
const forgotPasswordSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, "Email address is required")
        .email("Please enter a valid email address"),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
    const [serverError, setServerError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ForgotPasswordValues>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    // Send password reset email
    const onSubmit = async (data: ForgotPasswordValues) => {
        setServerError("");
        setSuccessMessage("");

        try {
            const response = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                setServerError(
                    result.message || "Unable to process your request.",
                );
                return;
            }

            setSuccessMessage(
                result.message ||
                    "If an account exists with this email, you will receive a password reset link shortly.",
            );

            reset();
        } catch {
            setServerError("Something went wrong. Please try again.");
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center px-5 py-12">
            <div className="w-full max-w-md bg-white p-5 sm:p-6 rounded-xl border border-gray-300">
                {/* Logo */}
                <Link href="/" className="block text-center">
                    <Image
                        src="/images/logo.png"
                        alt="SPARK"
                        width={120}
                        height={38}
                        className="mx-auto h-auto brightness-0"
                    />

                    <p className="text-[10px] tracking-[0.5em] opacity-50">
                        MENS FASHION
                    </p>
                </Link>

                {/* Icon */}
                <div className="flex justify-center mt-10">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                        <Mail size={28} className="text-gray-700" />
                    </div>
                </div>

                {/* Heading */}
                <div className="text-center mt-6 mb-8">
                    <h2 className="text-3xl font-bold">Forgot Password?</h2>

                    <p className="text-sm opacity-60 mt-3 leading-relaxed">
                        No worries! Enter your email address and we&apos;ll send
                        you a link to reset your password.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Email */}
                    <div>
                        <label className="text-sm font-medium block mb-2">
                            Email Address
                        </label>

                        <div className="relative">
                            <Mail
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40"
                            />

                            <input
                                type="email"
                                placeholder="you@example.com"
                                autoComplete="email"
                                {...register("email")}
                                className="w-full h-12 pl-11 pr-4 rounded-md border border-gray-300 bg-transparent outline-none focus:border-primary transition text-sm"
                            />
                        </div>

                        {errors.email && (
                            <p className="text-red-500 text-xs mt-2">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Error */}
                    {serverError && (
                        <p role="alert" className="text-red-500 text-sm">
                            {serverError}
                        </p>
                    )}

                    {/* Success */}
                    {successMessage && (
                        <div
                            role="status"
                            className="border border-green-200 bg-green-50 text-green-700 rounded-md p-3 text-sm leading-relaxed"
                        >
                            {successMessage}
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-12 bg-primary text-background rounded-md font-semibold text-sm uppercase tracking-wider hover:opacity-80 transition disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 size={18} className="animate-spin" />
                                Sending Link...
                            </>
                        ) : (
                            "Send Reset Link"
                        )}
                    </button>
                </form>

                {/* Back to Login */}
                <Link
                    href="/login"
                    className="flex items-center justify-center gap-2 text-sm font-semibold mt-8 hover:opacity-60 transition"
                >
                    <ArrowLeft size={16} />
                    Back to Login
                </Link>
            </div>
        </main>
    );
}
