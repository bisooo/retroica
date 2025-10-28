import { sdk } from "@/lib/sdk"

export default async function TestMedusaPage() {
  let products = null
  let error = null

  try {
    // Fetch products from Medusa with optimized field selection
    const response = await sdk.store.product.list({
      limit: 10,
      fields: "id,title,subtitle,handle,thumbnail,+metadata,*collection,*tags,*images",
    })
    products = response.products
  } catch (e) {
    error = e instanceof Error ? e.message : "Unknown error occurred"
    console.error("[v0] Medusa connection error:", e)
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Medusa SDK Connection Test</h1>

        {/* Connection Status */}
        <div className="mb-8 p-4 rounded-lg border">
          <h2 className="text-xl font-semibold mb-2">Connection Status</h2>
          {error ? (
            <div className="text-red-500">
              <p className="font-semibold">❌ Connection Failed</p>
              <p className="text-sm mt-2">Error: {error}</p>
            </div>
          ) : (
            <div className="text-green-500">
              <p className="font-semibold">✅ Connected Successfully</p>
              <p className="text-sm mt-2">Found {products?.length || 0} products</p>
            </div>
          )}
        </div>

        {/* Products JSON */}
        {products && products.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Optimized Products Data
              <span className="text-sm text-muted-foreground ml-2">
                (id, title, subtitle, handle, thumbnail, metadata, collection, tags, images)
              </span>
            </h2>
            <div className="bg-muted p-4 rounded-lg overflow-auto max-h-[600px]">
              <pre className="text-sm">{JSON.stringify(products, null, 2)}</pre>
            </div>
          </div>
        )}

        {/* No Products Message */}
        {products && products.length === 0 && (
          <div className="p-4 border rounded-lg">
            <p className="text-muted-foreground">
              No products found in your Medusa store. Try running the migration script to add products.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
