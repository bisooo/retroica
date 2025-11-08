import { Instagram, Youtube } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us - RETRO-ICA | Get In Touch",
  description:
    "Get in touch with RETRO-ICA through Instagram, YouTube, or our Etsy store for inquiries about authentic, tested, retro electronics.",
}

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="font-helvicta text-4xl md:text-5xl font-bold mb-8 text-black dark:text-white">CONTACT US</h1>

        <div className="space-y-8">
          <p className="font-business text-lg text-black dark:text-white">
            This website is a work in progress. <br></br>
            You can reach us through Instagram or our Etsy store for now
          </p>

          {/* Social Icons */}
          <div>
            <div className="flex justify-center space-x-3">
              <a
                href="https://www.instagram.com/retroica.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 border-2 border-black dark:border-white bg-white dark:bg-black hover:bg-gray-100 dark:hover:bg-gray-900 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6 text-black dark:text-white" />
              </a>
              <a
                href="https://www.etsy.com/shop/Retroica"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 border-2 border-black dark:border-white bg-white dark:bg-black hover:bg-gray-100 dark:hover:bg-gray-900 flex items-center justify-center transition-colors"
                aria-label="Etsy"
              >
                <svg className="w-6 h-6 text-black dark:text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.5 3c-1.5 0-3 .5-4.5 1.5C10.5 3.5 9 3 7.5 3 4.5 3 2 5.5 2 8.5c0 4 3.5 7.5 10 13 6.5-5.5 10-9 10-13C22 5.5 19.5 3 16.5 3z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@retroica"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 border-2 border-black dark:border-white bg-white dark:bg-black hover:bg-gray-100 dark:hover:bg-gray-900 flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-6 h-6 text-black dark:text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
