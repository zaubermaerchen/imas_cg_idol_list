export default class Card {
  id: number
  name: string
  type: number
  rarity: number
  cost: number
  offense: number
  defense: number
  maxOffense: number
  maxDefense: number
  skillName: string
  hash: string

  public constructor(
    id: number,
    name: string,
    type: number,
    rarity: number,
    cost: number,
    offense: number,
    defense: number,
    maxOffense: number,
    maxDefense: number,
    skillName: string,
    hash: string,
  ) {
    this.id = id
    this.name = name
    this.type = type
    this.rarity = rarity
    this.cost = cost
    this.offense = offense
    this.defense = defense
    this.maxOffense = maxOffense
    this.maxDefense = maxDefense
    this.skillName = skillName
    this.hash = hash
  }

  private static getGameUrl(path: string) {
    return new URL(`${import.meta.env.VITE_GAME_SERVER_URL}/${path}`)
  }
  private static getMobageUrl(gameUrl: URL) {
    const mobageUrl = new URL(import.meta.env.VITE_MOBAGE_APP_URL)
    mobageUrl.searchParams.append('url', gameUrl.href)
    return mobageUrl
  }

  public get typeText(): string {
    switch (this.type) {
      case 0:
        return 'Cu'
      case 1:
        return 'Co'
      case 2:
        return 'Pa'
      default:
        return ''
    }
  }

  public get rarityText(): string {
    switch (this.rarity) {
      case 0:
        return 'N'
      case 1:
        return 'N+'
      case 2:
        return 'R'
      case 3:
        return 'R+'
      case 4:
        return 'SR'
      case 5:
        return 'SR+'
      default:
        return ''
    }
  }
  public get profileUrl(): string {
    const gameUrl = Card.getGameUrl(`archive/view/${this.hash}`)
    return Card.getMobageUrl(gameUrl).href
  }
  public get tradeUrl(): string {
    const gameUrl = Card.getGameUrl(`auction/search_top/0/${this.hash}`)
    return Card.getMobageUrl(gameUrl).href
  }
  public get tradeHistoryUrl(): string {
    const gameUrl = Card.getGameUrl(`auction/history/${this.hash}`)
    return Card.getMobageUrl(gameUrl).href
  }
  public get wishUrl(): string {
    const gameUrl = Card.getGameUrl(`wish/regist/${this.hash}/0/0/`)
    return Card.getMobageUrl(gameUrl).href
  }
  public get wishPremiumSignUrl() {
    if (!this.isSR()) {
      return undefined
    }
    const gameUrl = Card.getGameUrl(`wish/regist/${this.hash}/0/1/`)
    return Card.getMobageUrl(gameUrl).href
  }
  public get imageUrl() {
    return `${import.meta.env.VITE_IMAGE_SERVER_URL}/card/l/${this.hash}.jpg`
  }
  public get noFrameImageUrl() {
    if (!this.isSR()) {
      return undefined
    }
    return `${import.meta.env.VITE_IMAGE_SERVER_URL}/card/l_noframe/${this.hash}.jpg`
  }
  public get signImageUrl() {
    if (!this.isSR()) {
      return undefined
    }
    return `${import.meta.env.VITE_IMAGE_SERVER_URL}/card_sign_b/l/${this.hash}.jpg`
  }
  public get premiumSignImageUrl() {
    if (!this.isSR()) {
      return undefined
    }
    return `${import.meta.env.VITE_IMAGE_SERVER_URL}/card_sign_p/l/${this.hash}.jpg`
  }
  public isSR(): boolean {
    return this.rarity >= 4
  }
}
