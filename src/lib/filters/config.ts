export type Category = 'PHOTO' | 'VIDEO' | 'MUSIC'
export type Subcategory = 'ANALOG' | 'DIGITAL'

export type FilterType = 'multiselect' | 'range'

export interface FilterOption {
  label: string
  value: string
}

export interface FilterConfig {
  id: string
  title: string
  type: FilterType
  paramKey: string // Must match actual metadata field name
  options?: FilterOption[]
  rangeConfig?: {
    min: number
    max: number
    step: number
    paramKeyMin: string
    paramKeyMax: string
    formatLabel?: (val: number) => string
  }
  defaultOpen?: boolean
  priority: number
}

// Global filters shown on all pages
// Note: formatLabel for price is handled dynamically in the component
export const GLOBAL_FILTERS: FilterConfig[] = [
  {
    id: 'price',
    title: 'PRICE',
    type: 'range',
    paramKey: 'price',
    rangeConfig: {
      min: 0,
      max: 500,
      step: 10,
      paramKeyMin: 'price_min',
      paramKeyMax: 'price_max',
      // formatLabel is handled by the component to support currency switching
    },
    defaultOpen: true,
    priority: 1,
  },
  {
    id: 'condition',
    title: 'CONDITION',
    type: 'range',
    paramKey: 'condition',
    rangeConfig: {
      min: 6,
      max: 10,
      step: 0.5,
      paramKeyMin: 'condition_min',
      paramKeyMax: 'condition_max',
      formatLabel: (val) => `${val.toFixed(1)}`,
    },
    defaultOpen: true,
    priority: 2,
  },
]

