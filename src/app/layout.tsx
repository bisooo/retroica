import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "@/../styles/globals.css";
import { Navbar } from "@/components/Navbar";
import { PageLoader } from "@/components/PageLoader";
import FilmStrips from "@/components/FilmStrips";
import CustomScrollbar from "@/components/CustomScrollbar";
import { GlobalStyles } from "@/components/GlobalStyles";

export const metadata: Metadata = {
  title: "RETRO-ICA",
  description: "A retro cameras store front",
  icons: {
    icon: "/lens.png",
  },
};

const font = Kanit({ weight: "400", subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={font.className}>
      <body className="bg-black text-[#CCCCCC]">
        <GlobalStyles />
        <CustomScrollbar />
        <PageLoader>
          <FilmStrips />
          <div className="relative z-30 flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow overflow-auto px-[45px] md:px-[45px]">
              {children}
            </main>
          </div>
        </PageLoader>
      </body>
    </html>
  );
}
