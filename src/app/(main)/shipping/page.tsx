import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Shipping & Returns - RETRO-ICA | Worldwide Shipping",
  description:
    "View our shipping policies for EU, UK, US, Canada, Australia, and Czech Republic. Learn about our return policy for authentic, tested, retro electronics.",
}

export default function ShippingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-helvicta text-4xl md:text-5xl font-bold mb-8 text-black dark:text-white">
          SHIPPING & RETURNS
        </h1>

        <div className="space-y-8">
          {/* Shipping Information */}
          <div>
            <Accordion type="multiple" defaultValue={["eu", "us", "uk", "cz", "ca", "au"]} className="w-full">
              <AccordionItem value="eu" className="border-2 border-black dark:border-white mb-4">
                <AccordionTrigger className="font-helvicta text-lg px-4 hover:no-underline text-black dark:text-white">
                  🇪🇺 EUROPEAN UNION
                </AccordionTrigger>
                <AccordionContent className="font-business text-sm px-4 pb-4 text-black dark:text-white">
                  <p className="text-gray-600 dark:text-gray-400">Small items (0 - 1 kgs) €5.99</p>
                </AccordionContent>
                <AccordionContent className="font-business text-sm px-4 pb-4 text-black dark:text-white">
                  <p className="text-gray-600 dark:text-gray-400">Medium items (1 - 2 kgs) €9.99</p>
                </AccordionContent>
                <AccordionContent className="font-business text-sm px-4 pb-4 text-black dark:text-white">
                  <p className="text-gray-600 dark:text-gray-400">Large items (2 - 5 kgs) €12.99</p>
                </AccordionContent>
                <AccordionContent className="font-business text-sm px-4 pb-4 text-black dark:text-white">
                  <p className="text-gray-600 dark:text-gray-400">Additional fee (multiple items) €7.99</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="us" className="border-2 border-black dark:border-white mb-4">
                <AccordionTrigger className="font-helvicta text-lg px-4 hover:no-underline text-black dark:text-white">
                  🇺🇸 UNITED STATES
                </AccordionTrigger>
                <AccordionContent className="font-business text-sm px-4 pb-4 text-black dark:text-white">
                  <p className="text-gray-600 dark:text-gray-400">Small items (0 - 1 kgs) $24.99</p>
                </AccordionContent>
                <AccordionContent className="font-business text-sm px-4 pb-4 text-black dark:text-white">
                  <p className="text-gray-600 dark:text-gray-400">Medium items (1 - 2 kgs) $34.99</p>
                </AccordionContent>
                <AccordionContent className="font-business text-sm px-4 pb-4 text-black dark:text-white">
                  <p className="text-gray-600 dark:text-gray-400">Large items (2 - 5 kgs) $54.99</p>
                </AccordionContent>
                <AccordionContent className="font-business text-sm px-4 pb-4 text-black dark:text-white">
                  <p className="text-gray-600 dark:text-gray-400">Additional fee (multiple items) $9.99</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="uk" className="border-2 border-black dark:border-white mb-4">
                <AccordionTrigger className="font-helvicta text-lg px-4 hover:no-underline text-black dark:text-white">
                  🇬🇧 UNITED KINGDOM
                </AccordionTrigger>
                <AccordionContent className="font-business text-sm px-4 pb-4 text-black dark:text-white">
                  <p className="text-gray-600 dark:text-gray-400">Small items (0 - 1 kgs) £9.99</p>
                </AccordionContent>
                <AccordionContent className="font-business text-sm px-4 pb-4 text-black dark:text-white">
                  <p className="text-gray-600 dark:text-gray-400">Medium items (1 - 2 kgs) £12.99</p>
                </AccordionContent>
                <AccordionContent className="font-business text-sm px-4 pb-4 text-black dark:text-white">
                  <p className="text-gray-600 dark:text-gray-400">Large items (2 - 5 kgs) £16.99</p>
                </AccordionContent>
                <AccordionContent className="font-business text-sm px-4 pb-4 text-black dark:text-white">
                  <p className="text-gray-600 dark:text-gray-400">Additional fee (multiple items) £9.99</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="cz" className="border-2 border-black dark:border-white mb-4">
                <AccordionTrigger className="font-helvicta text-lg px-4 hover:no-underline text-black dark:text-white">
                  🇨🇿 CZECH REPUBLIC
                </AccordionTrigger>
                <AccordionContent className="font-business text-sm px-4 pb-4 text-black dark:text-white">
                  <p className="text-gray-600 dark:text-gray-400">FREE SHIPPING</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="ca" className="border-2 border-black dark:border-white mb-4">
                <AccordionTrigger className="font-helvicta text-lg px-4 hover:no-underline text-black dark:text-white">
                  🇨🇦 CANADA
                </AccordionTrigger>
                <AccordionContent className="font-business text-sm px-4 pb-4 text-black dark:text-white">
                  <p className="text-gray-600 dark:text-gray-400">Small items (0 - 1 kgs) C$24.99</p>
                </AccordionContent>
                <AccordionContent className="font-business text-sm px-4 pb-4 text-black dark:text-white">
                  <p className="text-gray-600 dark:text-gray-400">Medium items (1 - 2 kgs) C$34.99</p>
                </AccordionContent>
                <AccordionContent className="font-business text-sm px-4 pb-4 text-black dark:text-white">
                  <p className="text-gray-600 dark:text-gray-400">Large items (2 - 5 kgs) C$54.99</p>
                </AccordionContent>
                <AccordionContent className="font-business text-sm px-4 pb-4 text-black dark:text-white">
                  <p className="text-gray-600 dark:text-gray-400">Additional fee (multiple items) C$9.99</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="au" className="border-2 border-black dark:border-white mb-4">
                <AccordionTrigger className="font-helvicta text-lg px-4 hover:no-underline text-black dark:text-white">
                  🇦🇺 AUSTRALIA
                </AccordionTrigger>
                <AccordionContent className="font-business text-sm px-4 pb-4 text-black dark:text-white">
                  <p className="text-gray-600 dark:text-gray-400">Small items (0 - 1 kgs) A$34.99</p>
                </AccordionContent>
                <AccordionContent className="font-business text-sm px-4 pb-4 text-black dark:text-white">
                  <p className="text-gray-600 dark:text-gray-400">Medium items (1 - 2 kgs) A$54.99</p>
                </AccordionContent>
                <AccordionContent className="font-business text-sm px-4 pb-4 text-black dark:text-white">
                  <p className="text-gray-600 dark:text-gray-400">Large items (2 - 5 kgs) A$89.99</p>
                </AccordionContent>
                <AccordionContent className="font-business text-sm px-4 pb-4 text-black dark:text-white">
                  <p className="text-gray-600 dark:text-gray-400">Additional fee (multiple items) A$9.99</p>
                </AccordionContent>
              </AccordionItem>
                            <AccordionItem value="eu" className="border-2 border-black dark:border-white mb-4">
                <AccordionTrigger className="font-helvicta text-lg px-4 hover:no-underline text-black dark:text-white">
                  🇪🇺 EUROPE (NON-EU)
                </AccordionTrigger>
                <AccordionContent className="font-business text-sm px-4 pb-4 text-black dark:text-white">
                  <p className="text-gray-600 dark:text-gray-400">Small items (0 - 1 kgs) €12.99</p>
                </AccordionContent>
                <AccordionContent className="font-business text-sm px-4 pb-4 text-black dark:text-white">
                  <p className="text-gray-600 dark:text-gray-400">Medium items (1 - 2 kgs) €14.99</p>
                </AccordionContent>
                <AccordionContent className="font-business text-sm px-4 pb-4 text-black dark:text-white">
                  <p className="text-gray-600 dark:text-gray-400">Large items (2 - 5 kgs) €16.99</p>
                </AccordionContent>
                <AccordionContent className="font-business text-sm px-4 pb-4 text-black dark:text-white">
                  <p className="text-gray-600 dark:text-gray-400">Additional fee (multiple items) €7.99</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Return Policy */}
          <div className="border-t-2 border-black dark:border-white pt-8">
            <h2 className="font-helvicta text-2xl font-bold mb-4 text-black dark:text-white">RETURN POLICY</h2>
            <div className="font-business text-sm space-y-4 text-black dark:text-white">
              <p className="text-gray-600 dark:text-gray-400">Return policy details will be added here.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
