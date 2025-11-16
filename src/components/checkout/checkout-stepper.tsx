"use client"

type Step = "contact" | "shipping" | "payment"

interface CheckoutStepperProps {
  currentStep: Step
}

export function CheckoutStepper({ currentStep }: CheckoutStepperProps) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className={`flex items-center gap-2 ${currentStep === "contact" ? "font-bold" : "text-gray-500"}`}>
        <div className="w-8 h-8 rounded-full border-2 border-black dark:border-white flex items-center justify-center font-helvicta text-sm">
          1
        </div>
        <span className="font-helvicta text-sm">CONTACT</span>
      </div>
      <div className="flex-1 h-0.5 bg-gray-300 dark:bg-gray-700" />
      <div className={`flex items-center gap-2 ${currentStep === "shipping" ? "font-bold" : "text-gray-500"}`}>
        <div className="w-8 h-8 rounded-full border-2 border-black dark:border-white flex items-center justify-center font-helvicta text-sm">
          2
        </div>
        <span className="font-helvicta text-sm">SHIPPING</span>
      </div>
      <div className="flex-1 h-0.5 bg-gray-300 dark:bg-gray-700" />
      <div className={`flex items-center gap-2 ${currentStep === "payment" ? "font-bold" : "text-gray-500"}`}>
        <div className="w-8 h-8 rounded-full border-2 border-black dark:border-white flex items-center justify-center font-helvicta text-sm">
          3
        </div>
        <span className="font-helvicta text-sm">PAYMENT</span>
      </div>
    </div>
  )
}
