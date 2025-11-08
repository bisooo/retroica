import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "FAQ - RETRO-ICA | Frequently Asked Questions",
  description: "Find answers to common questions about purchasing authentic, tested, retro electronics from RETRO-ICA.",
}

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-helvicta text-4xl md:text-5xl font-bold mb-8 text-black dark:text-white">
          FREQUENTLY ASKED QUESTIONS
        </h1>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-2 border-black dark:border-white mb-4">
            <AccordionTrigger className="font-helvicta text-lg px-4 hover:no-underline text-black dark:text-white">
              What is your testing process?
            </AccordionTrigger>
            <AccordionContent className="font-business text-sm px-4 pb-4 text-black dark:text-white">
              Answer will be added here.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border-2 border-black dark:border-white mb-4">
            <AccordionTrigger className="font-helvicta text-lg px-4 hover:no-underline text-black dark:text-white">
              Do you offer warranties?
            </AccordionTrigger>
            <AccordionContent className="font-business text-sm px-4 pb-4 text-black dark:text-white">
              Answer will be added here.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border-2 border-black dark:border-white mb-4">
            <AccordionTrigger className="font-helvicta text-lg px-4 hover:no-underline text-black dark:text-white">
              How long does shipping take?
            </AccordionTrigger>
            <AccordionContent className="font-business text-sm px-4 pb-4 text-black dark:text-white">
              Answer will be added here.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="border-2 border-black dark:border-white mb-4">
            <AccordionTrigger className="font-helvicta text-lg px-4 hover:no-underline text-black dark:text-white">
              What payment methods do you accept?
            </AccordionTrigger>
            <AccordionContent className="font-business text-sm px-4 pb-4 text-black dark:text-white">
              Answer will be added here.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5" className="border-2 border-black dark:border-white mb-4">
            <AccordionTrigger className="font-helvicta text-lg px-4 hover:no-underline text-black dark:text-white">
              Can I return or exchange items?
            </AccordionTrigger>
            <AccordionContent className="font-business text-sm px-4 pb-4 text-black dark:text-white">
              Answer will be added here.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
