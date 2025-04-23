import JokeGenerator from "@/components/joke-generator"
import Sponsors from "@/components/sponsors"
import Image from "next/image"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 flex flex-col">
      {/* Milk splash background - fixed position so it stays in view while scrolling */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200%] sm:w-[150%] max-w-none">
          <Image
            src="/milk-splash-new.png"
            alt="Milk Splash"
            width={1800}
            height={900}
            className="w-full object-contain opacity-80"
            priority
          />
        </div>
      </div>

      <main className="relative z-10 flex-1 container mx-auto px-4 py-4 flex flex-col items-center">
        <div className="w-full max-w-5xl">
          <div className="text-center mb-4 animate-pulse">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-800 mb-1 drop-shadow-md">
              Tanoogaaaaaaayies Jokes
            </h1>
            <p className="text-base sm:text-lg text-amber-700 italic">Noam's seconed brain ❤️ Yoav</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
            <div className="bg-white/90 rounded-lg shadow-lg p-2 sm:p-3 border-2 border-amber-400 transform transition-transform hover:scale-105">
              <Image
                src="/men-cornflakes.png"
                alt="Men with Cornflakes"
                width={500}
                height={400}
                className="w-full h-auto rounded"
              />
            </div>
            <div className="bg-white/90 rounded-lg shadow-lg p-2 sm:p-3 border-2 border-amber-400 transform transition-transform hover:scale-105">
              <Image
                src="/gym-shirts.png"
                alt="Gym Shirts"
                width={500}
                height={400}
                className="w-full h-auto rounded"
              />
            </div>
          </div>

          <JokeGenerator />
        </div>
      </main>
      <Sponsors />
    </div>
  )
}
