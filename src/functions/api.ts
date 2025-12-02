export async function searchCard(
  name?: string,
  types: number[] = [],
  rarities: number[] = [],
  limit?: number,
  offset?: number,
): Promise<Api.SearchCardResponse> {
  let url = `${import.meta.env.VITE_API_SERVER_URL}/idol/search/`

  const params = new URLSearchParams()
  if (name !== undefined) {
    params.append('name', name)
  }
  for (const type of types) {
    params.append('type', type.toString())
  }
  for (const rarity of rarities) {
    params.append('rarity', rarity.toString())
  }
  if (limit !== undefined) {
    params.append('limit', limit.toString())
  }
  if (offset !== undefined) {
    params.append('offset', offset.toString())
  }
  if (params.toString() !== '') {
    url += `?${params.toString()}`
  }

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
    mode: 'cors',
    credentials: 'omit',
  })

  return await response.json()
}
