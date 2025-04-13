"use client"

import type { FormData } from "../onboarding-form"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState } from "react"
import { motion } from "framer-motion"
import { Baby, Calendar, User } from "lucide-react"

interface PersonalInfoStepProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  onNext: () => void
}

export function PersonalInfoStep({ formData, updateFormData, onNext }: PersonalInfoStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validate()) {
      onNext()
    }
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
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-violet-700 mb-4 shadow-lg">
          <User className="h-10 w-10 text-white" />
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-violet-600 to-sky-600 bg-clip-text text-transparent">
          Tell us about yourself
        </h2>
        <p className="text-slate-600 mt-2 font-medium text-lg">Help us personalize your experience</p>
      </motion.div>

      <div className="space-y-5">
        <motion.div className="space-y-2" variants={item}>
          <Label htmlFor="fullName" className="text-sm font-bold text-slate-700">
            Full Name
          </Label>
          <Input
            id="fullName"
            value={formData.fullName}
            onChange={(e) => updateFormData({ fullName: e.target.value })}
            placeholder="Enter your full name"
            className={`h-12 rounded-xl border-slate-200 focus:border-violet-500 focus:ring-violet-500 ${errors.fullName ? "border-red-500" : ""}`}
          />
          {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
        </motion.div>

        <motion.div className="space-y-2" variants={item}>
          <Label htmlFor="dateOfBirth" className="text-sm font-bold text-slate-700">
            Date of Birth
          </Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => updateFormData({ dateOfBirth: e.target.value })}
            className={`h-12 rounded-xl border-slate-200 focus:border-violet-500 focus:ring-violet-500 ${errors.dateOfBirth ? "border-red-500" : ""}`}
          />
          {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
        </motion.div>

        <motion.div className="space-y-3" variants={item}>
          <Label className="text-sm font-bold text-slate-700">Parent Level</Label>
          <RadioGroup
            value={formData.parentLevel}
            onValueChange={(value) =>
              updateFormData({ parentLevel: value as "Expecting" | "New Parent" | "Experienced Parent" })
            }
            className="space-y-3"
          >
            <div className="flex items-center space-x-3 bg-white p-4 rounded-xl border-2 border-violet-200 transition-all hover:shadow-md">
              <RadioGroupItem value="Expecting" id="expecting" className="text-violet-600 h-5 w-5" />
              <div className="flex-1">
                <Label htmlFor="expecting" className="font-bold text-slate-800 text-base">
                  Expecting
                </Label>
                <p className="text-sm text-slate-600 font-medium">Preparing for baby's arrival</p>
              </div>
              <Calendar className="h-6 w-6 text-violet-500" />
            </div>

            <div className="flex items-center space-x-3 bg-white p-4 rounded-xl border-2 border-sky-200 transition-all hover:shadow-md">
              <RadioGroupItem value="New Parent" id="new-parent" className="text-sky-600 h-5 w-5" />
              <div className="flex-1">
                <Label htmlFor="new-parent" className="font-bold text-slate-800 text-base">
                  New Parent
                </Label>
                <p className="text-sm text-slate-600 font-medium">First year of parenthood</p>
              </div>
              <Baby className="h-6 w-6 text-sky-500" />
            </div>

            <div className="flex items-center space-x-3 bg-white p-4 rounded-xl border-2 border-emerald-200 transition-all hover:shadow-md">
              <RadioGroupItem value="Experienced Parent" id="experienced-parent" className="text-emerald-600 h-5 w-5" />
              <div className="flex-1">
                <Label htmlFor="experienced-parent" className="font-bold text-slate-800 text-base">
                  Experienced Parent
                </Label>
                <p className="text-sm text-slate-600 font-medium">Been through this before</p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-emerald-500 h-6 w-6"
              >
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
          </RadioGroup>
        </motion.div>
      </div>

      <motion.div className="pt-6" variants={item}>
        <Button
          onClick={handleNext}
          className="w-full h-14 rounded-xl bg-gradient-to-r from-violet-600 to-sky-600 hover:from-violet-700 hover:to-sky-700 text-white font-bold text-lg shadow-md"
        >
          Continue
        </Button>
      </motion.div>
    </motion.div>
  )
}
