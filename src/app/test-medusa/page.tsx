import { sdk } from "@/lib/sdk"

export default async function TestMedusaPage() {
  const connectionStatus = { success: false, error: null as string | null }
  let allProducts = null
  let regionTest = null
  let collectionTest = null
  let categoryTest = null
  let collectionIdTest = null
  let categoryIdTest = null

  // Test 1: Basic connection and region fetch
  try {
    const { regions } = await sdk.store.region.list()
    const czechRegion = regions.find((r) => r.name === "Czech Republic" || r.currency_code === "eur")
    const selectedRegion = czechRegion || regions[0]

    regionTest = {
      found: regions && regions.length > 0,
      count: regions?.length || 0,
      selectedRegion: selectedRegion
        ? {
            id: selectedRegion.id,
            name: selectedRegion.name,
            currency_code: selectedRegion.currency_code,
          }
        : null,
      allRegions: regions,
    }

    connectionStatus.success = true
  } catch (e) {
    connectionStatus.error = e instanceof Error ? e.message : "Unknown error"
    console.error("Medusa connection error:", e)
  }

  // Test 2: Fetch products with region_id
  if (connectionStatus.success && regionTest?.selectedRegion) {
    try {
      const response = await sdk.store.product.list({
        region_id: regionTest.selectedRegion.id,
        limit: 5,
        fields: "id,title,handle,thumbnail,*variants.calculated_price",
      })
      allProducts = response.products
    } catch (e) {
      console.error("Error fetching products:", e)
    }
  }

  if (connectionStatus.success && regionTest?.selectedRegion) {
    try {
      const { collections } = await sdk.store.collection.list({ handle: "olympus-mju" })
      collectionIdTest = {
        handle: "olympus-mju",
        found: collections && collections.length > 0,
        id: collections?.[0]?.id || null,
        data: collections?.[0] || null,
      }
    } catch (e) {
      collectionIdTest = {
        handle: "olympus-mju",
        error: e instanceof Error ? e.message : "Unknown error",
      }
    }
  }

  if (connectionStatus.success && regionTest?.selectedRegion) {
    try {
      const { product_categories } = await sdk.store.category.list({ handle: "photo" })
      categoryIdTest = {
        handle: "photo",
        found: product_categories && product_categories.length > 0,
        id: product_categories?.[0]?.id || null,
        data: product_categories?.[0] || null,
      }
    } catch (e) {
      categoryIdTest = {
        handle: "photo",
        error: e instanceof Error ? e.message : "Unknown error",
      }
    }
  }

  if (connectionStatus.success && collectionIdTest?.id && regionTest?.selectedRegion) {
    try {
      const response = await sdk.store.product.list({
        collection_id: [collectionIdTest.id],
        region_id: regionTest.selectedRegion.id,
        fields: "id,title,handle,thumbnail,*variants.calculated_price,metadata.condition",
        limit: 5,
      })
      collectionTest = {
        collection: "olympus-mju",
        collectionId: collectionIdTest.id,
        count: response.products?.length || 0,
        products: response.products,
      }
    } catch (e) {
      collectionTest = {
        collection: "olympus-mju",
        collectionId: collectionIdTest.id,
        error: e instanceof Error ? e.message : "Unknown error",
      }
    }
  }

  if (connectionStatus.success && categoryIdTest?.id && regionTest?.selectedRegion) {
    try {
      const response = await sdk.store.product.list({
        category_id: [categoryIdTest.id],
        region_id: regionTest.selectedRegion.id,
        fields: "id,title,handle,thumbnail,*variants.calculated_price,metadata.condition",
        limit: 5,
      })
      categoryTest = {
        category: "photo",
        categoryId: categoryIdTest.id,
        count: response.products?.length || 0,
        products: response.products,
      }
    } catch (e) {
      categoryTest = {
        category: "photo",
        categoryId: categoryIdTest.id,
        error: e instanceof Error ? e.message : "Unknown error",
      }
    }
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Medusa SDK Connection Test</h1>
          <p className="text-muted-foreground">
            Testing connection to: {process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "Not configured"}
          </p>
        </div>

        {/* Connection Status */}
        <div className="p-6 rounded-lg border bg-card">
          <h2 className="text-xl font-semibold mb-4">1. Connection & Region Status</h2>
          {connectionStatus.error ? (
            <div className="space-y-2">
              <p className="text-red-500 font-semibold">❌ Connection Failed</p>
              <p className="text-sm text-muted-foreground">Error: {connectionStatus.error}</p>
              <div className="mt-4 p-4 bg-muted rounded text-sm">
                <p className="font-semibold mb-2">Troubleshooting:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Check if Medusa backend is running on {process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}</li>
                  <li>Verify NEXT_PUBLIC_MEDUSA_BACKEND_URL in .env.local</li>
                  <li>Verify NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY is correct</li>
                  <li>Check CORS settings in Medusa backend</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-green-500 font-semibold">✅ Connected Successfully</p>
              {regionTest && (
                <div className="space-y-2">
                  <p className="text-sm font-semibold">Region Information:</p>
                  <p className="text-sm">
                    Found {regionTest.count} region(s), using:{" "}
                    <span className="font-mono bg-muted px-2 py-1 rounded">
                      {regionTest.selectedRegion?.name} ({regionTest.selectedRegion?.currency_code?.toUpperCase()})
                    </span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Region ID: <code className="bg-muted px-2 py-1 rounded">{regionTest.selectedRegion?.id}</code>
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* All Products Test */}
        {connectionStatus.success && allProducts && (
          <div className="p-6 rounded-lg border bg-card">
            <h2 className="text-xl font-semibold mb-4">2. Products with Pricing (First 5)</h2>
            <p className="text-sm text-muted-foreground mb-4">Fetched with region_id to include calculated prices</p>
            <div className="bg-muted p-4 rounded-lg overflow-auto max-h-[400px]">
              <pre className="text-xs">{JSON.stringify(allProducts, null, 2)}</pre>
            </div>
          </div>
        )}

        {/* Collection ID Test */}
        {connectionStatus.success && collectionIdTest && (
          <div className="p-6 rounded-lg border bg-card">
            <h2 className="text-xl font-semibold mb-4">3. Collection ID Lookup: "{collectionIdTest.handle}"</h2>
            {collectionIdTest.error ? (
              <div className="text-red-500">
                <p className="font-semibold">❌ Failed to fetch collection</p>
                <p className="text-sm mt-2">Error: {collectionIdTest.error}</p>
              </div>
            ) : collectionIdTest.found ? (
              <div className="space-y-4">
                <p className="text-green-500 font-semibold">✅ Collection found</p>
                <p className="text-sm">
                  ID: <code className="bg-muted px-2 py-1 rounded">{collectionIdTest.id}</code>
                </p>
                <div className="bg-muted p-4 rounded-lg overflow-auto max-h-[300px]">
                  <pre className="text-xs">{JSON.stringify(collectionIdTest.data, null, 2)}</pre>
                </div>
              </div>
            ) : (
              <p className="text-yellow-500">⚠️ Collection not found. Create "olympus-mju" collection in Medusa.</p>
            )}
          </div>
        )}

        {/* Category ID Test */}
        {connectionStatus.success && categoryIdTest && (
          <div className="p-6 rounded-lg border bg-card">
            <h2 className="text-xl font-semibold mb-4">4. Category ID Lookup: "{categoryIdTest.handle}"</h2>
            {categoryIdTest.error ? (
              <div className="text-red-500">
                <p className="font-semibold">❌ Failed to fetch category</p>
                <p className="text-sm mt-2">Error: {categoryIdTest.error}</p>
              </div>
            ) : categoryIdTest.found ? (
              <div className="space-y-4">
                <p className="text-green-500 font-semibold">✅ Category found</p>
                <p className="text-sm">
                  ID: <code className="bg-muted px-2 py-1 rounded">{categoryIdTest.id}</code>
                </p>
                <div className="bg-muted p-4 rounded-lg overflow-auto max-h-[300px]">
                  <pre className="text-xs">{JSON.stringify(categoryIdTest.data, null, 2)}</pre>
                </div>
              </div>
            ) : (
              <p className="text-yellow-500">⚠️ Category not found. Create "photo" category in Medusa.</p>
            )}
          </div>
        )}

        {/* Collection Products Test */}
        {connectionStatus.success && collectionTest && (
          <div className="p-6 rounded-lg border bg-card">
            <h2 className="text-xl font-semibold mb-4">5. Products by Collection ID (with region_id)</h2>
            {collectionTest.error ? (
              <div className="text-red-500">
                <p className="font-semibold">❌ Failed to fetch products</p>
                <p className="text-sm mt-2">Error: {collectionTest.error}</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-green-500 font-semibold">✅ Found {collectionTest.count} products</p>
                  <p className="text-sm text-muted-foreground">
                    Collection: {collectionTest.collection} (ID: {collectionTest.collectionId})
                  </p>
                </div>
                {collectionTest.count === 0 && (
                  <p className="text-sm text-muted-foreground">
                    No products found. Assign products to the "olympus-mju" collection in Medusa.
                  </p>
                )}
                {collectionTest.products && collectionTest.products.length > 0 && (
                  <div className="bg-muted p-4 rounded-lg overflow-auto max-h-[400px]">
                    <pre className="text-xs">{JSON.stringify(collectionTest.products, null, 2)}</pre>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Category Products Test */}
        {connectionStatus.success && categoryTest && (
          <div className="p-6 rounded-lg border bg-card">
            <h2 className="text-xl font-semibold mb-4">6. Products by Category ID (with region_id)</h2>
            {categoryTest.error ? (
              <div className="text-red-500">
                <p className="font-semibold">❌ Failed to fetch products</p>
                <p className="text-sm mt-2">Error: {categoryTest.error}</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-green-500 font-semibold">✅ Found {categoryTest.count} products</p>
                  <p className="text-sm text-muted-foreground">
                    Category: {categoryTest.category} (ID: {categoryTest.categoryId})
                  </p>
                </div>
                {categoryTest.count === 0 && (
                  <p className="text-sm text-muted-foreground">
                    No products found. Assign products to the "photo" category in Medusa.
                  </p>
                )}
                {categoryTest.products && categoryTest.products.length > 0 && (
                  <div className="bg-muted p-4 rounded-lg overflow-auto max-h-[400px]">
                    <pre className="text-xs">{JSON.stringify(categoryTest.products, null, 2)}</pre>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
