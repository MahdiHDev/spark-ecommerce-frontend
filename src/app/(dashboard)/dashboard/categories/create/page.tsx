"use client";

import { ArrowLeft, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
    addMockCategory,
    getMockCategories,
    type Category,
} from "@/lib/mock-categories";

function flattenParentCategories(
    categories: Category[],
    depth = 0,
): { id: string; label: string }[] {
    return categories.flatMap((category) => [
        { id: category.id, label: `${"— ".repeat(depth)}${category.name}` },
        ...(category.children?.length
            ? flattenParentCategories(category.children, depth + 1)
            : []),
    ]);
}

export default function CreateCategoryPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [parentId, setParentId] = useState("");
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const [categoriesError, setCategoriesError] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        function loadCategories() {
            try {
                setCategories(getMockCategories());
            } catch (caught) {
                setCategoriesError(
                    caught instanceof Error
                        ? caught.message
                        : "Unable to load mock categories.",
                );
            } finally {
                setCategoriesLoading(false);
            }
        }

        loadCategories();
    }, []);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");

        const trimmedName = name.trim();
        const trimmedSlug = slug.trim();

        if (!trimmedName || !trimmedSlug) {
            setError("Category name and slug are required.");
            return;
        }

        setIsSubmitting(true);

        try {
            const category: Category = {
                id: crypto.randomUUID(),
                name: trimmedName,
                slug: trimmedSlug,
                parentId: parentId || null,
                createdAt: new Date().toISOString(),
                children: [],
            };
            addMockCategory(category);

            router.push("/dashboard/categories");
            router.refresh();
        } catch (caught) {
            setError(
                caught instanceof Error
                    ? caught.message
                    : "Unable to create the mock category.",
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <main className="flex-1 space-y-6 p-4 md:p-8">
            <div>
                <Link
                    href="/dashboard/categories"
                    className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
                >
                    <ArrowLeft className="size-4" />
                    Back to categories
                </Link>
                <h1 className="text-2xl font-semibold tracking-tight">
                    Create category
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Add a category to organize your products.
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="max-w-2xl space-y-5 rounded-lg border bg-white p-5 md:p-6"
            >
                <div className="space-y-2">
                    <label
                        htmlFor="category-name"
                        className="text-sm font-medium"
                    >
                        Category name
                    </label>
                    <input
                        id="category-name"
                        name="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="e.g. Shirts"
                        required
                        maxLength={100}
                        className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring"
                    />
                </div>

                <div className="space-y-2">
                    <label
                        htmlFor="category-slug"
                        className="text-sm font-medium"
                    >
                        Category slug
                    </label>
                    <input
                        id="category-slug"
                        name="slug"
                        value={slug}
                        onChange={(event) => setSlug(event.target.value)}
                        placeholder="e.g. shirts"
                        required
                        className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring"
                    />
                    <p className="text-xs text-muted-foreground">
                        Use a URL-friendly value, such as{" "}
                        <code className="rounded bg-muted px-1 py-0.5">
                            check-shirt
                        </code>
                        .
                    </p>
                </div>

                <div className="space-y-2">
                    <label
                        htmlFor="category-parent"
                        className="text-sm font-medium"
                    >
                        Parent category{" "}
                        <span className="font-normal text-muted-foreground">
                            (optional)
                        </span>
                    </label>
                    <select
                        id="category-parent"
                        name="parentId"
                        value={parentId}
                        onChange={(event) => setParentId(event.target.value)}
                        disabled={categoriesLoading || Boolean(categoriesError)}
                        className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60"
                    >
                        <option value="">
                            {categoriesLoading
                                ? "Loading categories…"
                                : "None (top-level category)"}
                        </option>
                        {flattenParentCategories(categories).map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.label}
                            </option>
                        ))}
                    </select>
                    {categoriesError && (
                        <p role="alert" className="text-xs text-red-600">
                            {categoriesError}
                        </p>
                    )}
                </div>

                {error && (
                    <p role="alert" className="text-sm text-red-600">
                        {error}
                    </p>
                )}

                <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                    <Link
                        href="/dashboard/categories"
                        className="inline-flex h-10 items-center justify-center rounded-md border px-4 text-sm font-medium transition hover:bg-muted"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-60"
                    >
                        {isSubmitting && (
                            <LoaderCircle className="size-4 animate-spin" />
                        )}
                        {isSubmitting ? "Creating…" : "Create category"}
                    </button>
                </div>
            </form>
        </main>
    );
}
