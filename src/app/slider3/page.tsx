'use client'

import React, { useState, useEffect, useRef } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { gsap, ScrollTrigger, SplitText } from 'gsap/all'

const slides = [
    { 
		id: 1, 
		color: 'bg-linear-to-r from-red-600 to-red-700',
		title: 'Original',
		details: 'Pringles Original: o sabor autêntico da batata que eleva cada momento com qualidade e crocância incomparáveis.',
		product: '/images/original.png',
		image: '/images/sabor batata.png'
	},
    { 
		id: 2, 
		color: 'bg-linear-to-r from-emerald-600 to-emerald-700',
		title: 'Creme & Cebola',
		details: 'Pringles Creme e Cebola: uma combinação irresistível de sabor e frescor que transforma cada pausa em uma experiência premium.',
		product: '/images/cebola.png',
		image: '/images/sabor cebola.png'
	},
    { 
		id: 3, 
		color: 'bg-linear-to-r from-purple-800 to-purple-900',
		title: 'Bacon',
		details: 'Pringles Bacon: o sabor intenso e defumado que entrega uma experiência irresistivelmente crocante a cada mordida.',
		product: '/images/bacon.png',
		image: '/images/sabor bacon.jpg'
	}
]

gsap.registerPlugin(ScrollTrigger, SplitText)

export default function Slider() {
	const container = useRef<HTMLDivElement>(null)
	const title1 = useRef<HTMLHeadingElement>(null)
	const title2 = useRef<HTMLHeadingElement>(null)
	const text1 = useRef<HTMLParagraphElement>(null)
	const text2 = useRef<HTMLParagraphElement>(null)
	const cta1 = useRef<HTMLButtonElement>(null)
	const cta2 = useRef<HTMLButtonElement>(null)
	const image1 = useRef<HTMLImageElement>(null)
	const image2 = useRef<HTMLImageElement>(null)
	const currentProduct1 = useRef<HTMLImageElement>(null)
	const currentProduct2 = useRef<HTMLImageElement>(null)
	const nextProduct1 = useRef<HTMLImageElement>(null)
	const nextProduct2 = useRef<HTMLImageElement>(null)
	
    const [currentIndex, setCurrentIndex] = useState(0)
    const [animatingToIndex, setAnimatingToIndex] = useState<number | null>(null)
    const [clipPathStyle, setClipPathStyle] = useState<React.CSSProperties>({
        clipPath: 'circle(0% at 87% 50%)'
    })

    const isAnimating = animatingToIndex !== null

    const handleNavigate = (direction: 'next' | 'prev') => {
        if (isAnimating) return

        const newIndex = direction === 'next'
            ? (currentIndex + 1) % slides.length
            : (currentIndex - 1 + slides.length) % slides.length

        setAnimatingToIndex(newIndex)
    }

    useEffect(() => {
        if (animatingToIndex === null) return

        // Start animation by applying the final state of the clip-path
        // requestAnimationFrame ensures the initial state is painted before the transition starts
        requestAnimationFrame(() => {
            setClipPathStyle({
                clipPath: 'circle(150% at 87% 50%)',
                transition: 'clip-path 800ms ease-in-out'
            })
        })
        
        // After the animation duration, clean up the state
        const timer = setTimeout(() => {
            if (animatingToIndex !== null) {
                setCurrentIndex(animatingToIndex)
            }

            setAnimatingToIndex(null)
            // Reset clip path for the next animation, without transition
            setClipPathStyle({
                clipPath: 'circle(0% at 87% 50%)'
            })
        }, 800)

        return () => clearTimeout(timer)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [animatingToIndex])

    return (
        <div ref={container} className="relative w-screen h-screen overflow-hidden">
            {/* The current slide is always rendered at the last layer */}
            <div className={`absolute inset-0 ${slides[currentIndex].color} z-10`}>
				<div className="flex justify-between gap-32 p-24 pl-0 items-center">
					<div className="w-60 select-none">
						<div className="w-120">
							<img ref={image1} src={slides[currentIndex].image} alt="" className="rounded-full w-100 h-100 -translate-x-1/2 object-cover shadow-lg" />
						</div>
					</div>

					<div className="flex flex-col gap-12 flex-1">
						<h1 ref={title1} className="font-black text-5xl">{slides[currentIndex].title}</h1>
						<p ref={text1} className="leading-relaxed text-sm w-120">{slides[currentIndex].details}</p>
						<button ref={cta1} className="uppercase p-3 bg-white rounded-md text-slate-800 font-medium w-fit">Ver na loja</button>
					</div>

					<img ref={currentProduct1} src={slides[currentIndex].product} alt="Produto" className="w-40" />
				</div>
			</div>

            {/* The animating slide is rendered on top only when the animation is in progress */}
            {isAnimating && (
                 <div
                    key={animatingToIndex}
                    className={`absolute inset-0 ${slides[animatingToIndex].color} z-20`}
                    style={clipPathStyle}
                >
					<div className="flex justify-between gap-32 p-24 pl-0 items-center">
						<div className="w-60 select-none">
							<div className="w-120">
								<img ref={image2} src={slides[animatingToIndex].image} alt="" className="rounded-full w-100 h-100 -translate-x-1/2 object-cover shadow-lg" />
							</div>
						</div>

						<div className="flex flex-col gap-12 flex-1">
							<h1 ref={title2} className="font-black text-5xl">{slides[animatingToIndex].title}</h1>
							<p ref={text2} className="leading-relaxed text-sm w-120">{slides[animatingToIndex].details}</p>
							<button ref={cta2} className="uppercase p-3 bg-white rounded-md text-slate-800 font-medium w-fit">Ver na loja</button>
						</div>

						<img ref={currentProduct2} src={slides[animatingToIndex].product} alt="Produto" className="w-40" />
					</div>
				</div>
            )}
           
            {/* Navigation Buttons */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-4 items-center justify-between p-4">
                <button
                    onClick={() => handleNavigate('prev')}
                    disabled={isAnimating}
                    className="bg-black/30 text-white rounded-full p-2 hover:bg-black/50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    aria-label="Anterior"
                >
                    <ArrowLeft size={16} />
                </button>

                <button
                    onClick={() => handleNavigate('next')}
                    disabled={isAnimating}
                    className="bg-black/30 text-white rounded-full p-2 hover:bg-black/50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    aria-label="Próximo"
                >
                    <ArrowRight size={16} />
                </button>
            </div>
        </div>
    )
}

