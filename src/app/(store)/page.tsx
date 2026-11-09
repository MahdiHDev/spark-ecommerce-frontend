import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import NewArrivals from "@/components/home/NewArrivals";
import ShoesSection from "@/components/home/ShowSection";

const page = () => {
    return (
        <div>
            <HeroCarousel />
            <FeaturedCategories />
            <NewArrivals />
            <ShoesSection />
        </div>
    );
};

export default page;
