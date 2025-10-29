export class MetadataService {
  /**
   * Gets all metadata fields excluding condition, delivery_includes, brand, category, and subcategory
   */
  static getAllDisplayFields(metadata: Record<string, unknown>): Record<string, string> {
    const excludedFields = ["condition", "delivery_includes", "brand", "category", "subcategory"]
    const displayFields: Record<string, string> = {}

    for (const [key, value] of Object.entries(metadata)) {
      if (!excludedFields.includes(key) && value) {
        displayFields[key] = String(value)
      }
    }

    return displayFields
  }

  /**
   * Formats metadata field names for display
   * Converts snake_case to ALL CAPS with spaces
   * Example: focal_length_and_aperture -> FOCAL LENGTH AND APERTURE
   */
  static formatFieldName(fieldName: string): string {
    return fieldName.replace(/_/g, " ").toUpperCase()
  }
}
