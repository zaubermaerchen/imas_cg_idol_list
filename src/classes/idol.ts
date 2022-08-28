export default class Idol {
  id: number;
  name: string;
  type: number;
  rarity: number;
  cost: number;
  offense: number;
  defense: number;
  maxOffense: number;
  maxDefense: number;
  skillName: string;
  hash: string;

  public constructor(data: Api.Card) {
    this.id = data.idol_id;
    this.name = data.name;
    this.type = data.type;
    this.rarity = data.rarity;
    this.cost = data.cost;
    this.offense = data.offense;
    this.defense = data.defense;
    this.maxOffense = data.max_offense;
    this.maxDefense = data.max_defense;
    this.skillName = data.skill_name;
    this.hash = data.hash;
  }
  private static getGameUrl(path: string) {
    return new URL(`${import.meta.env.VITE_GAME_SERVER_URL}${path}`)
  }
  private static getMobageUrl(gameUrl: URL) {
    const mobageUrl = new URL(import.meta.env.VITE_MOBAGE_APP_URL)
    mobageUrl.searchParams.append('url', gameUrl.href)
    return mobageUrl
  }

  public get typeText(): string {
    switch (this.type) {
    case 0:
      return 'Cu';
    case 1:
      return 'Co';
    case 2:
      return 'Pa';
    default:
      return '';
    }
  }

  public get rarityText(): string {
    switch (this.rarity) {
    case 0:
      return 'N';
    case 1:
      return 'N+';
    case 2:
      return 'R';
    case 3:
      return 'R+';
    case 4:
      return 'SR';
    case 5:
      return 'SR+';
    default:
      return '';
    }
  }
  public get profileUrl(): string {
    const gameUrl = Idol.getGameUrl(`archive/view/${this.hash}`)
    return Idol.getMobageUrl(gameUrl).href
  }
  public get tradeUrl(): string {
    const gameUrl = Idol.getGameUrl(`auction/search_top/0/${this.hash}`)
    return Idol.getMobageUrl(gameUrl).href;
  }
  public get tradeHistoryUrl(): string {
    const gameUrl = Idol.getGameUrl(`auction/history/${this.hash}`)
    return Idol.getMobageUrl(gameUrl).href;
  }
  public get wishUrl(): string {
    const gameUrl = Idol.getGameUrl(`wish/regist/${this.hash}/0/0/`)
    return Idol.getMobageUrl(gameUrl).href;
  }
  public get wishPremiumSignUrl() {
    if(!this.isSR()) {
      return undefined
    }
    const gameUrl = Idol.getGameUrl(`wish/regist/${this.hash}/0/1/`)
    return Idol.getMobageUrl(gameUrl).href;
  }
  public get imageUrl() {
    return Idol.getGameUrl(`image_sp/card/l/${this.hash}.jpg`).href;
  }
  public get noFrameImageUrl() {
    if(!this.isSR()) {
      return undefined
    }
    return Idol.getGameUrl(`image_sp/card/l_noframe/${this.hash}.jpg`).href;
  }
  public get signImageUrl() {
    if(!this.isSR()) {
      return undefined
    }
    return Idol.getGameUrl(`image_sp/card_sign_b/l/${this.hash}.jpg`).href;
  }
  public get premiumSignImageUrl() {
    if(!this.isSR()) {
      return undefined
    }
    return Idol.getGameUrl(`image_sp/card_sign_p/l/${this.hash}.jpg`).href;
  }
  public isSR(): boolean {
    return this.rarity >= 4;
  }
}
