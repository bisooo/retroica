"use client";

import { useState, useEffect } from "react";
import FilmGrainOverlayWrapper from "./FilmGrainOverlayWrapper";

interface PageLoaderProps {
  children: React.ReactNode;
  minLoadTime?: number;
  fadeOutDuration?: number;
}

export function PageLoader({
  children,
  minLoadTime = 1000,
  fadeOutDuration = 500,
}: PageLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const startTime = Date.now();

    const checkLoadStatus = () => {
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime >= minLoadTime && document.readyState === "complete") {
        setIsLoading(false);
      } else {
        requestAnimationFrame(checkLoadStatus);
      }
    };

    const animationFrameId = requestAnimationFrame(checkLoadStatus);

    return () => cancelAnimationFrame(animationFrameId);
  }, [minLoadTime]);

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <div className="text-white">LOADING...</div>
        </div>
      )}
      <div
        className={`transition-opacity duration-${fadeOutDuration} ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        <FilmGrainOverlayWrapper />
        {children}
      </div>
    </>
  );
}
