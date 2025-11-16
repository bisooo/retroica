import { get } from '@vercel/edge-config'

export async function isCheckoutEnabled(): Promise<boolean> {
  try {
    const enabled = await get('enableCheckout')
    return enabled !== false
  } catch {
    return true
  }
}
