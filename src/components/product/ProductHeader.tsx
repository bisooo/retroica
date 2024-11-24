import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface ProductHeaderProps {
  name: string;
}

export function ProductHeader({ name }: ProductHeaderProps) {
  return (
    <>
      <Link
        href="/cameras"
        className="inline-flex items-center space-x-2 text-[#CCCCCC] hover:text-[#00FF00] mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>BACK</span>
      </Link>
      <h1 className="text-4xl font-bold mb-8">{name}</h1>
    </>
  );
}
