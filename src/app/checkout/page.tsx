"use client"

import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import { useCart } from "@/lib/contexts/cart-context"
import { useCurrency } from "@/lib/contexts/currency-context"
import { CartService } from "@/lib/services/cart.service"
import Link from "next/link"
import { ArrowLeft, Loader2 } from 'lucide-react'
import type { ShippingAddress } from "@/lib/types/cart.types"
import { useToast } from "@/hooks/use-toast"
import { getStripe } from "@/lib/stripe"
import { CheckoutStepper } from "@/components/checkout/checkout-stepper"
import { ContactForm } from "@/components/checkout/contact-form"
import { ShippingForm } from "@/components/checkout/shipping-form"
import { PaymentSection } from "@/components/checkout/payment-section"
import { OrderSummary } from "@/components/checkout/order-summary"

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, refreshCart } = useCart()
  const { currency: selectedCurrency } = useCurrency()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState<"contact" | "shipping" | "payment">("contact")
  const [clientSecret, setClientSecret] = useState<string | null>(null)

  const [shippingForm, setShippingForm] = useState<ShippingAddress>({
    first_name: "",
    last_name: "",
    address_1: "",
    address_2: "",
    city: "",
    country_code: "",
    postal_code: "",
    phone: "",
  })

  const [email, setEmail] = useState("")
  const [shippingOptions, setShippingOptions] = useState<any[]>([])
  const [selectedShippingOption, setSelectedShippingOption] = useState<string>("")
  const [isCalculatingShipping, setIsCalculatingShipping] = useState(false)

  useEffect(() => {
    if (!cart || cart.items?.length === 0) {
      router.push("/")
    }
  }, [cart, router])

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await CartService.updateEmail(email)
      await refreshCart()
      setCurrentStep("shipping")
      toast({
        title: "CONTACT SAVED",
        description: "Your contact information has been saved successfully.",
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to save contact information"
      toast({
        title: "CHECKOUT ERROR",
        description: message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleShippingSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await CartService.updateShippingAddress(shippingForm)
      await CartService.updateBillingAddress(shippingForm)

      if (!selectedShippingOption) {
        throw new Error("Please select a shipping option")
      }

      const cartWithShipping = await CartService.addShippingMethod(selectedShippingOption)

      if (!cartWithShipping.shipping_methods || cartWithShipping.shipping_methods.length === 0) {
        throw new Error("Failed to add shipping method to cart")
      }

      const updatedCart = await CartService.initializePaymentSession("pp_stripe_stripe")

      const paymentSession = updatedCart.payment_collection?.payment_sessions?.find(
        (ps: any) => ps.provider_id === "pp_stripe_stripe",
      )

      if (paymentSession?.data?.client_secret) {
        setClientSecret(paymentSession.data.client_secret)
        setCurrentStep("payment")
        await refreshCart()
        toast({
          title: "READY FOR PAYMENT",
          description: "Your order is ready for payment.",
        })
      } else {
        throw new Error("Failed to initialize payment session")
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to save shipping information"
      toast({
        title: "CHECKOUT ERROR",
        description: message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePaymentSuccess = async () => {
    setIsLoading(true)
    try {
      const { order } = await CartService.completeCart()
      router.push(`/order-confirmation/${order.id}`)
    } catch (error) {
      toast({
        title: "ORDER ERROR",
        description: "Failed to complete your order. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePaymentError = (error: string) => {
    toast({
      title: "PAYMENT ERROR",
      description: error,
      variant: "destructive",
    })
  }

  useEffect(() => {
    if (shippingForm.country_code && currentStep === "shipping") {
      const fetchShippingOptions = async () => {
        setIsCalculatingShipping(true)
        try {
          await CartService.updateShippingAddress({
            first_name: shippingForm.first_name || "",
            last_name: shippingForm.last_name || "",
            address_1: shippingForm.address_1 || "",
            city: shippingForm.city || "",
            country_code: shippingForm.country_code,
            postal_code: shippingForm.postal_code || "",
            phone: shippingForm.phone || "",
          })

          const options = await CartService.getShippingOptions()

          if (options && options.length > 0) {
            setShippingOptions(options)
            setSelectedShippingOption(options[0].id)
            
            await CartService.addShippingMethod(options[0].id)
            await refreshCart()
          } else {
            toast({
              title: "NO SHIPPING OPTIONS",
              description: "No shipping options available for the selected country.",
              variant: "destructive",
            })
          }
        } catch (error) {
          const message = error instanceof Error ? error.message : "Failed to calculate shipping"
          toast({
            title: "SHIPPING ERROR",
            description: message,
            variant: "destructive",
          })
        } finally {
          setIsCalculatingShipping(false)
        }
      }
      fetchShippingOptions()
    }
  }, [shippingForm.country_code, currentStep])

  if (!cart) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  const stripePromise = getStripe()
  const itemSubtotal = cart?.items?.reduce((sum, item) => sum + item.unit_price * item.quantity, 0) || 0
  const displayCurrency = cart?.currency_code || selectedCurrency
  const shippingAmount = cart?.shipping_methods?.[0]?.amount || 0

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="border-b-2 border-black dark:border-white pb-6 mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4 hover:underline">
            <ArrowLeft className="h-4 w-4" />
            <span className="font-helvicta text-sm">BACK TO SHOP</span>
          </Link>
          <h1 className="font-helvicta text-3xl font-bold">CHECKOUT</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <CheckoutStepper currentStep={currentStep} />

            {currentStep === "contact" && (
              <ContactForm
                email={email}
                shippingForm={shippingForm}
                isLoading={isLoading}
                onEmailChange={setEmail}
                onShippingFormChange={setShippingForm}
                onSubmit={handleContactSubmit}
              />
            )}

            {currentStep === "shipping" && (
              <ShippingForm
                shippingForm={shippingForm}
                isLoading={isLoading}
                isCalculatingShipping={isCalculatingShipping}
                shippingOptions={shippingOptions}
                selectedShippingOption={selectedShippingOption}
                shippingAmount={shippingAmount}
                displayCurrency={displayCurrency}
                onShippingFormChange={setShippingForm}
                onShippingOptionChange={setSelectedShippingOption}
                onSubmit={handleShippingSubmit}
                onBack={() => setCurrentStep("contact")}
              />
            )}

            {currentStep === "payment" && (
              <PaymentSection
                clientSecret={clientSecret}
                stripePromise={stripePromise}
                email={email}
                shippingForm={shippingForm}
                shippingOptions={shippingOptions}
                selectedShippingOption={selectedShippingOption}
                onPaymentSuccess={handlePaymentSuccess}
                onPaymentError={handlePaymentError}
                onEditContact={() => setCurrentStep("contact")}
                onEditShipping={() => setCurrentStep("shipping")}
              />
            )}
          </div>

          <div className="lg:sticky lg:top-8 h-fit">
            <OrderSummary
              cart={cart}
              displayCurrency={displayCurrency}
              itemSubtotal={itemSubtotal}
              shippingAmount={shippingAmount}
              showShipping={(currentStep === "shipping" || currentStep === "payment") && shippingOptions.length > 0}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
