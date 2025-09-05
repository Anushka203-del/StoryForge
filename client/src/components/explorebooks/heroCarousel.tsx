import React from "react";
import EmblaCarousel from '@/components/HeroEmblaCarousel/HeroEmblaCarousel'
import { EmblaOptionsType } from 'embla-carousel'
import "@/components/HeroEmblaCarousel/css/embla.css"
import "@/app/globals.css"
// import "@/components/ui/emblaCarousel/css/base.css"


interface HeroCarouselProps {
    slideCount: number,
}

const OPTIONS: EmblaOptionsType = {}


const HeroCarousel: React.FC<HeroCarouselProps> = ({ slideCount }) => {
    const SLIDES = Array.from(Array(slideCount).keys())
    return (
        <>
            <EmblaCarousel slides={SLIDES} options={OPTIONS} />
        </>
    )
};

export default HeroCarousel;