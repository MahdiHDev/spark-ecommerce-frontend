import { Footer } from "@/components/layouts/Footer";
import { Navbar } from "@/components/layouts/Navbar";
import BottomTabNavigation from "@/components/layouts/BottomTabNavigation";

const StoreLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            {/* <AnnouncementBar /> */}
            <Navbar />

            <main className="pb-[72px] lg:pb-0">{children}</main>

            <Footer />
            <BottomTabNavigation />
        </>
    );
};

export default StoreLayout;
