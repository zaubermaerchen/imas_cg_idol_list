declare namespace Api {
  export interface Card {
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
  }

  export interface SearchCardResponse {
    count: number;
    next: string | null
    previous: string | null
    results: Card[]
  }
}
