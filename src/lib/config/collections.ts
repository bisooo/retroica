export const COLLECTION_HANDLES = [
  "y2k-sony",
  "retro-kodak",
  "olympus-mju",
  "classic-ipods",
  "gameboys",
  "point-and-shoot",
  "cassette-players",
  "y2k-digital",
  "camcoder",
  "slr",
  "super-zoom",
] as const

export type CollectionHandle = (typeof COLLECTION_HANDLES)[number]

export function isCollection(handle: string): boolean {
  return COLLECTION_HANDLES.includes(handle as CollectionHandle)
}
