export type Category = {
    id: string;
    name: string;
    slug: string;
    parentId: string | null;
    createdAt: string;
    children?: Category[];
};

const STORAGE_KEY = "spark-dashboard-categories";

const defaultCategories: Category[] = [
    {
        id: "category-pant",
        name: "Pant",
        slug: "pant",
        parentId: null,
        createdAt: "2026-10-23T08:37:16.559Z",
        children: [],
    },
    {
        id: "category-shirt",
        name: "Shirt",
        slug: "shirt",
        parentId: null,
        createdAt: "2026-10-21T06:13:24.415Z",
        children: [
            {
                id: "category-check-shirt",
                name: "Check Shirt",
                slug: "check-shirt",
                parentId: "category-shirt",
                createdAt: "2026-10-21T06:13:49.003Z",
            },
        ],
    },
    {
        id: "category-t-shirt",
        name: "T-Shirt",
        slug: "t-shirt",
        parentId: null,
        createdAt: "2026-10-20T08:00:00.000Z",
        children: [],
    },
    {
        id: "category-jacket",
        name: "Jacket",
        slug: "jacket",
        parentId: null,
        createdAt: "2026-10-19T08:00:00.000Z",
        children: [],
    },
    {
        id: "category-shoes",
        name: "Shoes",
        slug: "shoes",
        parentId: null,
        createdAt: "2026-10-18T08:00:00.000Z",
        children: [
            {
                id: "category-sneakers",
                name: "Sneakers",
                slug: "sneakers",
                parentId: "category-shoes",
                createdAt: "2026-10-18T08:30:00.000Z",
            },
        ],
    },
    {
        id: "category-panjabi",
        name: "Panjabi",
        slug: "panjabi",
        parentId: null,
        createdAt: "2026-10-17T08:00:00.000Z",
        children: [],
    },
    {
        id: "category-polo-shirt",
        name: "Polo Shirt",
        slug: "polo-shirt",
        parentId: null,
        createdAt: "2026-10-16T08:00:00.000Z",
        children: [],
    },
    {
        id: "category-jeans",
        name: "Jeans",
        slug: "jeans",
        parentId: null,
        createdAt: "2026-10-15T08:00:00.000Z",
        children: [],
    },
    {
        id: "category-accessories",
        name: "Accessories",
        slug: "accessories",
        parentId: null,
        createdAt: "2026-10-14T08:00:00.000Z",
        children: [
            {
                id: "category-belts",
                name: "Belts",
                slug: "belts",
                parentId: "category-accessories",
                createdAt: "2026-10-14T08:30:00.000Z",
            },
        ],
    },
    {
        id: "category-caps",
        name: "Caps",
        slug: "caps",
        parentId: null,
        createdAt: "2026-10-13T08:00:00.000Z",
        children: [],
    },
    {
        id: "category-shorts",
        name: "Shorts",
        slug: "shorts",
        parentId: null,
        createdAt: "2026-10-12T08:00:00.000Z",
        children: [],
    },
    {
        id: "category-sweaters",
        name: "Sweaters",
        slug: "sweaters",
        parentId: null,
        createdAt: "2026-10-11T08:00:00.000Z",
        children: [],
    },
];

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null;
}

function isCategory(value: unknown): value is Category {
    if (!isRecord(value)) return false;

    return (
        typeof value.id === "string" &&
        typeof value.name === "string" &&
        typeof value.slug === "string" &&
        (typeof value.parentId === "string" || value.parentId === null) &&
        typeof value.createdAt === "string" &&
        (value.children === undefined ||
            (Array.isArray(value.children) && value.children.every(isCategory)))
    );
}

function cloneCategories(categories: Category[]): Category[] {
    return categories.map((category) => ({
        ...category,
        ...(category.children
            ? { children: cloneCategories(category.children) }
            : {}),
    }));
}

export function getMockCategories(): Category[] {
    if (typeof window === "undefined") {
        return cloneCategories(defaultCategories);
    }

    const savedCategories = window.localStorage.getItem(STORAGE_KEY);
    if (savedCategories === null) {
        return cloneCategories(defaultCategories);
    }

    const parsed: unknown = JSON.parse(savedCategories);
    if (!Array.isArray(parsed) || !parsed.every(isCategory)) {
        throw new Error("Saved mock categories are invalid.");
    }

    return parsed;
}

export function addMockCategory(category: Category): void {
    const categories = getMockCategories();
    let parentFound = category.parentId === null;

    function addToParent(items: Category[]): Category[] {
        return items.map((item) => {
            if (item.id === category.parentId) {
                parentFound = true;
                return {
                    ...item,
                    children: [...(item.children ?? []), category],
                };
            }

            if (item.children?.length) {
                return { ...item, children: addToParent(item.children) };
            }

            return item;
        });
    }

    const updatedCategories =
        category.parentId === null
            ? [...categories, category]
            : addToParent(categories);

    if (!parentFound) {
        throw new Error("The selected parent category was not found.");
    }

    window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedCategories),
    );
}
