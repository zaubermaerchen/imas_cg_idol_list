export async function searchCard(name?: string, types: number[] = [], rarities: number[] = [], limit?: number, offset?: number): Promise<Api.SearchCardResponse> {
  const url = new URL('idol/search/', import.meta.env.VITE_API_SERVER_URL)
  if (name !== undefined) {
    url.searchParams.append('name', name)
  }
  for (const type of types) {
    url.searchParams.append('type', type.toString())
  }
  for (const rarity of rarities) {
    url.searchParams.append('rarity', rarity.toString())
  }
  if (limit !== undefined) {
    url.searchParams.append('limit', limit.toString())
  }
  if (offset !== undefined) {
    url.searchParams.append('offset', offset.toString())
  }

  const response = await fetch(url.href, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
    mode: 'cors',
    credentials: 'omit'
  })

  return await response.json()
}
