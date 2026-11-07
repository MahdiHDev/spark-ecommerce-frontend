import { Footer } from "@/components/layouts/Footer";
import { Navbar } from "@/components/layouts/Navbar";

const StoreLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            {/* <AnnouncementBar /> */}
            <Navbar />

            <main className="">{children}</main>

            <Footer />
        </>
    );
};

export default StoreLayout;
