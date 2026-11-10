"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Validation schema
const loginSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Please enter a valid email address"),

    password: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [serverError, setServerError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    // Email login
    const onSubmit = async (data: LoginFormValues) => {
        setServerError("");

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                setServerError(result.message || "Invalid email or password");
                return;
            }

            router.push("/");
            router.refresh();
        } catch {
            setServerError("Something went wrong. Please try again.");
        }
    };

    // Google login
    const handleGoogleLogin = async () => {
        await signIn("google", {
            callbackUrl: "/",
        });
    };

    return (
        <main className="min-h-screen flex items-center justify-center px-5 py-12 ">
            <div className="w-full max-w-md bg-white p-4 rounded-xl border border-gray-300">
                {/* Logo */}
                <Link href="/" className="block text-center">
                    <Image
                        src="/images/logo.png"
                        alt="MENS FASHION"
                        width={120}
                        height={38}
                        className="mx-auto h-auto brightness-0"
                    />

                    <p className="text-[10px] tracking-[0.5em]  opacity-50">
                        MENS FASHION
                    </p>
                </Link>

                {/* Heading */}
                <div className="text-center mt-6 mb-8">
                    <h2 className="text-3xl font-bold">Welcome Back</h2>

                    <p className="text-sm opacity-60 mt-2">
                        Sign in to your account to continue.
                    </p>
                </div>

                {/* Google Login */}
                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-3 border border-gray-300  py-3 rounded-md font-medium text-sm hover:bg-black/5 transition"
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
                <div className="flex items-center gap-4 my-7">
                    <div className="h-px flex-1 bg-gray-300" />
                    <span className="text-xs opacity-50 uppercase tracking-wider">
                        Or continue with email
                    </span>
                    <div className="h-px flex-1 bg-gray-300" />
                </div>

                {/* Login Form */}
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
                                className="w-full h-12 pl-11 pr-4 rounded-md border border-gray-300  bg-transparent outline-none focus:border-primary transition text-sm"
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
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-sm font-medium">
                                Password
                            </label>

                            <Link
                                href="/forgot-password"
                                className="text-xs opacity-60 hover:opacity-100 underline underline-offset-4"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <div className="relative">
                            <Lock
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40"
                            />

                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                autoComplete="current-password"
                                {...register("password")}
                                className="w-full h-12 pl-11 pr-12 rounded-md border border-gray-300  bg-transparent outline-none focus:border-primary transition text-sm"
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
                                Signing in...
                            </>
                        ) : (
                            "Sign In"
                        )}
                    </button>
                </form>

                {/* Register */}
                <p className="text-center text-sm mt-8 opacity-70">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/register"
                        className="font-semibold underline underline-offset-4 opacity-100"
                    >
                        Create Account
                    </Link>
                </p>
                <p className="text-center text-sm mt-2 opacity-70">
                    <Link
                        href="/"
                        className="underline underline-offset-4 opacity-100"
                    >
                        Back To Home
                    </Link>
                </p>
            </div>
        </main>
    );
}
