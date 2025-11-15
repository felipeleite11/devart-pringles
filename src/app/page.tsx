import { Hero } from "@/sections/hero"
import { SlideContextProvider } from "@/contexts/SlideContext"

export default function Home() {
  return (
    <SlideContextProvider>
      <Hero />
    </SlideContextProvider>
  )
}
