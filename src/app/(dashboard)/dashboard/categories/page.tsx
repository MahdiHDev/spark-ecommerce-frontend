"use client";

import { AlertCircle, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
    type Category,
    getMockCategories,
} from "@/lib/mock-categories";

type CategoryRow = {
    category: Category;
    parentName: string;
    depth: number;
};

const PAGE_SIZE = 10;

function flattenCategories(
    categories: Category[],
    parentName = "—",
    depth = 0,
): CategoryRow[] {
    return categories.flatMap((category) => [
        { category, parentName, depth },
        ...(category.children?.length
            ? flattenCategories(category.children, category.name, depth + 1)
            : []),
    ]);
}

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        function loadCategories() {
            setLoading(true);
            setError("");

            try {
                setCategories(getMockCategories());
            } catch (caught) {
                setError(
                    caught instanceof Error
                        ? caught.message
                        : "Unable to load mock categories.",
                );
            } finally {
                setLoading(false);
            }
        }

        loadCategories();
    }, []);

    const totalPages = Math.max(1, Math.ceil(categories.length / PAGE_SIZE));
    const pageCategories = categories.slice(
        (page - 1) * PAGE_SIZE,
        page * PAGE_SIZE,
    );
    const rows = flattenCategories(pageCategories);

    return (
        <main className="flex-1 space-y-6 p-4 md:p-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Categories
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        View and manage your product categories.
                    </p>
                </div>
                <Link
                    href="/dashboard/categories/create"
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
                >
                    <Plus className="size-4" />
                    Create category
                </Link>
            </div>

            <section className="overflow-hidden rounded-lg border bg-white">
                {error ? (
                    <div
                        role="alert"
                        className="flex items-center gap-3 p-6 text-sm text-red-700"
                    >
                        <AlertCircle className="size-5 shrink-0" />
                        {error}
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[600px] text-left text-sm">
                                <thead className="border-b bg-muted/40 text-muted-foreground">
                                    <tr>
                                        <th className="px-5 py-3 font-medium">
                                            Name
                                        </th>
                                        <th className="px-5 py-3 font-medium">
                                            Slug
                                        </th>
                                        <th className="px-5 py-3 font-medium">
                                            Parent category
                                        </th>
                                        <th className="px-5 py-3 font-medium">
                                            Created
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {loading ? (
                                        <tr>
                                            <td
                                                colSpan={4}
                                                className="px-5 py-12 text-center text-muted-foreground"
                                            >
                                                Loading categories…
                                            </td>
                                        </tr>
                                    ) : rows.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={4}
                                                className="px-5 py-12 text-center text-muted-foreground"
                                            >
                                                No categories found. Create
                                                your first category to get
                                                started.
                                            </td>
                                        </tr>
                                    ) : (
                                        rows.map(
                                            ({
                                                category,
                                                parentName,
                                                depth,
                                            }) => (
                                                <tr
                                                    key={category.id}
                                                    className="hover:bg-muted/20"
                                                >
                                                    <td className="px-5 py-4 font-medium">
                                                        <span
                                                            style={{
                                                                paddingLeft: `${depth * 20}px`,
                                                            }}
                                                        >
                                                            {category.name}
                                                        </span>
                                                    </td>
                                                    <td className="px-5 py-4 text-muted-foreground">
                                                        {category.slug}
                                                    </td>
                                                    <td className="px-5 py-4 text-muted-foreground">
                                                        {parentName}
                                                    </td>
                                                    <td className="px-5 py-4 text-muted-foreground">
                                                        {new Date(
                                                            category.createdAt,
                                                        ).toLocaleDateString()}
                                                    </td>
                                                </tr>
                                            ),
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex flex-col gap-3 border-t px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-sm text-muted-foreground">
                                {categories.length === 0
                                    ? "No categories"
                                    : `Page ${page} of ${totalPages} · ${categories.length} categories`}
                            </p>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setPage((current) =>
                                            Math.max(1, current - 1),
                                        )
                                    }
                                    disabled={loading || page <= 1}
                                    className="inline-flex h-9 items-center gap-1 rounded-md border px-3 text-sm transition hover:bg-muted disabled:pointer-events-none disabled:opacity-50"
                                >
                                    <ChevronLeft className="size-4" />
                                    Previous
                                </button>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setPage((current) =>
                                            Math.min(
                                                totalPages,
                                                current + 1,
                                            ),
                                        )
                                    }
                                    disabled={
                                        loading ||
                                        page >= totalPages
                                    }
                                    className="inline-flex h-9 items-center gap-1 rounded-md border px-3 text-sm transition hover:bg-muted disabled:pointer-events-none disabled:opacity-50"
                                >
                                    Next
                                    <ChevronRight className="size-4" />
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </section>
        </main>
    );
}
