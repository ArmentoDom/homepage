import BottomNavbar from "@/components/bottom-navbar"
import ProfileWidget from "@/components/profile-widget"
import AiInsightsWidget from "@/components/ai-insights-widget"
import TrackerWidget from "@/components/tracker-widget"
import CalendarWidget from "@/components/calendar-widget"
import { Sparkles, Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      {/* Subtle patterns */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-[0.03]">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 20px 20px, #6b46c1 2px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Floating elements */}
      <div
        className="absolute top-[30%] right-[10%] w-6 h-6 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-20 animate-float"
        style={{ animationDelay: "0s" }}
      ></div>
      <div
        className="absolute top-[40%] left-[15%] w-4 h-4 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400 opacity-20 animate-float"
        style={{ animationDelay: "0.5s" }}
      ></div>
      <div
        className="absolute top-[60%] right-[20%] w-5 h-5 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 opacity-20 animate-float"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-[70%] left-[10%] w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 opacity-20 animate-float"
        style={{ animationDelay: "1.5s" }}
      ></div>

      <div className="container max-w-md mx-auto px-4">
        {/* Header */}
        <header className="py-4 flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur-md z-10 rounded-b-2xl shadow-[0_4px_10px_rgba(0,0,0,0.05)] border-b border-gray-100">
          <div className="flex items-center">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center mr-2 shadow-md">
              <Sparkles className="h-3.5 w-3.5 text-white" />
            </div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              ParentSphere
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-gray-500 hover:text-purple-600 hover:bg-purple-50"
            >
              <Search className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-gray-500 hover:text-purple-600 hover:bg-purple-50"
            >
              <Bell className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <div className="mt-4">
          <ProfileWidget />
        </div>

        <div className="mt-4">
          <AiInsightsWidget />
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4">
          <TrackerWidget type="feeding" lastTime="2 hours ago" metric="8 oz formula" icon="baby-bottle" color="blue" />
          <TrackerWidget type="sleep" lastTime="4 hours ago" metric="2h 30m" icon="moon" color="purple" />
          <TrackerWidget type="diapers" lastTime="1 hour ago" metric="Wet only" icon="baby" color="teal" />
        </div>

        <div className="mt-4 mb-20">
          <CalendarWidget />
        </div>
      </div>

      <BottomNavbar />
    </main>
  )
}
