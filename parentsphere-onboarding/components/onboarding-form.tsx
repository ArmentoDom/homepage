"use client"

import { useState } from "react"
import { PersonalInfoStep } from "./steps/personal-info-step"
import { BabyInfoStep } from "./steps/baby-info-step"
import { PreferencesStep } from "./steps/preferences-step"
import { CompletionStep } from "./steps/completion-step"
import { ProgressIndicator } from "./progress-indicator"
import { motion, AnimatePresence } from "framer-motion"

type BabyInfo = {
  name: string
  gender: "Boy" | "Girl" | "Other/Prefer not to say"
  birthdate: string
  weight?: string
  height?: string
}

export type FormData = {
  fullName: string
  dateOfBirth: string
  parentLevel: "Expecting" | "New Parent" | "Experienced Parent"
  babies: BabyInfo[]
  concerns: string[]
  checkInTime: string
  emailNotifications: boolean
  pushNotifications: boolean
}

export function OnboardingForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    dateOfBirth: "",
    parentLevel: "Expecting",
    babies: [
      {
        name: "",
        gender: "Boy",
        birthdate: "",
        weight: "",
        height: "",
      },
    ],
    concerns: [],
    checkInTime: "09:00",
    emailNotifications: true,
    pushNotifications: true,
  })

  const totalSteps = 4

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const handleSubmit = () => {
    // In a real app, you would submit the data to your backend here
    console.log("Form submitted:", formData)
    handleNext()
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-violet-100">
      <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps - 1} />

      <div className="p-6 md:p-8 bg-slate-50">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <PersonalInfoStep formData={formData} updateFormData={updateFormData} onNext={handleNext} />
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <BabyInfoStep
                formData={formData}
                updateFormData={updateFormData}
                onNext={handleNext}
                onBack={handleBack}
              />
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <PreferencesStep
                formData={formData}
                updateFormData={updateFormData}
                onNext={handleSubmit}
                onBack={handleBack}
              />
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <CompletionStep name={formData.fullName} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
