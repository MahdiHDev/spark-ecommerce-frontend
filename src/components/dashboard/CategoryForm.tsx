"use client";

import { AlertCircle, ArrowLeft, LoaderCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type ChangeEvent } from "react";
import {
    addMockCategory,
    DEFAULT_CATEGORY_IMAGE,
    getMockCategories,
    type Category,
    updateMockCategory,
} from "@/lib/mock-categories";

type CategoryFormProps = {
    categoryId?: string;
};

function findCategory(categories: Category[], id: string): Category | undefined {
    for (const category of categories) {
        if (category.id === id) return category;
        const childMatch = category.children
            ? findCategory(category.children, id)
            : undefined;
        if (childMatch) return childMatch;
    }

    return undefined;
}

function getCategoryTreeIds(category: Category): Set<string> {
    const ids = new Set([category.id]);

    function addDescendants(current: Category) {
        current.children?.forEach((child) => {
            ids.add(child.id);
            addDescendants(child);
        });
    }

    addDescendants(category);
    return ids;
}

function flattenCategories(
    categories: Category[],
    depth = 0,
): { id: string; label: string }[] {
    return categories.flatMap((category) => [
        { id: category.id, label: `${"— ".repeat(depth)}${category.name}` },
        ...(category.children?.length
            ? flattenCategories(category.children, depth + 1)
            : []),
    ]);
}

export function CategoryForm({ categoryId }: CategoryFormProps) {
    const router = useRouter();
    const isEditing = Boolean(categoryId);
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [image, setImage] = useState("");
    const [parentId, setParentId] = useState("");
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState("");
    const [notFound, setNotFound] = useState(false);
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        try {
            const storedCategories = getMockCategories();
            setCategories(storedCategories);

            if (categoryId) {
                const category = findCategory(storedCategories, categoryId);
                if (!category) {
                    setNotFound(true);
                } else {
                    setName(category.name);
                    setSlug(category.slug);
                    setImage(category.image ?? DEFAULT_CATEGORY_IMAGE);
                    setParentId(category.parentId ?? "");
                }
            }
        } catch (caught) {
            setLoadError(
                caught instanceof Error
                    ? caught.message
                    : "Unable to load categories.",
            );
        } finally {
            setIsLoading(false);
        }
    }, [categoryId]);

    function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setImage("");
            setError("Choose a valid image file.");
            return;
        }

        if (file.size > 1024 * 1024) {
            setImage("");
            setError("The image must be smaller than 1 MB.");
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result !== "string") {
                setError("Unable to read the selected image.");
                return;
            }

            setImage(reader.result);
            setError("");
        };
        reader.onerror = () => {
            setImage("");
            setError("Unable to read the selected image.");
        };
        reader.readAsDataURL(file);
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");

        const trimmedName = name.trim();
        const trimmedSlug = slug.trim();

        if (!trimmedName || !trimmedSlug || !image) {
            setError("Category name, slug, and image are required.");
            return;
        }

        setIsSubmitting(true);

        try {
            const categoryData = {
                name: trimmedName,
                slug: trimmedSlug,
                image,
                parentId: parentId || null,
            };

            if (categoryId) {
                updateMockCategory(categoryId, categoryData);
            } else {
                addMockCategory({
                    id: crypto.randomUUID(),
                    ...categoryData,
                    createdAt: new Date().toISOString(),
                    children: [],
                });
            }

            router.push("/dashboard/categories");
            router.refresh();
        } catch (caught) {
            setError(
                caught instanceof Error
                    ? caught.message
                    : `Unable to ${isEditing ? "update" : "create"} the category.`,
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    if (isLoading) {
        return (
            <main className="flex-1 p-4 md:p-8">
                <p className="text-sm text-muted-foreground">
                    Loading category…
                </p>
            </main>
        );
    }

    if (loadError || notFound) {
        return (
            <main className="flex-1 space-y-4 p-4 md:p-8">
                <p
                    role="alert"
                    className="flex items-center gap-2 text-sm text-red-600"
                >
                    <AlertCircle className="size-4" />
                    {loadError || "Category not found."}
                </p>
                <Link
                    href="/dashboard/categories"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                >
                    <ArrowLeft className="size-4" />
                    Back to categories
                </Link>
            </main>
        );
    }

    const categoryBeingEdited = categoryId
        ? findCategory(categories, categoryId)
        : undefined;
    const excludedParentIds = categoryBeingEdited
        ? getCategoryTreeIds(categoryBeingEdited)
        : new Set<string>();
    const parentOptions = flattenCategories(categories).filter(
        (category) => !excludedParentIds.has(category.id),
    );

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
                    {isEditing ? "Edit category" : "Create category"}
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    {isEditing
                        ? "Update this category’s details."
                        : "Add a category to organize your products."}
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
                        htmlFor="category-image"
                        className="text-sm font-medium"
                    >
                        Category image
                    </label>
                    <input
                        id="category-image"
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        required={!image}
                        className="block w-full cursor-pointer rounded-md border bg-background text-sm file:mr-4 file:h-10 file:border-0 file:border-r file:px-3 file:text-sm file:font-medium"
                    />
                    <p className="text-xs text-muted-foreground">
                        Choose an image up to 1 MB. Mock images are stored in
                        this browser.
                    </p>
                    {image && (
                        <div className="relative mt-3 size-32 overflow-hidden rounded-md border bg-muted">
                            <Image
                                src={image}
                                alt="Category image preview"
                                fill
                                unoptimized
                                sizes="128px"
                                className="object-cover"
                            />
                        </div>
                    )}
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
                        className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring"
                    >
                        <option value="">None (top-level category)</option>
                        {parentOptions.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.label}
                            </option>
                        ))}
                    </select>
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
                        {isSubmitting
                            ? isEditing
                                ? "Saving…"
                                : "Creating…"
                            : isEditing
                              ? "Save changes"
                              : "Create category"}
                    </button>
                </div>
            </form>
        </main>
    );
}
