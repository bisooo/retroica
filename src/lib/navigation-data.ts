export interface NavSubcategory {
  name: string
  href: string
}

export interface NavItem {
  name: string
  href: string
  gif: string
  analog?: NavSubcategory[]
  digital?: NavSubcategory[]
  subcategories?: NavSubcategory[]
}

export const navItems: NavItem[] = [
  {
    name: "PHOTO",
    href: "/photo",
    gif: "/gifs/point-shoot.gif",
    analog: [
      { name: "POINT & SHOOT (35mm)", href: "/point-n-shoot" },
      { name: "MEDIUM FORMAT (120mm)", href: "/medium-format" },
      { name: "APS", href: "/aps" },
      { name: "SLR", href: "/slr" },
    ],
    digital: [
      { name: "POCKET DIGICAM", href: "/pocket-digicam" },
      { name: "SONY DIGICAM", href: "/sony-digicam" },
      { name: "SUPERZOOM DIGICAM", href: "/superzoom-digicam" },
      { name: "DSLR", href: "/dslr" },
    ],
  },
  {
    name: "VIDEO",
    href: "/video",
    gif: "/gifs/camcoder.gif",
    analog: [
      { name: "SUPER 8 (8mm)", href: "/super8" },
      { name: "FILM MOVIE (16mm)", href: "/film-movie" },
    ],
    digital: [
      { name: "CAMCODER TAPE", href: "/camcoder-tape" },
      { name: "CAMCODER DVD", href: "/camcoder-dvd" },
      { name: "CAMCODER SD/HDD", href: "/camcoder-sd-hdd" },
    ],
  },
  {
    name: "MUSIC",
    href: "/music",
    gif: "/gifs/music.gif",
    analog: [
      { name: "CASSETTE PLAYERS", href: "/cassette-players" },
      { name: "VINYL PLAYERS", href: "/vinyl-players" },
      { name: "BOOMBOX", href: "/boombox" },
    ],
    digital: [
      { name: "IPODs", href: "/ipods" },
      { name: "CD PLAYERS", href: "/cd-players" },
      { name: "SPEAKERS", href: "/speakers" },
    ],
  },
  {
    name: "ACCESSORIES",
    href: "/accessories",
    gif: "/gifs/accessories.gif",
    subcategories: [
      { name: "CAMERA BAGS", href: "/bags" },
      { name: "FILM ROLLS", href: "/film" },
      { name: "FLASH UNITS", href: "/flash" },
      { name: "TRIPODS", href: "/tripods" },
      { name: "LENS FILTERS", href: "/filters" },
      { name: "CLEANING KITS", href: "/cleaning" },
    ],
  },
]

export const getTypeUrl = (categoryHref: string, type: "analog" | "digital"): string => {
  return `${categoryHref}-${type}`
}
