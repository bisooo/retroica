import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/test-medusa"],
      },
    ],
    sitemap: "https://retroica.com/sitemap.xml",
  }
}
