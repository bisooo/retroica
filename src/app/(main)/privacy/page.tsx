import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy - RETRO-ICA | Your Privacy Matters",
  description:
    "Read RETRO-ICA's privacy policy to understand how we handle your information when you shop for authentic, tested, retro electronics.",
}

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-helvicta text-4xl md:text-5xl font-bold mb-8 text-black dark:text-white">PRIVACY POLICY</h1>

        <div className="font-business text-sm space-y-6 text-black dark:text-white">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Last Updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>

          <section>
            <h2 className="font-helvicta text-xl font-bold mb-3 text-black dark:text-white">1. Introduction</h2>
            <p>
              RETRO-ICA ("we," "us," or "our") operates this website to provide information about our vintage
              electronics products. This Privacy Policy explains how we collect, use, and protect your information.
            </p>
          </section>

          <section>
            <h2 className="font-helvicta text-xl font-bold mb-3 text-black dark:text-white">
              2. Information We Collect
            </h2>
            <p>
              Currently, this website is informational and does not collect or store any personal data directly. We do
              not use cookies, analytics, or tracking technologies on this site.
            </p>
          </section>

          <section>
            <h2 className="font-helvicta text-xl font-bold mb-3 text-black dark:text-white">3. Product Information</h2>
            <p>
              All product information displayed on this website is sourced from our inventory database. Product images
              and descriptions are used solely for the purpose of showcasing our vintage electronics collection.
            </p>
          </section>

          <section>
            <h2 className="font-helvicta text-xl font-bold mb-3 text-black dark:text-white">
              4. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy as our website evolves. Any changes will be posted on this page with an
              updated revision date.
            </p>
          </section>

          <section>
            <h2 className="font-helvicta text-xl font-bold mb-3 text-black dark:text-white">5. Contact Us</h2>
            <p>If you have questions about this Privacy Policy, please contact us through:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Instagram: @retroica.co</li>
              <li>Etsy: Retroica</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
