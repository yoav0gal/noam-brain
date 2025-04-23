export default function Sponsors() {
  return (
    <footer className="relative z-10 bg-white/90 py-2 shadow-md mt-auto border-t-2 border-amber-200">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-sm text-amber-700 mb-1 font-medium">Sponsored by:</p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-0">
            <div className="flex flex-col items-center transform transition-transform hover:scale-105">
              <div className="font-bold text-amber-800 text-lg">Gaze Holding</div>
            </div>
            <div className="h-0 sm:h-8 w-8 sm:w-0 border-t sm:border-l border-amber-300 my-2 sm:my-0 sm:mx-4"></div>
            <div className="flex flex-col items-center transform transition-transform hover:scale-105">
              <div className="font-bold text-amber-800 text-lg">Dix-Hallpike</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
