"use client"
import React, { useCallback, useEffect, useRef } from 'react'
import {
    EmblaCarouselType,
    EmblaEventType,
    EmblaOptionsType
} from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { DotButton, useDotButton } from './EmblaCarouselDotButton'
import Autoplay from 'embla-carousel-autoplay'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, BookText } from 'lucide-react'



const TWEEN_FACTOR_BASE = 0.5

type PropType = {
    slides: number[]
    options?: EmblaOptionsType
}

const genres = [
    { name: "Fantasy", color: "#9B59B6" },   // Purple
    { name: "Romance", color: "#E91E63" },   // Pink
    { name: "Mystery", color: "#34495E" },   // Dark Slate
    { name: "Adventure", color: "#27AE60" }, // Green
    { name: "Comedy", color: "#F1C40F" }     // Yellow
];


const EmblaCarousel: React.FC<PropType> = (props) => {
    const { slides, options } = props
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [
        Autoplay({
            playOnInit: true,
            delay: 3000,
            stopOnInteraction: false,
            stopOnMouseEnter: true
        })
    ])
    const tweenFactor = useRef(0)
    const tweenNodes = useRef<HTMLElement[]>([])

    const { selectedIndex, scrollSnaps, onDotButtonClick } =
        useDotButton(emblaApi)



    const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
        tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
            return slideNode.querySelector('.embla__parallax__layer') as HTMLElement
        })
    }, [])

    const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
        tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length
    }, [])

    const tweenParallax = useCallback(
        (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
            const engine = emblaApi.internalEngine()
            const scrollProgress = emblaApi.scrollProgress()
            const slidesInView = emblaApi.slidesInView()
            const isScrollEvent = eventName === 'scroll'

            emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
                let diffToTarget = scrollSnap - scrollProgress
                const slidesInSnap = engine.slideRegistry[snapIndex]

                slidesInSnap.forEach((slideIndex) => {
                    if (isScrollEvent && !slidesInView.includes(slideIndex)) return

                    if (engine.options.loop) {
                        engine.slideLooper.loopPoints.forEach((loopItem) => {
                            const target = loopItem.target()

                            if (slideIndex === loopItem.index && target !== 0) {
                                const sign = Math.sign(target)

                                if (sign === -1) {
                                    diffToTarget = scrollSnap - (1 + scrollProgress)
                                }
                                if (sign === 1) {
                                    diffToTarget = scrollSnap + (1 - scrollProgress)
                                }
                            }
                        })
                    }

                    const translate = diffToTarget * (-1 * tweenFactor.current) * 100
                    const tweenNode = tweenNodes.current[slideIndex]
                    tweenNode.style.transform = `translateX(${translate}%)`
                })
            })
        },
        []
    )

    useEffect(() => {
        if (!emblaApi) return

        setTweenNodes(emblaApi)
        setTweenFactor(emblaApi)
        tweenParallax(emblaApi)

        emblaApi
            .on('reInit', setTweenNodes)
            .on('reInit', setTweenFactor)
            .on('reInit', tweenParallax)
            .on('scroll', tweenParallax)
            .on('slideFocus', tweenParallax)
    }, [emblaApi, tweenParallax])

    return (
        <div style={{
            boxShadow: `0 10px 30px ${genres[selectedIndex].color}bf`,
            margin: "2rem"
        }} className="embla bg-[#121212] rounded-xl transition-shadow duration-300">
            <div className="embla__viewport rounded-md " ref={emblaRef}>
                <div className="embla__container">
                    {slides.map((index) => (
                        <div className="embla__slide" key={index}>
                            <div className="embla__parallax">
                                <div className="embla__parallax__layer">
                                    <img
                                        className="embla__slide__img embla__parallax__img"
                                        src={`https://picsum.photos/600/350?v=${index}`}
                                        alt="Your alt text"
                                    />
                                    {/* Animated Caption */}
                                    <AnimatePresence mode="wait">
                                        {selectedIndex === index && (
                                            <motion.div
                                                key={index}
                                                className="absolute pb-[10px] -bottom-[30px] left-0 text-white text-lg font-semibold w-full overflow-hidden"
                                                initial={{ opacity: 0, y: 40 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -40 }}
                                                transition={{ duration: 0.6, ease: 'easeInOut' }}
                                            >
                                                <div className="relative overflow-hidden min-h-[400px] flex items-end p-8 bg-cover bg-center" style={{
                                                    backgroundImage: `linear-gradient(to top, ${genres[index].color}bf 10%, transparent)`
                                                }}
                                                >
                                                    <div className="flex flex-col gap-4 max-w-xl">
                                                        <div className="flex items-center gap-4">
                                                            <p style={{
                                                                color: "white!important"
                                                            }} className="text-white font-bold text-5xl" >The Crimson Quill</p>
                                                            <div className="flex items-center gap-2">
                                                                <span style={{
                                                                    backgroundColor: `${genres[index].color}`
                                                                }} className={`inline-block  rounded-full px-3 py-1 text-sm font-semibold text-white`}> {genres[index].name} </span>
                                                            </div>
                                                        </div>
                                                        <p className="text-white">A young scribe discovers a magical quill that brings his writings to life, but soon learns that every story has its price. He must navigate a world of political intrigue and ancient magic to protect his newfound power from those who would use it for evil.</p>
                                                        <div className="flex items-center gap-4">
                                                            <button className="bg-[var(--primary)] text-white font-bold py-3 px-6 rounded-md flex items-center gap-2 hover:cursor-pointer">
                                                                <span className="material-symbols-outlined"> <Play /> </span>
                                                                Start Reading
                                                            </button>
                                                            <button className=" hover:cursor-pointer border border-white text-white font-bold py-3 px-6 rounded-md flex items-center gap-2">
                                                                <span className="material-symbols-outlined"> <BookText /> </span>
                                                                Submit
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


        </div>
    )
}

export default EmblaCarousel
