import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Book from "./book"

const books = [
    {
        "title": "The Lost Kingdom",
        "image": "https://picsum.photos/200/300?random=1"
    },
    {
        "title": "Whispers of the Night",
        "image": "https://picsum.photos/200/300?random=2"
    },
    {
        "title": "Shadows in the Forest",
        "image": "https://picsum.photos/200/300?random=3"
    },
    {
        "title": "Journey Beyond Stars",
        "image": "https://picsum.photos/200/300?random=4"
    },
    {
        "title": "The Last Laugh",
        "image": "https://picsum.photos/200/300?random=5"
    }
]


const genres = [
    { name: "Fantasy", color: "#9B59B6" },   // Purple
    { name: "Romance", color: "#E91E63" },   // Pink
    { name: "Mystery", color: "#34495E" },   // Dark Slate
    { name: "Adventure", color: "#27AE60" }, // Green
    { name: "Comedy", color: "#F1C40F" }     // Yellow
];

interface BookCarouselProps {
    carouselTitle: string
}


const BookCarousel: React.FC<BookCarouselProps> = ({ carouselTitle }) => {
    return (
        <div className="px-4">
            <Carousel className="w-full">
                <div className="flex">

                    <h2 className="text-white text-2xl font-bold py-4">{carouselTitle}</h2>
                    <CarouselPrevious className="absolute border-1 border-accent-foreground bg-[var(--deep-slate-blue)]" style={{
                        top: 0,
                        right: 0,
                        marginLeft: 'auto',
                        marginRight: '2.5rem',
                        marginTop: '2rem'
                    }} />
                    <CarouselNext className="absolute border-1 border-accent-foreground bg-[var(--deep-slate-blue)]" style={{
                        top: 0,
                        right: 0,
                        marginTop: '2rem'
                    }} />

                </div>
                <CarouselContent className="-ml-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index} className="pl-1 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6">
                            <div className="p-1">
                                {books[index] ? (
                                    <Book image={books[index].image} title={books[index].title} genre={genres[index]} />
                                ) : (
                                    <div className="bg-gray-100 rounded-xl h-40 flex items-center justify-center text-gray-400">
                                        Empty
                                    </div>
                                )}
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>


            </Carousel>
        </div>
    )
}


export default BookCarousel;