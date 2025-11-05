export function getStarColor(rating: number): string {
  if (rating >= 8) {
    return "fill-green-500 stroke-green-500 dark:fill-green-400 dark:stroke-green-400"
  }
  if (rating >= 7) {
    return "fill-yellow-500 stroke-yellow-500 dark:fill-yellow-400 dark:stroke-yellow-400"
  }
  if (rating >= 6) {
        return "fill-orange-500 stroke-orange-500 dark:fill-orange-400 dark:stroke-orange-400"
  }
  return "fill-red-500 stroke-red-500 dark:fill-red-400 dark:stroke-red-400"
}
