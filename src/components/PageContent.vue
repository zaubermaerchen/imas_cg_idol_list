<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue: number
  total: number
  pageSize: number
}
interface Emits {
  (e: 'update:modelValue', page: number): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()
const currentPage = computed({
  get: () => props.modelValue,
  set: (value) => emits('update:modelValue', value),
})
</script>

<template>
  <el-pagination v-model:currentPage="currentPage" background layout="prev, pager, next" :total="total" :page-size="pageSize" />
  <slot />
  <el-pagination v-model:currentPage="currentPage" background layout="prev, pager, next" :total="total" :page-size="pageSize" />
</template>

<style scoped>
  .el-pagination {
    display: flex !important;
    justify-content: center;
  }
</style>
