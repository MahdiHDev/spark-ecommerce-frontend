import Collection from "@/components/home/Collection";
import FAQSection from "@/components/home/FAQSection";
import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import MissionVision from "@/components/home/MissionVision";
import NewArrivals from "@/components/home/NewArrivals";
import ShoesSection from "@/components/home/ShoeSection";

const page = () => {
    return (
        <div>
            <HeroCarousel />
            <FeaturedCategories />
            <NewArrivals />
            <ShoesSection />
            <Collection />
            <FAQSection />
            <MissionVision />
        </div>
    );
};

export default page;
