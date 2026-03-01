export const SPEC_EXPLANATIONS: Record<string, string> = {
  // Common across categories
  condition: "Overall quality and wear level of the item, rated on a scale.",
  dimensions_weight: "Physical size and weight - helps you know if it's portable or bulky.",
  dimension_weight: "Physical size and weight - helps you know if it's portable or bulky.",
  powered_by: "What powers this device - batteries, USB, wall outlet, etc.",
  delivery_includes: "Everything that comes in the box when you receive it.",
  features: "Special capabilities and extras this device offers.",
  connectivity: "How you can connect this to other devices - cables, wireless, etc.",

  // Photo/Video - Lens & Optics
  lens: "The glass element that focuses light. Affects image sharpness and style.",
  focal_length: "How zoomed in the lens is. Lower = wider view, higher = more zoom.",
  focal_length_aperture: "Zoom range and light intake. Lower f-number = better in low light.",
  aperture: "How much light the lens lets in. Lower f-number = brighter shots, blurrier backgrounds.",
  lens_zoom: "Optical zoom range. Higher numbers mean you can zoom in closer.",

  // Photo/Video - Sensor & Image
  iso_range: "Light sensitivity range. Higher max = better in dark conditions.",
  iso_type: "The film sensitivity standard used - affects grain and exposure.",
  max_resolution: "Maximum image detail in megapixels. Higher = sharper, larger prints.",
  sensor_type: "The chip that captures light. Affects image quality and low-light performance.",
  sensor: "The chip that captures light. Larger sensors generally mean better quality.",
  shutter_speed: "How fast the camera captures. Fast = freeze action, slow = motion blur.",

  // Photo - Specific
  flash: "Built-in or compatible flash for low-light photography.",
  film_format: "The type/size of film used. Larger formats = more detail and dynamic range.",

  // Video - Specific
  recording_format: "Video file type and quality. Common: MP4, AVI, MiniDV tape.",
  audio: "Sound recording capabilities - built-in mic, external input, quality level.",
  outputs: "Ports for connecting to TVs, computers, or other devices.",
  display: "Screen for viewing footage. Size and type affect usability.",

  // Digital Storage
  storage_type: "Memory format used - SD card, CompactFlash, internal, etc.",
  storage_capacity: "How much data it holds - more GB = more photos/songs.",
  screen_size: "Display size for viewing and navigating.",

  // Music - Playback
  playable_media_format: "Physical formats it plays - vinyl, cassette, CD, etc.",
  supported_formats: "Digital audio files it can play - MP3, WAV, FLAC, etc.",
  audio_output: "How sound comes out - headphone jack, line out, speakers.",
  speaker: "Built-in speaker details - size, power, sound quality.",
  power_supply: "How it gets power - batteries, USB charging, AC adapter.",
  color_year: "The color variant and year of manufacture or release.",
}

// Helper to get explanation for a field (handles various naming conventions)
export function getSpecExplanation(fieldKey: string): string | null {
  const normalizedKey = fieldKey
    .toLowerCase()
    .replace(/[&\s]+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "")

  // Direct match
  if (SPEC_EXPLANATIONS[normalizedKey]) {
    return SPEC_EXPLANATIONS[normalizedKey]
  }

  // Try common variations
  const variations = [
    normalizedKey,
    normalizedKey.replace("_and_", "_"),
    normalizedKey.replace(/_/g, ""),
  ]

  for (const variant of variations) {
    if (SPEC_EXPLANATIONS[variant]) {
      return SPEC_EXPLANATIONS[variant]
    }
  }

  return null
}
