export interface PosterProductSet {
  items: [string, string, string]
  label: string
}

export const POSTER_IMAGES = {
  "olympus-mju": "/images/mju.jpg",
  "retro-kodak": "/images/kodak.jpg",
  "y2k-sony": "/images/y2k-2.jpg",
  "classic-ipods": "/images/ipod.jpg",
  "gameboys": "/images/gameboy.jpg",
  "point-and-shoot": "/images/film-can.avif",
  "cassette-players": "/images/cassette.jpg",
  "y2k-digital": "/images/y2k.jpg",
  "camcoder": "/images/camcoder.jpg",
  "slr": "/images/film-can.avif",
  "super-zoom": "/images/film-can.avif",
} as const

export function toCollectionHandle(displayName: string): string {
  return displayName
    .toLowerCase()
    .replace(/\s+δ$/i, "") // Remove the delta symbol
    .replace(/\s+/g, "-") // Replace spaces with hyphens
}
