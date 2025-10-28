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
      { name: "POINT & SHOOT (35mm)", href: "/photo?subcategory=point-shoot" },
      { name: "MEDIUM FORMAT (120mm)", href: "/photo?subcategory=medium-format" },
      { name: "APS", href: "/photo?subcategory=aps" },
      { name: "SLR", href: "/photo?subcategory=slr" },
    ],
    digital: [
      { name: "POCKET DIGICAM", href: "/photo?subcategory=pocket-digicam" },
      { name: "SONY DIGICAM", href: "/photo?subcategory=sony-digicam" },
      { name: "SUPERZOOM DIGICAM", href: "/photo?subcategory=superzoom-digicam" },
      { name: "DSLR", href: "/photo?subcategory=dslr" },
    ],
  },
  {
    name: "VIDEO",
    href: "/video",
    gif: "/gifs/camcoder.gif",
    analog: [
      { name: "SUPER 8 (8mm)", href: "/video?subcategory=super8" },
      { name: "FILM MOVIE (16mm)", href: "/video?subcategory=film-movie" },
    ],
    digital: [
      { name: "CAMCODER TAPE", href: "/video?subcategory=camcoder-tape" },
      { name: "CAMCODER DVD", href: "/video?subcategory=camcoder-dvd" },
      { name: "CAMCODER SD/HDD", href: "/video?subcategory=camcoder-sd" },
    ],
  },
  {
    name: "MUSIC",
    href: "/music",
    gif: "/gifs/music.gif",
    analog: [
      { name: "CASSETTE PLAYERS", href: "/music?subcategory=cassette" },
      { name: "VINYL PLAYERS", href: "/music?subcategory=vinyl" },
      { name: "BOOMBOX", href: "/music?subcategory=boombox" },
    ],
    digital: [
      { name: "IPODs", href: "/music?subcategory=ipods" },
      { name: "CD PLAYERS", href: "/music?subcategory=cd-players" },
      { name: "SPEAKERS", href: "/music?subcategory=speakers" },
    ],
  },
  {
    name: "ACCESSORIES",
    href: "/accessories",
    gif: "/gifs/accessories.gif",
    subcategories: [
      { name: "CAMERA BAGS", href: "/accessories?subcategory=bags" },
      { name: "FILM ROLLS", href: "/accessories?subcategory=film" },
      { name: "FLASH UNITS", href: "/accessories?subcategory=flash" },
      { name: "TRIPODS", href: "/accessories?subcategory=tripods" },
      { name: "LENS FILTERS", href: "/accessories?subcategory=filters" },
      { name: "CLEANING KITS", href: "/accessories?subcategory=cleaning" },
    ],
  },
]
