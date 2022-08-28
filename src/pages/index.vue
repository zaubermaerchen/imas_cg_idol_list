
<script setup lang="ts">
import { onMounted, ref, reactive, computed, watch } from "vue"
import { useRouter, useRoute } from "vue-router"
import SearchForm from "@/components/SearchForm.vue"
import PageContent from '@/components/PageContent.vue'
import CardList from '@/components/CardList.vue'
import CardViewerDialog from '@/components/CardViewerDialog.vue'
import { searchCard } from '@/functions/api'
import Idol from '@/classes/idol'

const DEFAULT_LIMIT = 25;

const router = useRouter();
const route = useRoute();

const condition = reactive<SearchCondition>({
  name: '',
  types: [],
  rarities: [],
  limit: DEFAULT_LIMIT,
})

const response = ref<Api.SearchCardResponse | null>(null);
const idols = computed(() => response.value?.results.map((data) => new Idol(data)) ?? [])
const count = computed(() => response.value?.count ?? 0)
const page = ref(1);

const visibleViewer = ref(false);
const idol = ref<Idol | null>(null);


const setConditions = () => {
  const parameters: URLSearchParams = new URLSearchParams(window.location.search);
  condition.name = parameters.get('name') ?? ''
  condition.types = parameters.getAll("type")
  condition.rarities = parameters.getAll("rarity")
  condition.limit = parseInt(parameters.get("limit") ?? DEFAULT_LIMIT.toString())
}

const search = async () => {
  const offset = (page.value - 1) * condition.limit
  response.value = await searchCard(
    condition.name || undefined,
    condition.types.map((data) => parseInt(data)),
    condition.rarities.map((data) => parseInt(data)),
    condition.limit,
    offset
  );

  router.replace({
    path: route.path,
    query: {
      name: condition.name,
      type: condition.types,
      rarity: condition.rarities,
      limit: condition.limit.toString(),
    }
  });
};

const showViewer = (_idol: Idol): void => {
  idol.value = _idol;
  visibleViewer.value = true;
};

onMounted((): void => {
  setConditions()
});

let stopPageWatch = watch(page, () => void search())
watch(condition, () => {
  stopPageWatch()
  page.value = 1
  stopPageWatch = watch(page, () => void search())
  search();
})
</script>

<template>
  <SearchForm v-model="condition" />

  <PageContent v-model="page" :total="count" :page-size="condition.limit">
    <CardList :idols="idols" @click="showViewer" />
  </PageContent>

  <CardViewerDialog v-if="idol" v-model="visibleViewer" :idol="idol" />
</template>

<style>
  body {
    font-size: 80%;
  }
</style>
