export interface SearchCardResult {
    idol_id: number;
    name: string;
    type: number;
    rarity: number;
    cost: number;
    offense: number;
    defense: number;
    max_offense: number;
    max_defense: number;
    skill_name: string;
    hash: string;
};

export interface SearchCardResponse {
    count: number;
    results: SearchCardResult[];
};

export async function searchCard(name: string | null = null, types: number[] = [], rarities: number[] = [], limit: number | null = null, offset: number | null = null): Promise<SearchCardResponse> {
    const url = new URL("https://zaubermaerchen.info/imas_cg/api/idol/search/");
    if (name != null) {
        url.searchParams.append("name", name);
    }
    for(let i = 0; i < types.length; i++) {
        url.searchParams.append("type", types[i].toString());
    }
    for(let i = 0; i < rarities.length; i++) {
        url.searchParams.append("rarity", rarities[i].toString());
    }
    if (limit != null) {
        url.searchParams.append("limit", limit.toString());
    }
    if (offset != null) {
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

    return await response.json() as SearchCardResponse;
}