import Image from "next/image";
import Link from "next/link";

const categories = [
    {
        id: 1,
        name: "Jackets",
        image: "/images/categories/category.jpg",
        href: "/products?category=jackets",
    },
    {
        id: 2,
        name: "Sneakers",
        image: "/images/categories/category2.jpg",
        href: "/products?category=sneakers",
    },
    {
        id: 3,
        name: "Panjabi",
        image: "/images/categories/category3.jpg",
        href: "/products?category=panjabi",
    },
    {
        id: 4,
        name: "Shirts",
        image: "/images/categories/category4.jpg",
        href: "/products?category=shirts",
    },
    {
        id: 5,
        name: "T-Shirts",
        image: "/images/categories/category5.jpg",
        href: "/products?category=t-shirts",
    },
    {
        id: 6,
        name: "Polo Shirts",
        image: "/images/categories/category6.jpg",
        href: "/products?category=polo-shirts",
    },
    {
        id: 7,
        name: "Pants & Trousers",
        image: "/images/categories/category7.jpg",
        href: "/products?category=pants",
    },
    {
        id: 8,
        name: "Perfumes",
        image: "/images/categories/category8.jpg",
        href: "/products?category=perfumes",
    },
    {
        id: 9,
        name: "Accessories",
        image: "/images/categories/category9.jpg",
        href: "/products?category=accessories",
    },
];

export function FeaturedCategories() {
    return (
        <section className="mx-auto w-full max-w-[1440px] px-4 py-10 md:px-8 md:py-14">
            {/* Section Heading */}
            <div className="mb-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-zinc-200" />

                <div className="text-center">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-orange-500">
                        Explore SPARK
                    </p>
                    <h2 className="mt-1 text-xl font-bold uppercase tracking-tight text-zinc-900 sm:text-2xl">
                        Featured Categories
                    </h2>
                </div>

                <div className="h-px flex-1 bg-zinc-200" />
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-6 lg:gap-5">
                {categories.map((category) => (
                    <Link
                        key={category.id}
                        href={category.href}
                        className="group relative aspect-square overflow-hidden rounded-xl bg-zinc-100"
                    >
                        {/* Category Image */}
                        <Image
                            src={category.image}
                            alt={category.name}
                            fill
                            sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 16vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />

                        {/* Image Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent transition-colors duration-300 group-hover:from-black/80" />

                        {/* Category Name */}
                        <div className="absolute inset-x-0 bottom-0 p-2.5 text-center sm:p-4">
                            <h3 className="text-xs font-bold uppercase tracking-wide text-white sm:text-sm md:text-base">
                                {category.name}
                            </h3>

                            <span className="mt-1 hidden text-[10px] font-medium uppercase tracking-widest text-orange-400 transition-all duration-300 group-hover:inline-block">
                                Explore
                            </span>
                        </div>

                        {/* Hover Border */}
                        <div className="pointer-events-none absolute inset-0 rounded-xl border border-transparent transition-colors duration-300 group-hover:border-orange-500/70" />
                    </Link>
                ))}
            </div>

            {/* View All */}
            <div className="mt-8 flex justify-center">
                <Link
                    href="/products"
                    className="inline-flex items-center justify-center rounded-full border border-zinc-900 px-8 py-3 text-xs font-bold uppercase tracking-wider text-zinc-900 transition-all duration-300 hover:border-orange-500 hover:bg-orange-500 hover:text-white"
                >
                    Explore All Categories
                    <span className="ml-2">→</span>
                </Link>
            </div>
        </section>
    );
}
