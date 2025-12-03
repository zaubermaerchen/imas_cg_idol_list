<script setup lang="ts">
import { onMounted, ref, reactive, watch, inject } from 'vue'
import { useRouter } from 'vue-router'
import PageContent from '@/components/PageContent.vue'
import CardList from '@/components/CardList.vue'
import CardViewerDialog from '@/components/CardViewerDialog.vue'
import Card from '@/models/card'
import { CardRepositoryInjectKey } from '@/plugins/dependencyProviderPlugin.ts'

const DEFAULT_LIMIT = 25

const router = useRouter()

const condition = reactive<SearchCondition>({
  name: '',
  types: [],
  rarities: [],
  limit: DEFAULT_LIMIT,
})

const cardList = ref<Card[]>([])
const count = ref(0)
const page = ref(1)

const visibleViewer = ref(false)
const selectedCard = ref<Card | null>(null)

const setConditions = () => {
  const parameters: URLSearchParams = new URLSearchParams(window.location.search)
  condition.name = parameters.get('name') ?? ''
  condition.types = parameters.getAll('type')
  condition.rarities = parameters.getAll('rarity')
  condition.limit = parseInt(parameters.get('limit') ?? '') || DEFAULT_LIMIT
}

const cardRepository = inject(CardRepositoryInjectKey)!
const search = async () => {
  const limit = condition.limit
  const offset = (page.value - 1) * limit
  const result = await cardRepository.search(
    condition.types.map((data) => parseInt(data)),
    condition.rarities.map((data) => parseInt(data)),
    condition.name || undefined,
    limit,
    offset,
  )
  cardList.value = result[0]
  count.value = result[1]

  const query: Record<string, string | string[]> = {}
  if (condition.name) {
    query['name'] = condition.name
  }
  query['type'] = condition.types
  query['rarity'] = condition.rarities
  if (condition.limit !== DEFAULT_LIMIT) {
    query['limit'] = condition.limit.toString()
  }

  router.replace({
    name: 'Index',
    query: query,
  })
}

const showViewer = (card: Card): void => {
  selectedCard.value = card
  visibleViewer.value = true
}

onMounted((): void => {
  setConditions()
})

let stopPageWatch = watch(page, () => void search())
watch(condition, () => {
  stopPageWatch()
  page.value = 1
  stopPageWatch = watch(page, () => void search())
  search()
})
</script>

<template>
  <el-form ref="form" label-position="right" label-width="100px">
    <el-form-item label="カード名">
      <el-input v-model="condition.name" name="name" placeholder="カード名" />
    </el-form-item>
    <el-form-item label="タイプ">
      <el-checkbox-group v-model="condition.types">
        <el-checkbox label="0">キュート</el-checkbox>
        <el-checkbox label="1">クール</el-checkbox>
        <el-checkbox label="2">パッション</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="レアリティ">
      <el-checkbox-group v-model="condition.rarities">
        <el-checkbox label="0">N</el-checkbox>
        <el-checkbox label="1">N+</el-checkbox>
        <el-checkbox label="2">R</el-checkbox>
        <el-checkbox label="3">R+</el-checkbox>
        <el-checkbox label="4">SR</el-checkbox>
        <el-checkbox label="5">SR+</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="件数">
      <el-select v-model.number="condition.limit" name="limit">
        <el-option value="10">10</el-option>
        <el-option value="25">25</el-option>
        <el-option value="50">50</el-option>
      </el-select>
    </el-form-item>
  </el-form>

  <PageContent v-model="page" :total="count" :page-size="condition.limit">
    <CardList v-bind:card-list="cardList" @click="showViewer" />
  </PageContent>

  <CardViewerDialog v-if="selectedCard" v-model="visibleViewer" v-bind:card="selectedCard" />
</template>

<style>
body {
  font-size: 80%;
}
</style>
