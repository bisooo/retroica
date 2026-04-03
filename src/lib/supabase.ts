const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export async function fetchFromSupabase<T>(
  table: string,
  params: Record<string, string> = {}
): Promise<T[]> {
  const query = new URLSearchParams({ ...params })
  const url = `${SUPABASE_URL}/rest/v1/${table}?${query.toString()}`

  const res = await fetch(url, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error(`Supabase fetch error: ${res.status} ${res.statusText}`)
  }

  return res.json() as Promise<T[]>
}
