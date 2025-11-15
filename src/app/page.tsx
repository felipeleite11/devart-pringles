'use client'

import React, { useState, useEffect, useRef } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { gsap, ScrollTrigger, SplitText } from 'gsap/all'

interface AnimationRefs {
	title: React.RefObject<HTMLHeadingElement | null>
	details: React.RefObject<HTMLParagraphElement | null>
	cta: React.RefObject<HTMLButtonElement | null>
	image: React.RefObject<HTMLImageElement | null>
	product: React.RefObject<HTMLImageElement | null>
	nextProduct: React.RefObject<HTMLImageElement | null>
	lastProduct: React.RefObject<HTMLImageElement | null>
}

gsap.registerPlugin(ScrollTrigger, SplitText)

export default function Slider() {
	const container = useRef<HTMLDivElement>(null)
	const title1 = useRef<HTMLHeadingElement>(null)
	const title2 = useRef<HTMLHeadingElement>(null)
	const title3 = useRef<HTMLHeadingElement>(null)
	const text1 = useRef<HTMLParagraphElement>(null)
	const text2 = useRef<HTMLParagraphElement>(null)
	const text3 = useRef<HTMLParagraphElement>(null)
	const cta1 = useRef<HTMLButtonElement>(null)
	const cta2 = useRef<HTMLButtonElement>(null)
	const cta3 = useRef<HTMLButtonElement>(null)
	const image1 = useRef<HTMLImageElement>(null)
	const image2 = useRef<HTMLImageElement>(null)
	const image3 = useRef<HTMLImageElement>(null)
	const currentProduct1 = useRef<HTMLImageElement>(null)
	const currentProduct2 = useRef<HTMLImageElement>(null)
	const currentProduct3 = useRef<HTMLImageElement>(null)
	const nextProduct1 = useRef<HTMLImageElement>(null)
	const nextProduct2 = useRef<HTMLImageElement>(null)
	const nextProduct3 = useRef<HTMLImageElement>(null)
	const lastProduct1 = useRef<HTMLImageElement>(null)
	const lastProduct2 = useRef<HTMLImageElement>(null)
	const lastProduct3 = useRef<HTMLImageElement>(null)
	const triggerScroll = useRef<HTMLDivElement>(null)
	const potatoes = useRef<HTMLImageElement>(null)
	const potatoes2 = useRef<HTMLImageElement>(null)

	const slides = [
		{ 
			id: 1, 
			color: 'bg-linear-to-r from-red-600 to-red-700',
			title: 'Original',
			details: 'Pringles Original: o sabor autêntico da batata que eleva cada momento com qualidade e crocância incomparáveis.',
			product: '/images/original.png',
			nextProduct: '/images/cebola.png',
			lastProduct: '/images/bacon.png',
			image: '/images/sabor batata.png',
			refs: {
				title: title1,
				details: text1,
				cta: cta1,
				image: image1,
				product: currentProduct1,
				nextProduct: nextProduct1,
				lastProduct: lastProduct1
			}
		},
		{ 
			id: 2, 
			color: 'bg-linear-to-r from-[#5eb249] to-[#1f7c0d]',
			title: 'Creme & Cebola',
			details: 'Pringles Creme e Cebola: uma combinação irresistível de sabor e frescor que transforma cada pausa em uma experiência premium.',
			product: '/images/cebola.png',
			nextProduct: '/images/bacon.png',
			lastProduct: '/images/original.png',
			image: '/images/sabor cebola.png',
			refs: {
				title: title2,
				details: text2,
				cta: cta2,
				image: image2,
				product: currentProduct2,
				nextProduct: nextProduct2,
				lastProduct: lastProduct2
			}
		},
		{ 
			id: 3, 
			color: 'bg-linear-to-r from-[#7445a6] to-[#552284]',
			title: 'Bacon',
			details: 'Pringles Bacon: o sabor intenso e defumado que entrega uma experiência irresistivelmente crocante a cada mordida.',
			product: '/images/bacon.png',
			nextProduct: '/images/original.png',
			lastProduct: '/images/cebola.png',
			image: '/images/sabor bacon.jpg',
			refs: {
				title: title3,
				details: text3,
				cta: cta3,
				image: image3,
				product: currentProduct3,
				nextProduct: nextProduct3,
				lastProduct: lastProduct3
			}
		}
	]
	
    const [currentIndex, setCurrentIndex] = useState(0)
    const [animatingToIndex, setAnimatingToIndex] = useState<number | null>(null)
    const [clipPathStyle, setClipPathStyle] = useState<React.CSSProperties>({
        clipPath: 'circle(0% at 87% 50%)'
    })

    const isAnimating = animatingToIndex !== null

    function handleNavigate(direction: 'next' | 'prev') {
        if (isAnimating) return

        const newIndex = direction === 'next'
            ? (currentIndex + 1) % slides.length
            : (currentIndex - 1 + slides.length) % slides.length

        setAnimatingToIndex(newIndex)
    }

	function animateTexts({ title, details, cta, image, product, nextProduct, lastProduct }: AnimationRefs) {
		const splitedTitle = new SplitText(title.current, {
			type: 'chars, words'
		})

		gsap.from(splitedTitle.chars, {
			opacity: 0,
			y: 50,
			stagger: 0.05,
			duration: 0.25,
			delay: 0.25
		})

		gsap.from(details.current, {
			opacity: 0,
			y: 50,
			duration: 0.4,
			delay: 0.4
		})

		gsap.from(cta.current, {
			opacity: 0,
			y: 30,
			duration: 0.3,
			delay: 0.3
		})

		gsap.from(image.current, {
			rotate: -180,
			duration: 0.3,
			delay: 0.5
		})

		gsap.to(product.current, {
			scale: 0.4,
			opacity: 0.4,
			transformOrigin: 'bottom'
		})

		gsap.to(nextProduct.current, {
			scale: 1.25,
			x: -168,
			transformOrigin: 'bottom'
		})

		gsap.to(lastProduct.current, {
			scale: 1.14,
			x: -144,
			y: -17,
			opacity: 1,
			transformOrigin: 'bottom',
			delay: 0.5,
			duration: 0.2
		})

		gsap.from(potatoes.current, {
			y: 40,
			opacity: 0,
			delay: 0.5
		})
	}

	useEffect(() => {
		gsap.to(slides[currentIndex].refs.product.current, {
			rotate: -4,
			scrollTrigger: {
				trigger: triggerScroll.current,
				start: "top 100%",
				end: "top 50%",
				scrub: true
			}
		})

		gsap.to(potatoes2.current, {
			rotate: -6,
			scrollTrigger: {
				trigger: triggerScroll.current,
				start: "top 100%",
				end: "top 50%",
				scrub: true
			}
		})
	}, [])

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

		const nextSlide = slides[animatingToIndex]

		animateTexts(nextSlide.refs)
        
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
        }, 1000)

        return () => clearTimeout(timer)
    }, [animatingToIndex])

    return (
		<main className="flex flex-col h-[200vh] overflow-hidden">
			<div ref={container} className="relative w-screen h-screen overflow-hidden">
				{/* The current slide is always rendered at the last layer */}
				<div className={`absolute inset-0 ${slides[currentIndex].color} z-10`}>
					<img src="/images/pringles.svg" alt="Pringles" className="-rotate-10 absolute -bottom-64 -right-48 w-160 -z-10 opacity-10" />

					<div className="flex justify-between gap-32 p-24 pl-0 items-center">
						<div className="w-60 select-none">
							<div className="w-120">
								<img ref={slides[currentIndex].refs.image} src={slides[currentIndex].image} alt="" className="rounded-full w-100 h-100 -translate-x-1/2 object-cover shadow-lg" />
							</div>
						</div>

						<div className="flex flex-col gap-12 flex-1">
							<h1 ref={slides[currentIndex].refs.title} className="font-black text-5xl">{slides[currentIndex].title}</h1>
							<p ref={slides[currentIndex].refs.details} className="leading-relaxed text-sm w-120">{slides[currentIndex].details}</p>
							<button ref={slides[currentIndex].refs.cta} className="uppercase cursor-pointer hover:opacity-90 transition-opacity p-3 bg-white rounded-md text-slate-800 font-medium w-fit">Ver na loja</button>
						</div>

						<div className="flex gap-6 items-end select-none w-[294px] relative">
							<img ref={slides[currentIndex].refs.product} src={slides[currentIndex].product} alt="Produto" className="w-40" />
							<img ref={slides[currentIndex].refs.nextProduct} src={slides[currentIndex].nextProduct} alt="Próximo produto" className="w-32 -translate-y-4 cursor-pointer" onClick={() => handleNavigate('next')} />
							<img ref={potatoes2} src="/images/batatas2.png" alt="" className="w-40 absolute -left-16 top-16" />
						</div>
					</div>
				</div>

				{/* The animating slide is rendered on top only when the animation is in progress */}
				{isAnimating && (
					<div
						key={animatingToIndex}
						className={`absolute inset-0 ${slides[animatingToIndex].color} z-20 select-none`}
						style={clipPathStyle}
					>
						<img src="/images/pringles.svg" alt="Pringles" className="-rotate-10 absolute -bottom-64 -right-48 w-160 -z-10 opacity-10" />

						<div className="flex justify-between gap-32 p-24 pl-0 items-center">
							<div className="w-60 select-none">
								<div className="w-120">
									<img ref={slides[animatingToIndex].refs.image} src={slides[animatingToIndex].image} alt="" className="rounded-full w-100 h-100 -translate-x-1/2 object-cover shadow-lg" />
								</div>
							</div>

							<div className="flex flex-col gap-12 flex-1">
								<h1 ref={slides[animatingToIndex].refs.title} className="font-black text-5xl">{slides[animatingToIndex].title}</h1>
								<p ref={slides[animatingToIndex].refs.details} className="leading-relaxed text-sm w-120">{slides[animatingToIndex].details}</p>
								<button ref={slides[animatingToIndex].refs.cta} className="uppercase cursor-pointer hover:opacity-90 transition-opacity p-3 bg-white rounded-md text-slate-800 font-medium w-fit">Ver na loja</button>
							</div>

							<div className="flex gap-6 items-end select-none w-[294px] relative">
								<img ref={slides[animatingToIndex].refs.product} src={slides[animatingToIndex].product} alt="Produto" className="w-40" />
								<img ref={slides[animatingToIndex].refs.nextProduct} src={slides[animatingToIndex].product} alt="Próximo produto" className="w-32" />
								<img ref={slides[animatingToIndex].refs.lastProduct} src={slides[animatingToIndex].nextProduct} alt="Próximo produto" className="w-28 opacity-1" />
								<img ref={potatoes} src="/images/batatas2.png" alt="" className="w-40 absolute -left-16 top-16" />
							</div>
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

			<div ref={triggerScroll}></div>
		</main>
    )
}

