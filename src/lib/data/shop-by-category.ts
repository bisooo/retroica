export interface CategoryObject {
  name: string
  collection: string
  href: string
  image: string
}

export const categoryCollections: CategoryObject[] = [
  {
    name: "POINT & SHOOT Δ",
    collection: "point-and-shoot",
    href: "/point-and-shoot",
    image: "/images/point-n-shoot.jpg",
  },
  {
    name: "Y2K DIGITAL Δ",
    collection: "y2k-digital",
    href: "/y2k-digital",
    image: "/images/y2k.jpeg",
  },
  {
    name: "CAMCORDER Δ",
    collection: "camcoder",
    href: "/camcoder",
    image: "/images/camcoder.jpg",
  },
]
