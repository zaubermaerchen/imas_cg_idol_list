export function searchCard(name: string | null = null, types: number[] = [], rarities: number[] = [], limit: number | null = null, offset: number | null = null): Promise<any> {
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

    return fetch(url.href, {
        method: "GET",
        headers: {
            "Accept": "application/json",
        },
        mode: "cors",
        credentials: "omit"
    }).then((response: Response) => {
        return response.json();
    });
}