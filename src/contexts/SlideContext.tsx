'use client'

import { createContext, ReactNode, useEffect, useState } from "react"

interface SlideProps {
	index: number
	backgroundStyleClass: string
	title: string
	details: string
}

interface SlideContextProps {
	handlePrevSlide: () => void
	handleNextSlide: () => void
	handleGoToSlide: (index: number) => void
	activeSlide: SlideProps
}

export const SlideContext = createContext({} as SlideContextProps)

const slides: SlideProps[] = [
	{
		index: 0,
		title: 'Original',
		details: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem voluptatum magni sed officiis corporis maxime iste modi rerum doloribus!',
		backgroundStyleClass: 'bg-gradient-to-r from-[#DE4958] to-[#CC3544]'
	},
	{
		index: 1,
		title: 'Cebola & Creme',
		details: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem voluptatum magni sed officiis corporis maxime iste modi rerum doloribus!',
		backgroundStyleClass: 'bg-gradient-to-r from-[#60B04C] to-[#3A8F25]'
	}
]

export function SlideContextProvider({ children }: { children: ReactNode }) {
	const [activeSlideIndex, setActiveSlideIndex] = useState(0)
	const [activeSlide, setActiveSlide] = useState<SlideProps>(slides[0])

	function handleNextSlide() {
		setActiveSlideIndex(old => {
			if(old === slides.length - 1) {
				return 0
			} else {
				return old + 1
			}
		})
	}

	function handlePrevSlide() {
		setActiveSlideIndex(old => {
			if(old === 0) {
				return slides.length - 1
			} else {
				return old - 1
			}
		})
	}

	function handleGoToSlide(index: number) {
		setActiveSlideIndex(index)
	}

	useEffect(() => {
		setActiveSlide(slides[activeSlideIndex])
	}, [activeSlideIndex])

	return (
		<SlideContext.Provider value={{
			handlePrevSlide,
			handleNextSlide,
			handleGoToSlide,
			activeSlide
		}}>
			{children}
		</SlideContext.Provider>
	)
}