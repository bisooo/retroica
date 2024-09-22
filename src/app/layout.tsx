import type { Metadata } from "next";
import "@/../styles/globals.css";
import { Navbar } from "@/components/Navbar";
import { PageLoader } from "@/components/PageLoader";

export const metadata: Metadata = {
  title: "RETRO-ICA",
  description: "A retro cameras store front",
  icons: {
    icon: "/lens.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-[#CCCCCC]">
        <PageLoader>
          <div className="flex flex-col min-h-screen relative">
            <div className="z-20 relative">
              <Navbar />
              <div className="flex-grow overflow-auto">{children}</div>
            </div>
          </div>
        </PageLoader>
      </body>
    </html>
  );
}
