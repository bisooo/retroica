export const mainCategories = ["photo", "video", "music", "accessories"] as const

export const typeCategories = [
  "photo-analog",
  "photo-digital",
  "video-analog",
  "video-digital",
  "music-analog",
  "music-digital",
] as const

export const photoAnalogCategories = ["point-n-shoot", "medium-format", "aps", "slr"] as const

export const photoDigitalCategories = ["pocket-digicam", "sony-digicam", "superzoom-digicam", "dslr"] as const

export const videoAnalogCategories = ["super8", "film-movie"] as const

export const videoDigitalCategories = ["camcoder-tape", "camcoder-dvd", "camcoder-sd-hdd"] as const

export const musicAnalogCategories = ["cassette-players", "vinyl-players", "boombox"] as const

export const musicDigitalCategories = ["ipods", "cd-players", "speakers"] as const

export const accessoriesCategories = ["bags", "film", "flash", "tripods", "filters", "cleaning"] as const

export const posterCollections = [
  "olympus-mju",
  "retro-kodak",
  "y2k-sony",
  "classic-ipods",
  "gameboys",
  "cassette-players",
] as const

export const shopByCategoryCollections = ["point-and-shoot", "y2k-digital", "camcoder"] as const

export const allCategoryHandles = [
  ...mainCategories,
  ...typeCategories,
  ...photoAnalogCategories,
  ...photoDigitalCategories,
  ...videoAnalogCategories,
  ...videoDigitalCategories,
  ...musicAnalogCategories,
  ...musicDigitalCategories,
  ...accessoriesCategories,
  ...posterCollections,
  ...shopByCategoryCollections,
] as const