// Category-specific filter configurations
// paramKey MUST match actual metadata field names from Medusa
export const FILTER_CONFIGS: Record<`${Category}_${Subcategory}`, FilterConfig[]> = {
  // -- PHOTO (ANALOG) --
  // Actual fields: lens, iso_range, iso_type, shutter_speed, features, flash, dimensions_weight, powered_by
  PHOTO_ANALOG: [
    {
      id: 'iso_type',
      title: 'ISO TYPE',
      type: 'multiselect',
      paramKey: 'iso_type',
      options: [
        { label: 'Manual', value: 'Manual' },
        { label: 'DX-Code', value: 'DX' },
        { label: 'Fixed', value: 'Fixed' },
        { label: 'Auto', value: 'Auto' },
      ],
      defaultOpen: true,
      priority: 1,
    },
    {
      id: 'features',
      title: 'FEATURES',
      type: 'multiselect',
      paramKey: 'features',
      options: [
        { label: 'Autofocus', value: 'Autofocus' },
        { label: 'Self-timer', value: 'Self-timer' },
        { label: 'Date imprint', value: 'Date' },
        { label: 'Panorama', value: 'Panorama' },
        { label: 'Manual exposure', value: 'Manual' },
        { label: 'Weatherproof', value: 'Weatherproof' },
      ],
      defaultOpen: true,
      priority: 2,
    },
    {
      id: 'flash',
      title: 'FLASH',
      type: 'multiselect',
      paramKey: 'flash',
      options: [
        { label: 'None', value: 'None' },
        { label: 'Auto', value: 'Auto' },
        { label: 'Built-in', value: 'Built-in' },
        { label: 'Fill-in', value: 'Fill' },
        { label: 'Red eye reduction', value: 'Red eye' },
      ],
      defaultOpen: false,
      priority: 3,
    },
    {
      id: 'powered_by',
      title: 'POWER',
      type: 'multiselect',
      paramKey: 'powered_by',
      options: [
        { label: 'AA batteries', value: 'AA' },
        { label: 'AAA batteries', value: 'AAA' },
        { label: 'CR123A', value: 'CR123' },
        { label: 'CR2', value: 'CR2' },
        { label: 'Lithium', value: 'Lithium' },
        { label: 'LR44', value: 'LR44' },
      ],
      defaultOpen: false,
      priority: 4,
    },
  ],

  // -- PHOTO (DIGITAL) --
  // Actual fields: max_resolution, sensor_type, iso_range, focal_length_aperture, storage_type, screen_size, dimensions_weight, powered_by
  PHOTO_DIGITAL: [
    {
      id: 'sensor_type',
      title: 'SENSOR TYPE',
      type: 'multiselect',
      paramKey: 'sensor_type',
      options: [
        { label: 'CCD', value: 'CCD' },
        { label: 'CMOS', value: 'CMOS' },
      ],
      defaultOpen: true,
      priority: 1,
    },
    {
      id: 'storage_type',
      title: 'STORAGE TYPE',
      type: 'multiselect',
      paramKey: 'storage_type',
      options: [
        { label: 'SD Card', value: 'SD' },
        { label: 'Memory Stick', value: 'Memory Stick' },
        { label: 'Compact Flash', value: 'Compact Flash' },
        { label: 'xD-Picture Card', value: 'xD' },
        { label: 'Internal', value: 'Internal' },
      ],
      defaultOpen: true,
      priority: 2,
    },
    {
      id: 'powered_by',
      title: 'POWER',
      type: 'multiselect',
      paramKey: 'powered_by',
      options: [
        { label: 'AA batteries', value: 'AA' },
        { label: 'Li-Ion rechargeable', value: 'Li-Ion' },
        { label: 'Proprietary battery', value: 'Proprietary' },
      ],
      defaultOpen: false,
      priority: 3,
    },
  ],

  // -- VIDEO (ANALOG) --
  // Actual fields: lens, iso_range, iso_type, shutter_speed, features, flash, dimensions_weight, powered_by
  VIDEO_ANALOG: [
    {
      id: 'iso_type',
      title: 'ISO TYPE',
      type: 'multiselect',
      paramKey: 'iso_type',
      options: [
        { label: 'Manual', value: 'Manual' },
        { label: 'Auto', value: 'Auto' },
      ],
      defaultOpen: true,
      priority: 1,
    },
    {
      id: 'features',
      title: 'FEATURES',
      type: 'multiselect',
      paramKey: 'features',
      options: [
        { label: 'Light meter', value: 'Light meter' },
        { label: 'Manual exposure', value: 'Manual' },
        { label: 'Double exposure', value: 'Double' },
        { label: 'Macro lens', value: 'Macro' },
      ],
      defaultOpen: true,
      priority: 2,
    },
    {
      id: 'powered_by',
      title: 'POWER',
      type: 'multiselect',
      paramKey: 'powered_by',
      options: [
        { label: 'AA batteries', value: 'AA' },
        { label: 'Li-Ion rechargeable', value: 'Li-Ion' },
      ],
      defaultOpen: false,
      priority: 3,
    },
  ],

  // -- VIDEO (DIGITAL) --
  // Actual fields: lens_zoom, sensor, recording_format, audio, outputs, display, dimensions_weight, powered_by
  VIDEO_DIGITAL: [
    {
      id: 'sensor',
      title: 'SENSOR TYPE',
      type: 'multiselect',
      paramKey: 'sensor',
      options: [
        { label: 'CCD', value: 'CCD' },
        { label: 'CMOS', value: 'CMOS' },
      ],
      defaultOpen: true,
      priority: 1,
    },
    {
      id: 'recording_format',
      title: 'RECORDING FORMAT',
      type: 'multiselect',
      paramKey: 'recording_format',
      options: [
        { label: 'MiniDV', value: 'MiniDV' },
        { label: 'Digital8', value: 'Digital8' },
        { label: 'DVD', value: 'DVD' },
        { label: 'SD Card', value: 'SD' },
        { label: 'AVCHD', value: 'AVCHD' },
        { label: 'MP4', value: 'MP4' },
      ],
      defaultOpen: true,
      priority: 2,
    },
    {
      id: 'outputs',
      title: 'OUTPUTS',
      type: 'multiselect',
      paramKey: 'outputs',
      options: [
        { label: 'HDMI', value: 'HDMI' },
        { label: 'USB', value: 'USB' },
        { label: 'FireWire', value: 'FireWire' },
        { label: 'S-Video', value: 'S-Video' },
        { label: 'Composite', value: 'Composite' },
      ],
      defaultOpen: false,
      priority: 3,
    },
    {
      id: 'powered_by',
      title: 'POWER',
      type: 'multiselect',
      paramKey: 'powered_by',
      options: [
        { label: 'Li-Ion rechargeable', value: 'Li-Ion' },
        { label: 'AA batteries', value: 'AA' },
      ],
      defaultOpen: false,
      priority: 4,
    },
  ],

  // -- MUSIC (ANALOG) --
  // Actual fields: playable_media_format, audio_output, features, connectivity, speaker, power_supply, dimensions_weight, color_year
  MUSIC_ANALOG: [
    {
      id: 'playable_media_format',
      title: 'MEDIA FORMAT',
      type: 'multiselect',
      paramKey: 'playable_media_format',
      options: [
        { label: 'Cassette', value: 'Cassette' },
        { label: 'Vinyl / Record', value: 'Vinyl' },
        { label: 'Radio', value: 'Radio' },
      ],
      defaultOpen: true,
      priority: 1,
    },
    {
      id: 'features',
      title: 'FEATURES',
      type: 'multiselect',
      paramKey: 'features',
      options: [
        { label: 'AM/FM Radio', value: 'Radio' },
        { label: 'Built-in microphone', value: 'Microphone' },
        { label: 'Equalizer', value: 'Equalizer' },
        { label: 'Bass boost', value: 'Bass' },
        { label: 'Recording', value: 'Recording' },
      ],
      defaultOpen: true,
      priority: 2,
    },
    {
      id: 'speaker',
      title: 'SPEAKER',
      type: 'multiselect',
      paramKey: 'speaker',
      options: [
        { label: 'Built-in speaker', value: 'Built-in' },
        { label: 'Headphones only', value: 'Headphone' },
      ],
      defaultOpen: false,
      priority: 3,
    },
    {
      id: 'power_supply',
      title: 'POWER',
      type: 'multiselect',
      paramKey: 'power_supply',
      options: [
        { label: 'AA batteries', value: 'AA' },
        { label: 'AAA batteries', value: 'AAA' },
        { label: 'AC Power', value: 'AC' },
        { label: 'Rechargeable', value: 'Rechargeable' },
      ],
      defaultOpen: false,
      priority: 4,
    },
  ],

  // -- MUSIC (DIGITAL) --
  // Actual fields: supported_formats, storage_capacity, display, audio, connectivity, features, power_supply, dimensions_weight
  MUSIC_DIGITAL: [
    {
      id: 'supported_formats',
      title: 'SUPPORTED FORMATS',
      type: 'multiselect',
      paramKey: 'supported_formats',
      options: [
        { label: 'MP3', value: 'MP3' },
        { label: 'AAC', value: 'AAC' },
        { label: 'WAV', value: 'WAV' },
        { label: 'WMA', value: 'WMA' },
        { label: 'FLAC', value: 'FLAC' },
        { label: 'CD', value: 'CD' },
      ],
      defaultOpen: true,
      priority: 1,
    },
    {
      id: 'connectivity',
      title: 'CONNECTIVITY',
      type: 'multiselect',
      paramKey: 'connectivity',
      options: [
        { label: 'USB', value: 'USB' },
        { label: 'Bluetooth', value: 'Bluetooth' },
        { label: 'WiFi', value: 'WiFi' },
        { label: '3.5mm jack', value: '3.5mm' },
        { label: 'Dock connector', value: 'Dock' },
      ],
      defaultOpen: true,
      priority: 2,
    },
    {
      id: 'features',
      title: 'FEATURES',
      type: 'multiselect',
      paramKey: 'features',
      options: [
        { label: 'Radio', value: 'Radio' },
        { label: 'Voice recorder', value: 'Voice' },
        { label: 'Video playback', value: 'Video' },
        { label: 'Photo viewer', value: 'Photo' },
        { label: 'Games', value: 'Game' },
      ],
      defaultOpen: false,
      priority: 3,
    },
    {
      id: 'power_supply',
      title: 'POWER',
      type: 'multiselect',
      paramKey: 'power_supply',
      options: [
        { label: 'Li-Ion rechargeable', value: 'Li-Ion' },
        { label: 'AA batteries', value: 'AA' },
        { label: 'AAA batteries', value: 'AAA' },
        { label: 'USB charging', value: 'USB' },
      ],
      defaultOpen: false,
      priority: 4,
    },
  ],
}

// Helper function to get filters for a specific category/subcategory
export function getFiltersForCategory(category: Category, subcategory: Subcategory): FilterConfig[] {
  const key = `${category}_${subcategory}` as `${Category}_${Subcategory}`
  return FILTER_CONFIGS[key] || []
}
