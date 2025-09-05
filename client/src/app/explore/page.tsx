import HeroCarousel from "@/components/explorebooks/heroCarousel"
import BookCarousel from "@/components/BooksCarousel";
import QuickStats from "@/components/quickstats";
const carouselCategories = [
    "Top 50 books", "Your Recent Reads"
]

const Explore = () => {
    return (
        <>
            <HeroCarousel slideCount={5} />
            {Array.from(carouselCategories).map((category, index) => (
                <BookCarousel key={index} carouselTitle={category} />
            ))}
            <QuickStats />
        </>
    )
}

export default Explore;