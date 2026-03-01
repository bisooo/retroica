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

// Helper to determine filter category and subcategory from URL handle
export function getCategoryAndSubcategory(handle: string): {
  category: 'PHOTO' | 'VIDEO' | 'MUSIC'
  subcategory: 'ANALOG' | 'DIGITAL'
} {
  // Photo categories
  if (
    handle === 'photo' ||
    handle === 'photo-analog' ||
    photoAnalogCategories.includes(handle as any) ||
    handle === 'point-and-shoot' ||
    handle === 'olympus-mju' ||
    handle === 'retro-kodak'
  ) {
    return { category: 'PHOTO', subcategory: 'ANALOG' }
  }
  
  if (
    handle === 'photo-digital' ||
    photoDigitalCategories.includes(handle as any) ||
    handle === 'y2k-digital' ||
    handle === 'y2k-sony'
  ) {
    return { category: 'PHOTO', subcategory: 'DIGITAL' }
  }
  
  // Video categories
  if (
    handle === 'video' ||
    handle === 'video-analog' ||
    videoAnalogCategories.includes(handle as any)
  ) {
    return { category: 'VIDEO', subcategory: 'ANALOG' }
  }
  
  if (
    handle === 'video-digital' ||
    videoDigitalCategories.includes(handle as any) ||
    handle === 'camcoder'
  ) {
    return { category: 'VIDEO', subcategory: 'DIGITAL' }
  }
  
  // Music categories
  if (
    handle === 'music' ||
    handle === 'music-analog' ||
    musicAnalogCategories.includes(handle as any) ||
    handle === 'cassette-players'
  ) {
    return { category: 'MUSIC', subcategory: 'ANALOG' }
  }
  
  if (
    handle === 'music-digital' ||
    musicDigitalCategories.includes(handle as any) ||
    handle === 'classic-ipods' ||
    handle === 'gameboys'
  ) {
    return { category: 'MUSIC', subcategory: 'DIGITAL' }
  }
  
  // Accessories default to PHOTO_ANALOG filters
  if (handle === 'accessories' || accessoriesCategories.includes(handle as any)) {
    return { category: 'PHOTO', subcategory: 'ANALOG' }
  }
  
  // Default fallback
  return { category: 'PHOTO', subcategory: 'ANALOG' }
}
