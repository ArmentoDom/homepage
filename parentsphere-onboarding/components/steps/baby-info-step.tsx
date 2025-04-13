"use client"

import { useState } from "react"
import type { FormData } from "../onboarding-form"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { PlusCircle, Trash2, Baby, Heart } from "lucide-react"
import { motion } from "framer-motion"

interface BabyInfoStepProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  onNext: () => void
  onBack: () => void
}

export function BabyInfoStep({ formData, updateFormData, onNext, onBack }: BabyInfoStepProps) {
  const [errors, setErrors] = useState<Record<string, string[]>>({})

  const validate = () => {
    const newErrors: Record<string, string[]> = { name: [], birthdate: [] }
    let isValid = true

    formData.babies.forEach((baby, index) => {
      if (!baby.name.trim()) {
        if (!newErrors.name) newErrors.name = []
        newErrors.name[index] = "Baby's name is required"
        isValid = false
      }

      if (!baby.birthdate && formData.parentLevel !== "Expecting") {
        if (!newErrors.birthdate) newErrors.birthdate = []
        newErrors.birthdate[index] = "Birthdate is required"
        isValid = false
      }
    })

    setErrors(newErrors)
    return isValid
  }

  const handleNext = () => {
    if (validate()) {
      onNext()
    }
  }

  const updateBaby = (index: number, data: Partial<(typeof formData.babies)[0]>) => {
    const updatedBabies = [...formData.babies]
    updatedBabies[index] = { ...updatedBabies[index], ...data }
    updateFormData({ babies: updatedBabies })
  }

  const addBaby = () => {
    updateFormData({
      babies: [
        ...formData.babies,
        {
          name: "",
          gender: "Boy",
          birthdate: "",
          weight: "",
          height: "",
        },
      ],
    })
  }

  const removeBaby = (index: number) => {
    if (formData.babies.length > 1) {
      const updatedBabies = formData.babies.filter((_, i) => i !== index)
      updateFormData({ babies: updatedBabies })
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
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-sky-500 to-sky-700 mb-4 shadow-lg">
          <Baby className="h-10 w-10 text-white" />
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-sky-600 to-violet-600 bg-clip-text text-transparent">
          Baby Information
        </h2>
        <p className="text-slate-600 mt-2 font-medium text-lg">Tell us about your little one</p>
      </motion.div>

      {formData.babies.map((baby, index) => (
        <motion.div
          key={index}
          className="p-5 border-2 border-sky-200 rounded-xl space-y-4 bg-white shadow-sm"
          variants={item}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          {formData.babies.length > 1 && (
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Heart className="h-4 w-4 text-pink-500 mr-2" />
                <h3 className="font-semibold text-sky-700">Baby {index + 1}</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeBaby(index)}
                className="text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full h-8 w-8 p-0"
              >
                <Trash2 size={16} />
              </Button>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor={`babyName-${index}`} className="text-sm font-bold text-slate-700">
              Baby's Name
            </Label>
            <Input
              id={`babyName-${index}`}
              value={baby.name}
              onChange={(e) => updateBaby(index, { name: e.target.value })}
              placeholder="Enter baby's name"
              className={`h-12 rounded-xl border-slate-200 focus:border-sky-500 focus:ring-sky-500 ${errors.name?.[index] ? "border-red-500" : ""}`}
            />
            {errors.name?.[index] && <p className="text-red-500 text-sm mt-1">{errors.name[index]}</p>}
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-bold text-slate-700">Gender</Label>
            <RadioGroup
              value={baby.gender}
              onValueChange={(value) =>
                updateBaby(index, { gender: value as "Boy" | "Girl" | "Other/Prefer not to say" })
              }
              className="flex flex-wrap gap-3"
            >
              <div className="flex-1 min-w-[100px] flex items-center space-x-2 bg-white p-3 rounded-xl border-2 border-blue-200 transition-all hover:shadow-sm">
                <RadioGroupItem value="Boy" id={`boy-${index}`} className="text-blue-600 h-5 w-5" />
                <Label htmlFor={`boy-${index}`} className="font-bold text-slate-700">
                  Boy
                </Label>
              </div>

              <div className="flex-1 min-w-[100px] flex items-center space-x-2 bg-white p-3 rounded-xl border-2 border-pink-200 transition-all hover:shadow-sm">
                <RadioGroupItem value="Girl" id={`girl-${index}`} className="text-pink-600 h-5 w-5" />
                <Label htmlFor={`girl-${index}`} className="font-bold text-slate-700">
                  Girl
                </Label>
              </div>

              <div className="flex-1 min-w-[100px] flex items-center space-x-2 bg-white p-3 rounded-xl border-2 border-purple-200 transition-all hover:shadow-sm">
                <RadioGroupItem
                  value="Other/Prefer not to say"
                  id={`other-${index}`}
                  className="text-purple-600 h-5 w-5"
                />
                <Label htmlFor={`other-${index}`} className="font-bold text-slate-700">
                  Other
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`birthdate-${index}`} className="text-sm font-bold text-slate-700">
              {formData.parentLevel === "Expecting" ? "Expected Due Date" : "Birthdate"}
            </Label>
            <Input
              id={`birthdate-${index}`}
              type="date"
              value={baby.birthdate}
              onChange={(e) => updateBaby(index, { birthdate: e.target.value })}
              className={`h-12 rounded-xl border-slate-200 focus:border-sky-500 focus:ring-sky-500 ${errors.birthdate?.[index] ? "border-red-500" : ""}`}
            />
            {errors.birthdate?.[index] && <p className="text-red-500 text-sm mt-1">{errors.birthdate[index]}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`weight-${index}`} className="text-sm font-bold text-slate-700">
                Weight (optional)
              </Label>
              <Input
                id={`weight-${index}`}
                value={baby.weight}
                onChange={(e) => updateBaby(index, { weight: e.target.value })}
                placeholder="e.g., 7.5 lbs"
                className="h-12 rounded-xl border-slate-200 focus:border-sky-500 focus:ring-sky-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`height-${index}`} className="text-sm font-bold text-slate-700">
                Height (optional)
              </Label>
              <Input
                id={`height-${index}`}
                value={baby.height}
                onChange={(e) => updateBaby(index, { height: e.target.value })}
                placeholder="e.g., 20 inches"
                className="h-12 rounded-xl border-slate-200 focus:border-sky-500 focus:ring-sky-500"
              />
            </div>
          </div>
        </motion.div>
      ))}

      <motion.div variants={item}>
        <Button
          variant="outline"
          onClick={addBaby}
          className="w-full h-12 rounded-xl border-dashed border-2 border-sky-300 text-sky-600 hover:bg-sky-50 font-medium"
        >
          <PlusCircle size={18} className="mr-2" />
          Add Another Baby
        </Button>
      </motion.div>

      <motion.div className="pt-6 flex gap-3" variants={item}>
        <Button
          variant="outline"
          onClick={onBack}
          className="flex-1 h-14 rounded-xl border-2 border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-lg"
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
          className="flex-1 h-14 rounded-xl bg-gradient-to-r from-sky-600 to-violet-600 hover:from-sky-700 hover:to-violet-700 text-white font-bold text-lg shadow-md"
        >
          Continue
        </Button>
      </motion.div>
    </motion.div>
  )
}
