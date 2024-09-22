"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface FilmGrainOverlayProps {
  opacity?: number;
  textureNumber: number;
}

export default function FilmGrainOverlay({
  opacity = 0.3,
  textureNumber,
}: FilmGrainOverlayProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    const timer = setTimeout(() => setIsLoaded(true), 50);
    return () => clearTimeout(timer);
  }, [textureNumber]);

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-10 transition-opacity duration-1000 ease-in-out ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      <Image
        src={`/film-textures/texture${textureNumber}.jpg`}
        alt="Film Grain"
        fill
        style={{ opacity, objectFit: "cover", mixBlendMode: "multiply" }}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
}
