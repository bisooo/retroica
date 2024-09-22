"use client";

import { usePathname } from "next/navigation";
import FilmGrainOverlay from "./FilmGrainOverlay";

export default function FilmGrainOverlayWrapper() {
  const pathname = usePathname();

  const getTextureNumber = (path: string) => {
    switch (path) {
      case "/":
        return 4;
      case "/cameras":
        return 1;
      case "/cam-coder":
        return 3;
      case "/content":
        return 2;
      default:
        return 1;
    }
  };

  const textureNumber = getTextureNumber(pathname);

  return (
    <FilmGrainOverlay
      key={textureNumber}
      opacity={0.5}
      textureNumber={textureNumber}
    />
  );
}
