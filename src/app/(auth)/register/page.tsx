"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Validation schema
const registerSchema = z
    .object({
        name: z
            .string()
            .trim()
            .min(1, "Full name is required")
            .min(2, "Name must be at least 2 characters")
            .max(50, "Name cannot exceed 50 characters"),

        email: z
            .string()
            .trim()
            .min(1, "Email is required")
            .email("Please enter a valid email address"),

        password: z
            .string()
            .min(1, "Password is required")
            .min(8, "Password must be at least 8 characters")
            .regex(/[A-Z]/, "Password must contain an uppercase letter")
            .regex(/[a-z]/, "Password must contain a lowercase letter")
            .regex(/[0-9]/, "Password must contain a number"),

        confirmPassword: z.string().min(1, "Please confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [serverError, setServerError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    // Email registration
    const onSubmit = async (data: RegisterFormValues) => {
        setServerError("");

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                setServerError(
                    result.message || "Unable to create your account.",
                );
                return;
            }

            router.push("/login?registered=true");
        } catch {
            setServerError("Something went wrong. Please try again.");
        }
    };

    // Google registration
    const handleGoogleSignup = async () => {
        await signIn("google", {
            callbackUrl: "/",
        });
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

                {/* Heading */}
                <div className="text-center mt-6 mb-7">
                    <h2 className="text-3xl font-bold">Create Account</h2>

                    <p className="text-sm opacity-60 mt-2">
                        Join SPARK and discover your style.
                    </p>
                </div>

                {/* Google Signup */}
                <button
                    type="button"
                    onClick={handleGoogleSignup}
                    className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-md font-medium text-sm hover:bg-black/5 transition"
                >
                    <svg viewBox="0 0 48 48" className="w-5 h-5">
                        <path
                            fill="#EA4335"
                            d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                        />
                        <path
                            fill="#4285F4"
                            d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.76 7.18l7.73 6C44.42 37.97 46.98 31.86 46.98 24.55z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.97-6.19z"
                        />
                        <path
                            fill="#34A853"
                            d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.15 1.45-4.9 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                        />
                    </svg>
                    Continue with Google
                </button>

                {/* Divider */}
                <div className="flex items-center gap-4 my-6">
                    <div className="h-px flex-1 bg-gray-300" />

                    <span className="text-xs opacity-50 uppercase tracking-wider">
                        Or register with email
                    </span>

                    <div className="h-px flex-1 bg-gray-300" />
                </div>

                {/* Register Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Full Name */}
                    <div>
                        <label className="text-sm font-medium block mb-2">
                            Full Name
                        </label>

                        <div className="relative">
                            <User
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40"
                            />

                            <input
                                type="text"
                                placeholder="John Doe"
                                autoComplete="name"
                                {...register("name")}
                                className="w-full h-12 pl-11 pr-4 rounded-md border border-gray-300 bg-transparent outline-none focus:border-primary transition text-sm"
                            />
                        </div>

                        {errors.name && (
                            <p className="text-red-500 text-xs mt-2">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

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

                    {/* Password */}
                    <div>
                        <label className="text-sm font-medium block mb-2">
                            Password
                        </label>

                        <div className="relative">
                            <Lock
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40"
                            />

                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a password"
                                autoComplete="new-password"
                                {...register("password")}
                                className="w-full h-12 pl-11 pr-12 rounded-md border border-gray-300 bg-transparent outline-none focus:border-primary transition text-sm"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={
                                    showPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                                className="absolute right-4 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100"
                            >
                                {showPassword ? (
                                    <EyeOff size={18} />
                                ) : (
                                    <Eye size={18} />
                                )}
                            </button>
                        </div>

                        {errors.password && (
                            <p className="text-red-500 text-xs mt-2">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="text-sm font-medium block mb-2">
                            Confirm Password
                        </label>

                        <div className="relative">
                            <Lock
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40"
                            />

                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm your password"
                                autoComplete="new-password"
                                {...register("confirmPassword")}
                                className="w-full h-12 pl-11 pr-12 rounded-md border border-gray-300 bg-transparent outline-none focus:border-primary transition text-sm"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                                aria-label={
                                    showConfirmPassword
                                        ? "Hide confirm password"
                                        : "Show confirm password"
                                }
                                className="absolute right-4 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100"
                            >
                                {showConfirmPassword ? (
                                    <EyeOff size={18} />
                                ) : (
                                    <Eye size={18} />
                                )}
                            </button>
                        </div>

                        {errors.confirmPassword && (
                            <p className="text-red-500 text-xs mt-2">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>

                    {/* Server Error */}
                    {serverError && (
                        <p role="alert" className="text-red-500 text-sm">
                            {serverError}
                        </p>
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
                                Creating Account...
                            </>
                        ) : (
                            "Create Account"
                        )}
                    </button>
                </form>

                {/* Login Link */}
                <p className="text-center text-sm mt-7 opacity-70">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-semibold underline underline-offset-4 opacity-100"
                    >
                        Sign In
                    </Link>
                </p>

                {/* Footer */}
                <p className="text-center text-sm mt-3 opacity-70">
                    <Link href="/" className="underline underline-offset-4">
                        Back To Home
                    </Link>
                </p>
            </div>
        </main>
    );
}
