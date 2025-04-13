import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, BabyIcon as BabyBottle, Moon, Baby, Clock, BarChart3, History } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface TrackerWidgetProps {
  type: "feeding" | "sleep" | "diapers"
  lastTime: string
  metric: string
  icon: string
  color?: string
}

export default function TrackerWidget({ type, lastTime, metric, icon, color }: TrackerWidgetProps) {
  const getTitle = () => {
    switch (type) {
      case "feeding":
        return "Feeding Tracker"
      case "sleep":
        return "Sleep Tracker"
      case "diapers":
        return "Diaper Tracker"
    }
  }

  const getIcon = () => {
    switch (icon) {
      case "baby-bottle":
        return <BabyBottle className="h-5 w-5" />
      case "moon":
        return <Moon className="h-5 w-5" />
      case "baby":
        return <Baby className="h-5 w-5" />
      default:
        return <BabyBottle className="h-5 w-5" />
    }
  }

  const getColor = () => {
    if (color === "blue") return "from-cyan-500 to-blue-500"
    if (color === "purple") return "from-violet-500 to-purple-500"
    if (color === "teal") return "from-teal-500 to-emerald-500"

    switch (type) {
      case "feeding":
        return "from-cyan-500 to-blue-500"
      case "sleep":
        return "from-violet-500 to-purple-500"
      case "diapers":
        return "from-amber-500 to-orange-500"
    }
  }

  const getSecondaryColor = () => {
    if (color === "blue") return "bg-blue-50 border-blue-100 text-blue-700"
    if (color === "purple") return "bg-purple-50 border-purple-100 text-purple-700"
    if (color === "teal") return "bg-teal-50 border-teal-100 text-teal-700"

    switch (type) {
      case "feeding":
        return "bg-blue-50 border-blue-100 text-blue-700"
      case "sleep":
        return "bg-purple-50 border-purple-100 text-purple-700"
      case "diapers":
        return "bg-amber-50 border-amber-100 text-amber-700"
    }
  }

  const getBackgroundColor = () => {
    if (color === "blue") return "bg-blue-50"
    if (color === "purple") return "bg-purple-50"
    if (color === "teal") return "bg-teal-50"

    switch (type) {
      case "feeding":
        return "bg-blue-50"
      case "sleep":
        return "bg-purple-50"
      case "diapers":
        return "bg-amber-50"
    }
  }

  const getProgressValue = () => {
    switch (type) {
      case "feeding":
        return 75
      case "sleep":
        return 40
      case "diapers":
        return 90
    }
  }

  const getTimeColor = () => {
    const hours = Number.parseInt(lastTime.split(" ")[0])
    if (type === "diapers" && hours >= 4) return "text-red-500 font-medium"
    if (hours <= 2) return "text-green-600"
    return "text-gray-500"
  }

  return (
    <Card
      className={cn(
        "border-none shadow-md overflow-hidden rounded-2xl shadow-[0_4px_14px_rgba(0,0,0,0.08)]",
        getBackgroundColor(),
      )}
    >
      <div className={cn("h-1.5 bg-gradient-to-r", getColor())} />

      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span
                className={cn(
                  "p-2 rounded-xl shadow-md text-white",
                  color === "blue"
                    ? "bg-gradient-to-br from-blue-500 to-cyan-500"
                    : color === "purple"
                      ? "bg-gradient-to-br from-purple-500 to-violet-500"
                      : color === "teal"
                        ? "bg-gradient-to-br from-teal-500 to-emerald-500"
                        : type === "feeding"
                          ? "bg-gradient-to-br from-blue-500 to-cyan-500"
                          : type === "sleep"
                            ? "bg-gradient-to-br from-purple-500 to-violet-500"
                            : "bg-gradient-to-br from-amber-500 to-orange-500",
                )}
              >
                {getIcon()}
              </span>
              <div>
                <h3 className="font-bold text-gray-900">{getTitle()}</h3>
                <p className={cn("text-xs flex items-center gap-1", getTimeColor())}>
                  <Clock className="h-3 w-3" /> Last: {lastTime}
                </p>
              </div>
            </div>

            <div className="ml-12 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{metric}</span>
                <Badge variant="outline" className={cn("text-xs", getSecondaryColor())}>
                  {type === "feeding" ? "Formula" : type === "sleep" ? "Nap" : "Regular"}
                </Badge>
              </div>

              <div className="w-full bg-white/70 rounded-full h-2">
                <div
                  className={cn("h-2 rounded-full bg-gradient-to-r", getColor())}
                  style={{ width: `${getProgressValue()}%` }}
                ></div>
              </div>

              <div className="flex justify-between items-center">
                <button className="text-xs flex items-center text-gray-500 hover:text-gray-700 transition-colors">
                  <History className="h-3 w-3 mr-1" /> History
                </button>
                <button className="text-xs flex items-center text-gray-500 hover:text-gray-700 transition-colors">
                  <BarChart3 className="h-3 w-3 mr-1" /> Stats
                </button>
              </div>
            </div>
          </div>

          <Button
            size="sm"
            className={cn(
              "rounded-xl shadow-md border-0 px-3 py-1 text-xs text-white",
              color === "blue"
                ? "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                : color === "purple"
                  ? "bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600"
                  : color === "teal"
                    ? "bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600"
                    : type === "feeding"
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                      : type === "sleep"
                        ? "bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600"
                        : "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600",
            )}
          >
            <PlusCircle className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
