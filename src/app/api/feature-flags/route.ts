import { NextResponse } from 'next/server'
import { isCheckoutEnabled } from '@/lib/feature-flags'

export const runtime = 'edge'

export async function GET() {
  const enableCheckout = await isCheckoutEnabled()
  
  return NextResponse.json({
    enableCheckout,
  })
}
