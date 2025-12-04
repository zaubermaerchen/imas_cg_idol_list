import { ref, watch } from 'vue'
import Card from '@/models/card.ts'
import type CardRepositoryInterface from '@/repositories/cardRepositoryInterface.ts'

export const DEFAULT_LIMIT = 25

export function useFilteredCardList(
  cardRepository: CardRepositoryInterface,
  parameter: URLSearchParams,
) {
  const typeList = ref<number[]>(parameter.getAll('type').map((data) => parseInt(data)))
  const rarityList = ref<number[]>(parameter.getAll('rarity').map((data) => parseInt(data)))
  const name = ref<string | undefined>(parameter.get('name') ?? undefined)
  const cardList = ref<Card[]>([])
  const total = ref(0)
  const offset = ref(0)
  const limit = ref(parseInt(parameter.get('limit') ?? '') || DEFAULT_LIMIT)

  const fetchCardList = async () => {
    try {
      const result = await cardRepository.search(
        typeList.value,
        rarityList.value,
        name.value,
        limit.value,
        offset.value,
      )
      cardList.value = result[0]
      total.value = result[1]
    } catch (error) {
      console.error('Failed to fetch card list:', error)
    }
  }

  void fetchCardList()
  let stopOffsetWatch = watch(offset, fetchCardList)
  watch([typeList, rarityList, name, limit], async () => {
    cardList.value = []
    stopOffsetWatch()
    offset.value = 0
    await fetchCardList()
    stopOffsetWatch = watch(offset, fetchCardList)
  })
  watch([offset], fetchCardList)

  return { typeList, rarityList, name, cardList, total, offset, limit }
}
