import { OnboardingForm } from "@/components/onboarding-form"

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100">
      <div className="container max-w-md md:max-w-2xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-violet-600 to-sky-600 bg-clip-text text-transparent">
            ParentSphere
          </h1>
          <p className="text-slate-600 mt-2 font-semibold">Your companion on the parenting journey</p>
        </div>
        <OnboardingForm />
      </div>
    </main>
  )
}
