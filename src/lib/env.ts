import { z } from "zod";

const envSchema = z.object({
    NODE_ENV: z
        .enum(["development", "production", "test"])
        .default("development"),

    NEXT_PUBLIC_API_URL: z.string().url({
        message: "NEXT_PUBLIC_API_URL must be a valid URL",
    }),

    NEXT_PUBLIC_IMAGE_URL: z.string().url().optional(),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
    console.error(
        "❌ Invalid environment variables:",
        z.treeifyError(env.error),
    );

    throw new Error("Invalid environment variables");
}

export const envVariables = env.data;
