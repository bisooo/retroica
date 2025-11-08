import { NextResponse } from "next/server"
import { ProductService } from "@/lib/services/product.service"
import { allCategoryHandles } from "@/lib/data/categories"

export const revalidate = 86400

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

export async function GET() {
  const baseUrl = "https://retroica.com"
  const products = await ProductService.getAllProducts()

  // Build XML with Google Image Sitemap namespace
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n'
  xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n'

  // Homepage
  xml += `  <url>\n`
  xml += `    <loc>${baseUrl}</loc>\n`
  xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`
  xml += `    <priority>1.0</priority>\n`
  xml += `  </url>\n`

  // Category pages
  allCategoryHandles.forEach((category) => {
    xml += `  <url>\n`
    xml += `    <loc>${baseUrl}/${escapeXml(category)}</loc>\n`
    xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`
    xml += `    <priority>0.8</priority>\n`
    xml += `  </url>\n`
  })

  // Product pages with images
  products.forEach((product) => {
    xml += `  <url>\n`
    xml += `    <loc>${baseUrl}/product/${escapeXml(product.handle)}</loc>\n`
    xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`
    xml += `    <priority>0.9</priority>\n`

    // Add image if thumbnail exists
    if (product.thumbnail) {
      xml += `    <image:image>\n`
      xml += `      <image:loc>${escapeXml(product.thumbnail)}</image:loc>\n`
      xml += `      <image:title>${escapeXml(product.title)}</image:title>\n`
      xml += `    </image:image>\n`
    }

    xml += `  </url>\n`
  })

  xml += "</urlset>"

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400, s-maxage=86400", // 24 hour cache
    },
  })
}
