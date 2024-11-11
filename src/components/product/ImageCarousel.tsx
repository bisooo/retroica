import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface ImageCarouselProps {
  images: string[];
  productName: string;
}

export function ImageCarousel({ images, productName }: ImageCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current!.offsetLeft);
    setScrollLeft(carouselRef.current!.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current!.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current!.scrollLeft = scrollLeft - walk;
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("mouseleave", handleMouseLeave);
      carousel.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      if (carousel) {
        carousel.removeEventListener("mouseleave", handleMouseLeave);
        carousel.removeEventListener("mouseup", handleMouseUp);
      }
    };
  }, []);

  return (
    <div className="relative mt-8">
      <div
        ref={carouselRef}
        className="flex space-x-2 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="flex-none w-96 h-96 relative border border-[#CCCCCC]"
          >
            <Image
              src={image}
              alt={`${productName} view ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
