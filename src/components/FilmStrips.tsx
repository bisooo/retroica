"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const StackedFilmStrip = ({ position }: { position: "left" | "right" }) => {
  return (
    <>
      <div className="absolute top-0 h-1/2 w-full">
        <Image
          src="/film-strip.png"
          alt={`${position} film strip top`}
          fill
          sizes="45px"
          style={{
            objectFit: "cover",
            objectPosition: position,
          }}
          quality={100}
          priority
        />
      </div>
      <div className="absolute bottom-0 h-1/2 w-full">
        <Image
          src="/film-strip.png"
          alt={`${position} film strip bottom`}
          fill
          sizes="45px"
          style={{
            objectFit: "cover",
            objectPosition: position,
          }}
          quality={100}
          priority
        />
      </div>
    </>
  );
};

export default function FilmStrips() {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const stripWidth = windowWidth < 768 ? 30 : 45;

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 30 }}>
      <div
        className="absolute left-0 top-0 h-full"
        style={{ width: stripWidth }}
      >
        <StackedFilmStrip position="left" />
      </div>
      <div
        className="absolute right-0 top-0 h-full"
        style={{ width: stripWidth }}
      >
        <StackedFilmStrip position="right" />
      </div>
    </div>
  );
}
