export async function searchCard(name?: string, types: number[] = [], rarities: number[] = [], limit?: number, offset?: number): Promise<Api.SearchCardResponse> {
  const url = new URL(`${import.meta.env.VITE_API_SERVER_URL}idol/search/`);
  if (name !== undefined) {
    url.searchParams.append("name", name);
  }
  for(let i = 0; i < types.length; i++) {
    url.searchParams.append("type", types[i].toString());
  }
  for(let i = 0; i < rarities.length; i++) {
    url.searchParams.append("rarity", rarities[i].toString());
  }
  if (limit !== undefined) {
    url.searchParams.append("limit", limit.toString());
  }
  if (offset !== undefined) {
    url.searchParams.append("offset", offset.toString());
  }

  const response = await fetch(url.href, {
    method: "GET",
    headers: {
      "Accept": "application/json",
    },
    mode: "cors",
    credentials: "omit"
  });

  return await response.json();
}
