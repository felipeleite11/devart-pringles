'use client'

import { useContext, useEffect, useRef } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { SlideContext } from '@/contexts/SlideContext'
import { cn } from '@/lib/util'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)

interface ItemsAnimation {
	titleRef: HTMLHeadingElement | null
	detailsRef: HTMLParagraphElement | null
	ctaRef: HTMLButtonElement | null
	imageRef: HTMLImageElement | null
	chipsRef: HTMLImageElement | null
	nextProductRef: HTMLImageElement | null
	currentProductRef: HTMLImageElement | null
}

export function Hero() {
	const { handleNextSlide, handlePrevSlide, handleGoToSlide, activeSlide } = useContext(SlideContext)

	const container = useRef<HTMLDivElement>(null)
	const firstSlide = useRef<HTMLDivElement>(null)
	const title1 = useRef<HTMLHeadingElement>(null)
	const title2 = useRef<HTMLHeadingElement>(null)
	const text1 = useRef<HTMLParagraphElement>(null)
	const text2 = useRef<HTMLParagraphElement>(null)
	const cta1 = useRef<HTMLButtonElement>(null)
	const cta2 = useRef<HTMLButtonElement>(null)
	const image1 = useRef<HTMLImageElement>(null)
	const image2 = useRef<HTMLImageElement>(null)
	const chips1 = useRef<HTMLImageElement>(null)
	const chips2 = useRef<HTMLImageElement>(null)
	const currentProduct1 = useRef<HTMLImageElement>(null)
	const currentProduct2 = useRef<HTMLImageElement>(null)
	const nextProduct1 = useRef<HTMLImageElement>(null)
	const nextProduct2 = useRef<HTMLImageElement>(null)

	useGSAP(() => {
		gsap.set(firstSlide.current, { opacity: 1, clipPath: 'circle(130% at 87% 50%)' })
	})

	const itemsSlide: ItemsAnimation[] = [
		{
			titleRef: title1.current,
			detailsRef: text1.current,
			ctaRef: cta1.current,
			imageRef: image1.current,
			chipsRef: chips1.current,
			nextProductRef: nextProduct1.current,
			currentProductRef: currentProduct1.current
		},
		{
			titleRef: title2.current,
			detailsRef: text2.current,
			ctaRef: cta2.current,
			imageRef: image2.current,
			chipsRef: chips2.current,
			nextProductRef: nextProduct2.current,
			currentProductRef: currentProduct2.current
		}
	]

	function animateItems({ ctaRef, detailsRef, titleRef, imageRef, chipsRef, nextProductRef, currentProductRef }: ItemsAnimation) {
		const title = new SplitText(titleRef, {
			type: 'chars, words'
		})
		
		gsap.from(title.chars, {
			opacity: 0,
			y: 50,
			stagger: 0.05,
			duration: 0.6,
			delay: 0.3,
			ease: "power1.out"
		})

		gsap.from(detailsRef, { 
			opacity: 0, 
			y: 50,
			delay: 0.8
		})

		gsap.from(ctaRef, { 
			opacity: 0, 
			y: 50,
			delay: 1
		})

		gsap.fromTo(imageRef, { 
			rotate: -180
		}, {
			rotate: 0,
			delay: 0.4
		})

		gsap.fromTo(currentProductRef, {
			opacity: 0,
			scale: 0.1
		}, {
			opacity: 1,
			scale: 1
		})

		gsap.fromTo(nextProductRef, {
			opacity: 0,
			scale: 0.4
		}, {
			opacity: 1,
			scale: 1,
			delay: 0.3
		})

		gsap.fromTo(chipsRef, {
			top: '36rem'
		}, { 
			top: '24rem',
			zIndex: 1
		})
	}

	useEffect(() => {
		animateItems(itemsSlide[activeSlide.index])
	}, [activeSlide])

	return (
		<section ref={container}>
			
			{/* Slide 1 */}
			<div 
				ref={firstSlide}
				className={cn(
					'slide bg-linear-to-r from-[#DE4958] to-[#CC3544]',
					{ active: activeSlide.index === 0 }
				)}
			>
				{/* Imagem */}
				<div className="overflow-hidden w-50 flex-none select-none">
					<div className="w-96">
						<img 
							ref={image1} 
							src="/images/sabor batata.png" 
							className="image-circle shadow-lg w-full rounded-full -translate-x-1/2" 
							alt="Batatas"
						/>
					</div>
				</div>

				{/* Textos */}
				<div className="flex flex-col justify-center gap-8 flex-1 text-gray-100 h-90">
					<h1 ref={title1} className="text-5xl font-black">Original</h1>
					<p ref={text1}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam quia excepturi quaerat, laudantium asperiores dicta illum incidunt.</p>
					<button ref={cta1} className="primary-button select-none cursor-pointer p-4 rounded-md bg-white text-gray-800 font-medium w-fit hover:opacity-70">VER NA LOJA</button>
				</div>

				{/* Latas */}
				<div className="select-none z-10 flex gap-6 items-end justify-end w-sm flex-none relative">
					{/* <img src="/images/potatoes.png" alt="" ref={chips1} className="absolute w-64 -left-4 top-96" /> */}

					<img ref={currentProduct1} src="/images/original2.png" alt="Sabor original" className="w-48 object-contain" />
					
					<img ref={nextProduct1} onClick={handleNextSlide} src="/images/cebola2.png" alt="Sabor creme e cebola" className="image-next w-40 object-contain cursor-pointer hover:scale-105 transition-transform origin-bottom" />
				</div>

				<img src="/images/pringles vermelho.svg" alt="" className="background-image h-145 rotate-3 absolute -right-36 top-[27dvh] opacity-10" />
			</div>


			{/* Slide 2 */}
			<div 
				className={cn(
					'slide bg-linear-to-r from-[#60B04C] to-[#3A8F25]',
					{ active: activeSlide.index === 1 }
				)}
			>
				{/* Imagem */}
				<div className="overflow-hidden w-50 flex-none select-none">
					<div className="w-96">
						<img 
							ref={image2} 
							src="/images/sabor cebola.png" 
							className="image-circle shadow-lg w-full rounded-full -translate-x-1/2" 
							alt="Batatas"
						/>
					</div>
				</div>

				{/* Textos */}
				<div className="flex flex-col justify-center gap-8 flex-1 text-gray-100 h-90">
					<h1 ref={title2} className="text-5xl font-black">Creme & Cebola</h1>
					<p ref={text2}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam quia excepturi quaerat, laudantium asperiores dicta illum incidunt.</p>
					<button ref={cta2} className="primary-button select-none cursor-pointer p-4 rounded-md bg-white text-gray-800 font-medium w-fit hover:opacity-70">VER NA LOJA</button>
				</div>

				{/* Latas */}
				<div className="select-none z-10 flex gap-6 items-end justify-end w-sm flex-none relative">
					{/* <img src="/images/onions.png" alt="" ref={chips2} className="absolute w-64 -left-4 top-96" /> */}
					{/* <img src="/images/rodela.png" alt="" className="absolute w-[225px] -left-1 top-72 z-10" /> */}

					<img ref={currentProduct2} src="/images/cebola2.png" alt="Sabor original" className="w-48 ml-12 object-contain" />

					<img ref={nextProduct2} onClick={handleNextSlide} src="/images/original2.png" alt="Sabor creme e cebola" className="image-next w-40 object-contain cursor-pointer hover:scale-105 transition-transform origin-bottom" />
				</div>

				<img src="/images/pringles verde.svg" alt="" className="background-image h-145 rotate-3 absolute -right-36 top-[27dvh] opacity-10" />
			</div>

			{/* Slide control */}
			<div className="absolute bottom-1/5 right-1/3 left-80 flex gap-12 z-20 justify-between w-[50vw]">
				{/* Bullets */}
				<ul className="flex gap-1.5 mt-24">
					<li 
						onClick={() => { handleGoToSlide(0) }} 
						className={cn('h-2 w-5 rounded-md bg-white/40 cursor-pointer', { 'active bg-white w-6': activeSlide.index === 0 })}
					/>
					<li 
						onClick={() => { handleGoToSlide(1) }} 
						className={cn('h-2 w-5 rounded-md bg-white/40 cursor-pointer', { 'active bg-white w-6': activeSlide.index === 1 })}
					/>
				</ul>
				
				{/* Arrows */}
				<div className="flex gap-4 h-fit mt-12">
					<button onClick={handlePrevSlide} className="bg-white/60 hover:bg-white/90 p-2 rounded-full text-slate-800/80 cursor-pointer transition-colors">
						<ArrowLeft />
					</button>

					<button onClick={handleNextSlide} className="bg-white/60 hover:bg-white/90 p-2 rounded-full text-slate-800/80 cursor-pointer transition-colors">
						<ArrowRight />
					</button>
				</div>
			</div>
		</section>
	)
}