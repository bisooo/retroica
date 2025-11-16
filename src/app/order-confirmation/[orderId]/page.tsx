import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function OrderConfirmationPage({ params }: { params: { orderId: string } }) {
  const { orderId } = params

  return (
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center space-y-6">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-24 w-24 text-green-500" />
        </div>

        <h1 className="font-helvicta text-4xl font-bold">ORDER CONFIRMED!</h1>

        <p className="font-business text-lg text-gray-600 dark:text-gray-400">
          Thank you for your order. We've received your payment and will start processing your order shortly.
        </p>

        <div className="border-2 border-black dark:border-white p-6 bg-gray-50 dark:bg-gray-900">
          <p className="font-helvicta text-sm mb-2">ORDER NUMBER</p>
          <p className="font-business text-2xl font-bold">{orderId}</p>
        </div>

        <p className="font-business text-sm text-gray-600 dark:text-gray-400">
          A confirmation email has been sent to your email address with order details and tracking information.
        </p>

        <div className="pt-6 space-y-4">
          <Link href="/" className="block">
            <Button className="w-full font-helvicta h-12">CONTINUE SHOPPING</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
