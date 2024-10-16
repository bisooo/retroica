import Image from "next/image";

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-8 flex flex-col items-center">
      <Image
        src="/RETRO-ICA.png"
        alt="RETRO-ICA Logo"
        width={400}
        height={400}
        className="object-contain mb-8"
      />
      <p className="text-[#0FF000] text-sm font-bold">
        VINTAGE CAMERAS FOR THE MODERN AGE knk -said Egeman
      </p>
      <p className="text-[#0FF000] mt-4 text-sm">
        Explore our collection of retro cameras and accessories.
      </p>
    </main>
  );
}
