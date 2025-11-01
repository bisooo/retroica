export function getCurrencySymbol(currency: string): string {
  const symbols: Record<string, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    CZK: "Kč",
    CAD: "C$",
    AUD: "A$",
    JPY: "¥",
  }
  return symbols[currency.toUpperCase()] || currency
}

export function formatPrice(amount: number, currency: string): string {
  return `${getCurrencySymbol(currency)}${amount.toFixed(2)}`
}
