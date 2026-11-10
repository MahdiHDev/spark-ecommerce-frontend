import Link from "next/link";

export default function NotFound() {
    return (
        <main className="min-h-screen flex items-center justify-center px-6">
            <div className="text-center max-w-md">
                <Link href="/" className="text-2xl font-black tracking-widest">
                    SPARK
                    <span className="block text-[10px] font-medium tracking-[0.5em] mt-1 opacity-60">
                        MENS FASHION
                    </span>
                </Link>

                <h1 className="text-8xl md:text-9xl font-black text-black/15 tracking-tighter mt-16">
                    404
                </h1>

                <h2 className="text-xl font-semibold mt-6 text-gray-500">
                    Page not found
                </h2>

                <p className="text-sm opacity-60 mt-3 leading-relaxed">
                    Sorry, the page you&apos;re looking for doesn&apos;t exist
                    or has been moved.
                </p>

                <Link
                    href="/"
                    className="inline-block mt-8 px-7 py-3 border border-current
          text-sm font-semibold uppercase tracking-wider
          hover:bg-primary hover:text-background transition-all duration-300 rounded-xl"
                >
                    Back to Home
                </Link>
            </div>
        </main>
    );
}
