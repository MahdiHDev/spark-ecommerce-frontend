import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import NewArrivals from "@/components/home/NewArrivals";

const page = () => {
    return (
        <div>
            <HeroCarousel />
            <FeaturedCategories />
            <NewArrivals />
        </div>
    );
};

export default page;
