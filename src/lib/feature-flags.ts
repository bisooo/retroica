import { get } from '@vercel/edge-config'

export async function isCheckoutEnabled(): Promise<boolean> {
  try {
    const enabled = await get('enableCheckout')
    if (enabled === false || enabled === 'false') {
      return false
    }
    return true
  } catch {
    return true
  }
}
