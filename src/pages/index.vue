<script setup lang="ts">
import { ref, computed, watch, inject } from 'vue'
import { useRouter, type LocationQuery } from 'vue-router'
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

const displayedTypeList = computed({
  get: () => typeList.value.map((v) => String(v)),
  set: (value: string[]) => {
    typeList.value = value.map((v) => Number(v))
  },
})

const displayedRarityList = computed({
  get: () => rarityList.value.map((v) => String(v)),
  set: (value: string[]) => {
    rarityList.value = value.map((v) => Number(v))
  },
})

const displayedName = computed({
  get: () => name.value ?? '',
  set: (value: string) => {
    name.value = value.trim().length > 0 ? value : undefined
  },
})

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
  <el-form ref="form" label-position="right" label-width="100px">
    <el-form-item label="カード名">
      <el-input v-model="displayedName" name="name" placeholder="カード名" />
    </el-form-item>
    <el-form-item label="タイプ">
      <el-checkbox-group v-model="displayedTypeList">
        <el-checkbox label="0">キュート</el-checkbox>
        <el-checkbox label="1">クール</el-checkbox>
        <el-checkbox label="2">パッション</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="レアリティ">
      <el-checkbox-group v-model="displayedRarityList">
        <el-checkbox label="0">N</el-checkbox>
        <el-checkbox label="1">N+</el-checkbox>
        <el-checkbox label="2">R</el-checkbox>
        <el-checkbox label="3">R+</el-checkbox>
        <el-checkbox label="4">SR</el-checkbox>
        <el-checkbox label="5">SR+</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="件数">
      <el-select v-model.number="limit" name="limit">
        <el-option value="10">10</el-option>
        <el-option value="25">25</el-option>
        <el-option value="50">50</el-option>
      </el-select>
    </el-form-item>
  </el-form>

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
