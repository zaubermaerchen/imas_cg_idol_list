<script setup lang="ts">
import { ref, watch, inject } from 'vue'
import { useRouter, type LocationQuery } from 'vue-router'
import SearchForm from '@/components/SearchForm.vue'
import PageContent from '@/components/PageContent.vue'
import CardList from '@/components/CardList.vue'
import CardViewerDialog from '@/components/CardViewerDialog.vue'
import Card from '@/models/card'
import { useFilteredCardList, DEFAULT_LIMIT } from '@/composables/filteredCardList'
import { CardRepositoryInjectKey } from '@/plugins/dependencyProviderPlugin.ts'

const cardRepository = inject(CardRepositoryInjectKey)!
const { typeList, rarityList, name, cardList, total, offset, limit } = useFilteredCardList(
  cardRepository,
  new URLSearchParams(window.location.search),
)

const router = useRouter()
watch([typeList, rarityList, name, limit], async () => {
  const query: LocationQuery = {}
  if (name.value) {
    query['name'] = name.value
  }
  query['type'] = typeList.value.map((v) => v.toString())
  query['rarity'] = rarityList.value.map((v) => v.toString())
  if (limit.value !== DEFAULT_LIMIT) {
    query['limit'] = limit.value.toString()
  }

  router.replace({
    name: 'Index',
    query: query,
  })
})

const isVisibleViewer = ref(false)
const selectedCard = ref<Card | null>(null)
const showViewer = (card: Card): void => {
  selectedCard.value = card
  isVisibleViewer.value = true
}
</script>

<template>
  <SearchForm
    v-model:name="name"
    v-model:type-list="typeList"
    v-model:rarity-list="rarityList"
    v-model:limit="limit"
  />

  <PageContent v-model="offset" :total="total" :page-size="limit">
    <CardList v-bind:card-list="cardList" @click="showViewer" />
  </PageContent>

  <CardViewerDialog v-if="selectedCard" v-model="isVisibleViewer" v-bind:card="selectedCard" />
</template>

<style>
body {
  font-size: 80%;
}
</style>
