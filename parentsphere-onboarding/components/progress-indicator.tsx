interface ProgressIndicatorProps {
  currentStep: number
  totalSteps: number
}

export function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  return (
    <div className="bg-gradient-to-r from-violet-600 to-sky-600 px-5 py-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="pattern" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pattern)" />
        </svg>
      </div>

      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div key={index} className="flex items-center flex-1">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-extrabold transition-all duration-300 ${
                  index + 1 <= currentStep ? "bg-white text-violet-600 shadow-lg" : "bg-white/30 text-white"
                }`}
              >
                {index + 1}
              </div>

              {index < totalSteps - 1 && (
                <div className="h-2 flex-1 mx-1 md:mx-2 rounded-full overflow-hidden bg-white/30">
                  <div
                    className="h-full bg-white transition-all duration-500"
                    style={{ width: index + 1 < currentStep ? "100%" : "0%" }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-between text-sm text-white font-bold">
          <div className="text-center">About You</div>
          <div className="text-center">Baby Info</div>
          <div className="text-center">Preferences</div>
        </div>
      </div>
    </div>
  )
}
