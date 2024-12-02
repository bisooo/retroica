import Image from "next/image";
import Product3DModel from "../Product3DModel";

interface ProductImageProps {
  src: string;
  alt: string;
}

export function ProductImage({ src, alt }: ProductImageProps) {
  return (
    <div className="aspect-square relative border border-[#CCCCCC]">
      <Product3DModel/>
    </div>
  );
}
