import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { HeroCarousel } from "@/components/home/HeroCarousel";

const page = () => {
    return (
        <div>
            <HeroCarousel />
            <FeaturedCategories />
        </div>
    );
};

export default page;
