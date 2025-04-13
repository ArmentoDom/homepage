"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { MessageCircle, AlertTriangle, ArrowRight, Brain, Sparkles, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

type InsightType = "insights" | "suggestions" | "warnings"

interface InsightItem {
  id: string
  title: string
  description: string
  time: string
  priority?: "low" | "medium" | "high"
}

export default function AiInsightsWidget() {
  const [activeType, setActiveType] = useState<InsightType>("insights")
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const insightData: Record<InsightType, InsightItem[]> = {
    insights: [
      {
        id: "i1",
        title: "Sleep Pattern Detected",
        description:
          "Noah is sleeping longer after evening baths with lavender soap. Consider making this a regular part of bedtime routine.",
        time: "Today",
        priority: "medium",
      },
      {
        id: "i2",
        title: "Feeding Consistency",
        description: "Regular 3-hour feeding intervals established. This is helping with Noah's digestive rhythm.",
        time: "Yesterday",
        priority: "low",
      },
    ],
    suggestions: [
      {
        id: "s1",
        title: "Try Tummy Time",
        description:
          "Increase tummy time to help with development. Noah shows good neck strength - aim for 3-5 minutes, 3 times daily.",
        time: "2 hours ago",
        priority: "medium",
      },
      {
        id: "s2",
        title: "Feeding Schedule",
        description:
          "Consider adjusting evening feeding time to 7:30 PM to better align with Noah's natural sleep cycle.",
        time: "Today",
        priority: "high",
      },
    ],
    warnings: [
      {
        id: "w1",
        title: "Diaper Change Due",
        description: "It's been 4+ hours since last change. This may increase risk of diaper rash.",
        time: "Now",
        priority: "high",
      },
    ],
  }

  const getIcon = (type: InsightType) => {
    switch (type) {
      case "insights":
        return <Brain className="h-4 w-4" />
      case "suggestions":
        return <MessageCircle className="h-4 w-4" />
      case "warnings":
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  const getColor = (type: InsightType) => {
    switch (type) {
      case "insights":
        return "text-teal-500 bg-teal-100"
      case "suggestions":
        return "text-purple-500 bg-purple-100"
      case "warnings":
        return "text-amber-500 bg-amber-100"
    }
  }

  const getBackgroundColor = (type: InsightType) => {
    switch (type) {
      case "insights":
        return "from-teal-500 to-cyan-500"
      case "suggestions":
        return "from-purple-500 to-pink-500"
      case "warnings":
        return "from-amber-500 to-orange-500"
    }
  }

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "low":
        return "bg-green-100 text-green-700 border-green-200"
      case "medium":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "high":
        return "bg-amber-100 text-amber-700 border-amber-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const scrollToNext = () => {
    const types: InsightType[] = ["insights", "suggestions", "warnings"]
    const currentIndex = types.indexOf(activeType)
    const nextIndex = (currentIndex + 1) % types.length
    setActiveType(types[nextIndex])
  }

  const scrollToPrev = () => {
    const types: InsightType[] = ["insights", "suggestions", "warnings"]
    const currentIndex = types.indexOf(activeType)
    const prevIndex = (currentIndex - 1 + types.length) % types.length
    setActiveType(types[prevIndex])
  }

  return (
    <Card className="border-none shadow-md overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-white shadow-[0_4px_14px_rgba(0,0,0,0.08)]">
      <CardHeader className="pb-2 pt-3 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-1.5 rounded-lg shadow-md">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI Insights
            </h2>
          </div>
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              Active
            </span>
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="px-4 pb-4">
        {/* Carousel navigation */}
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={scrollToPrev}
            className="h-7 w-7 rounded-full flex items-center justify-center bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-1">
            {(["insights", "suggestions", "warnings"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={cn(
                  "h-2 w-2 rounded-full transition-all",
                  activeType === type ? "bg-purple-500 scale-125" : "bg-gray-300",
                )}
              />
            ))}
          </div>

          <button
            onClick={scrollToNext}
            className="h-7 w-7 rounded-full flex items-center justify-center bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Section title */}
        <div className="flex items-center gap-2 mb-3">
          <div className={cn("p-1.5 rounded-lg", getColor(activeType))}>{getIcon(activeType)}</div>
          <h3 className="font-bold text-gray-800 capitalize">{activeType}</h3>
          <div className="h-1 flex-1 bg-gray-100 rounded-full">
            <div
              className={cn("h-1 rounded-full bg-gradient-to-r", getBackgroundColor(activeType))}
              style={{ width: `${(insightData[activeType].length / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="relative overflow-hidden">
          <motion.div
            key={activeType}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-3 max-h-[200px] overflow-y-auto pr-1 scrollbar-thin"
            ref={scrollContainerRef}
          >
            {insightData[activeType].map((item) => (
              <div
                key={item.id}
                className={cn(
                  "p-3 rounded-xl border shadow-sm hover:shadow-md transition-shadow",
                  activeType === "insights"
                    ? "bg-teal-50 border-teal-100"
                    : activeType === "suggestions"
                      ? "bg-purple-50 border-purple-100"
                      : "bg-amber-50 border-amber-100",
                )}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-gray-900">{item.title}</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-gray-500">{item.time}</span>
                      {item.priority && (
                        <Badge variant="outline" className={cn("text-[10px]", getPriorityColor(item.priority))}>
                          {item.priority}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{item.description}</p>
                <div className="mt-2">
                  <button className="text-xs font-medium text-purple-600 flex items-center hover:text-purple-800 transition-colors">
                    Learn more <ArrowRight className="h-3 w-3 ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </CardContent>
    </Card>
  )
}
