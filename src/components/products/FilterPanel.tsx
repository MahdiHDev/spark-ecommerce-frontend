type FilterPanelProps = {
    search: string;
    setSearch: (value: string) => void;
    selectedCategory: string;
    selectCategory: (value: string) => void;
    maxPrice: number;
    setMaxPrice: (value: number) => void;
    clearFilters: () => void;
};

export const formatPrice = (price: number) =>
    `৳ ${price.toLocaleString("en-BD")}`;

const categories = [
    { name: "T-Shirt", count: 120 },
    { name: "Check Shirt", count: 10 },
    { name: "Old Money Shirt", count: 11 },
    { name: "Plain Shirt", count: 9 },
    { name: "Oversized T-Shirt", count: 10 },
    { name: "Regular T-Shirt", count: 11 },
    { name: "Hoodie", count: 10 },
    { name: "Sweatshirt", count: 11 },
    { name: "Jacket", count: 9 },
];

export function FilterPanel({
    search,
    setSearch,
    selectedCategory,
    selectCategory,
    maxPrice,
    setMaxPrice,
    clearFilters,
}: FilterPanelProps) {
    return (
        <div className="rounded-lg border border-gray-200 bg-white p-5">
            <div className="mb-5 flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider">
                    Filter Products
                </h3>
                <button
                    onClick={clearFilters}
                    className="text-xs text-gray-500 underline underline-offset-4 hover:text-black"
                >
                    Clear all
                </button>
            </div>

            {/* Categories */}
            <div className="mb-7">
                <h4 className="mb-4 text-xs font-bold uppercase tracking-widest">
                    Categories
                </h4>

                <div className="space-y-3">
                    <button
                        onClick={() => selectCategory("All")}
                        className="flex w-full items-center justify-between text-left text-sm"
                    >
                        <span className="flex items-center gap-2">
                            <span
                                className={`h-3.5 w-3.5 rounded-full border ${
                                    selectedCategory === "All"
                                        ? "border-black bg-black shadow-[inset_0_0_0_3px_white]"
                                        : "border-gray-400"
                                }`}
                            />
                            All Products
                        </span>
                    </button>

                    {categories.map((category) => (
                        <button
                            key={category.name}
                            onClick={() => selectCategory(category.name)}
                            className="flex w-full items-center justify-between gap-2 text-left text-sm text-gray-600 transition hover:text-black"
                        >
                            <span className="flex items-center gap-2">
                                <span
                                    className={`h-3.5 w-3.5 shrink-0 rounded-full border ${
                                        selectedCategory === category.name
                                            ? "border-black bg-black shadow-[inset_0_0_0_3px_white]"
                                            : "border-gray-400"
                                    }`}
                                />
                                {category.name}
                            </span>
                            <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-500">
                                {category.count}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Price filter */}
            <div className="border-t border-gray-200 pt-6">
                <h4 className="mb-4 text-xs font-bold uppercase tracking-widest">
                    Price Range
                </h4>

                <input
                    type="range"
                    min="300"
                    max="2500"
                    step="100"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-black"
                />

                <div className="mt-2 flex justify-between text-xs text-gray-500">
                    <span>৳ 300</span>
                    <span className="font-semibold text-black">
                        Up to {formatPrice(maxPrice)}
                    </span>
                </div>
            </div>
        </div>
    );
}
