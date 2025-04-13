import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, Star, TrendingUp, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function ProfileWidget() {
  return (
    <Card className="border-none shadow-md bg-white overflow-hidden rounded-2xl shadow-[0_4px_14px_rgba(0,0,0,0.08)]">
      <CardContent className="p-0">
        <div className="relative">
          {/* Background pattern */}
          <div
            className="h-16 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 relative overflow-hidden"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/90 via-purple-600/90 to-pink-600/90" />
          </div>

          {/* Avatar and info */}
          <div className="px-4 pt-0 pb-3 relative">
            <div className="flex justify-between items-end -mt-8">
              <Avatar className="h-16 w-16 border-4 border-white shadow-lg ring-2 ring-purple-100">
                <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Parent profile" />
                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-xl font-bold">
                  JS
                </AvatarFallback>
              </Avatar>

              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-400 border-2 border-white"></div>

              <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1 rounded-full shadow-md">
                <span className="text-xs font-semibold text-white">Premium</span>
              </div>
            </div>

            <div className="mt-2">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-900">Jessica Smith</h2>
                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 text-[10px]">
                  Level 4
                </Badge>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">Parent of Noah (8 months)</p>
            </div>

            <div className="grid grid-cols-3 gap-1 mt-3">
              <div className="flex items-center justify-center p-1.5 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Star className="h-3 w-3 text-amber-500 mr-1" />
                  <span className="text-xs font-medium text-gray-700">4.8/5</span>
                </div>
              </div>

              <div className="flex items-center justify-center p-1.5 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-xs font-medium text-gray-700">243 days</span>
                </div>
              </div>

              <div className="flex items-center justify-center p-1.5 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Clock className="h-3 w-3 text-purple-500 mr-1" />
                  <span className="text-xs font-medium text-gray-700">Streak: 12</span>
                </div>
              </div>
            </div>

            <button className="w-full mt-3 flex items-center justify-between bg-gradient-to-r from-purple-50 to-pink-50 p-2 rounded-lg border border-purple-100 hover:from-purple-100 hover:to-pink-100 transition-colors">
              <span className="text-xs font-medium text-purple-700">View Complete Profile</span>
              <ChevronRight className="h-3 w-3 text-purple-500" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
