"use client"

import type { FormData } from "../onboarding-form"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { motion } from "framer-motion"
import { Settings, Bell, Clock } from "lucide-react"

interface PreferencesStepProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  onNext: () => void
  onBack: () => void
}

const CONCERNS = [
  { id: "Sleep", icon: "😴" },
  { id: "Feeding", icon: "🍼" },
  { id: "Development", icon: "🧠" },
  { id: "Health", icon: "🏥" },
  { id: "Crying", icon: "😢" },
  { id: "Teething", icon: "🦷" },
  { id: "Routines", icon: "📅" },
  { id: "Mental Health", icon: "🧘" },
  { id: "Work-Life Balance", icon: "⚖️" },
  { id: "Baby Safety", icon: "🛡️" },
  { id: "Communication", icon: "💬" },
  { id: "Postpartum Recovery", icon: "❤️‍🩹" },
]

export function PreferencesStep({ formData, updateFormData, onNext, onBack }: PreferencesStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (formData.concerns.length === 0) {
      newErrors.concerns = "Please select at least one concern"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validate()) {
      onNext()
    }
  }

  const toggleConcern = (concern: string) => {
    const updatedConcerns = formData.concerns.includes(concern)
      ? formData.concerns.filter((c) => c !== concern)
      : [...formData.concerns, concern]

    updateFormData({ concerns: updatedConcerns })
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div className="space-y-6" variants={container} initial="hidden" animate="show">
      <motion.div className="text-center mb-8" variants={item}>
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 mb-4 shadow-lg">
          <Settings className="h-10 w-10 text-white" />
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
          Personalize Your Experience
        </h2>
        <p className="text-slate-600 mt-2 font-medium text-lg">Help us tailor ParentSphere to your needs</p>
      </motion.div>

      <div className="space-y-5">
        <motion.div className="space-y-3" variants={item}>
          <Label className="text-sm font-medium text-slate-700">What are your biggest parenting concerns?</Label>
          {errors.concerns && <p className="text-red-500 text-sm mt-1">{errors.concerns}</p>}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {CONCERNS.map((concern) => (
              <div
                key={concern.id}
                className={`flex items-center space-x-2 p-3 rounded-xl border-2 transition-all cursor-pointer hover:shadow-sm ${
                  formData.concerns.includes(concern.id) ? "bg-white border-purple-300" : "bg-white border-slate-200"
                }`}
                onClick={() => toggleConcern(concern.id)}
              >
                <Checkbox
                  id={`concern-${concern.id}`}
                  checked={formData.concerns.includes(concern.id)}
                  onCheckedChange={() => toggleConcern(concern.id)}
                  className={`h-5 w-5 ${formData.concerns.includes(concern.id) ? "text-purple-600" : ""}`}
                />
                <div className="flex items-center">
                  <span className="mr-2 text-lg">{concern.icon}</span>
                  <Label htmlFor={`concern-${concern.id}`} className="text-sm font-bold cursor-pointer">
                    {concern.id}
                  </Label>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div className="space-y-2" variants={item}>
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-purple-500" />
            <Label htmlFor="checkInTime" className="text-sm font-medium text-slate-700">
              Preferred daily check-in time
            </Label>
          </div>
          <p className="text-sm text-slate-500">We'll send you daily summaries and insights at this time.</p>
          <Input
            id="checkInTime"
            type="time"
            value={formData.checkInTime}
            onChange={(e) => updateFormData({ checkInTime: e.target.value })}
            className="h-12 rounded-xl border-slate-200 focus:border-purple-500 focus:ring-purple-500"
          />
        </motion.div>

        <motion.div className="space-y-3" variants={item}>
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-purple-500" />
            <Label className="text-sm font-medium text-slate-700">Notification Preferences</Label>
          </div>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 bg-white p-4 rounded-xl border-2 border-purple-200 transition-all hover:shadow-sm">
              <Checkbox
                id="emailNotifications"
                checked={formData.emailNotifications}
                onCheckedChange={(checked) => updateFormData({ emailNotifications: checked as boolean })}
                className="mt-1 text-purple-600 h-5 w-5"
              />
              <div>
                <Label htmlFor="emailNotifications" className="font-bold text-slate-800">
                  Email Notifications
                </Label>
                <p className="text-sm text-slate-600 font-medium">Receive updates and insights via email</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 bg-white p-4 rounded-xl border-2 border-purple-200 transition-all hover:shadow-sm">
              <Checkbox
                id="pushNotifications"
                checked={formData.pushNotifications}
                onCheckedChange={(checked) => updateFormData({ pushNotifications: checked as boolean })}
                className="mt-1 text-purple-600 h-5 w-5"
              />
              <div>
                <Label htmlFor="pushNotifications" className="font-bold text-slate-800">
                  Push Notifications
                </Label>
                <p className="text-sm text-slate-600 font-medium">Receive alerts and reminders on your device</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div className="pt-6 flex gap-3" variants={item}>
        <Button
          variant="outline"
          onClick={onBack}
          className="flex-1 h-14 rounded-xl border-2 border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-lg"
        >
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          className="flex-1 h-14 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-bold text-lg shadow-md"
        >
          Complete Setup
        </Button>
      </motion.div>
    </motion.div>
  )
}
