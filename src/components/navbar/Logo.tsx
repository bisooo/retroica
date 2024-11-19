import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/home"
      className="text-2xl font-bold tracking-tighter text-[#00FF00]"
    >
      retroica
    </Link>
  );
}
