import Image from "next/image";

interface ProductImageProps {
  src: string;
  alt: string;
}

export function ProductImage({ src, alt }: ProductImageProps) {
  return (
    <div className="aspect-square relative border border-[#CCCCCC]">
      <Image src={src} alt={alt} fill className="object-cover" />
    </div>
  );
}
