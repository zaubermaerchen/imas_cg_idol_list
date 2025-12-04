<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  total: number
  pageSize: number
}

const offset = defineModel<number>({ required: true })
const props = defineProps<Props>()

const currentPage = computed({
  get: () => Math.floor(offset.value / props.pageSize) + 1,
  set: (value: number) => {
    offset.value = (value - 1) * props.pageSize
  },
})
</script>

<template>
  <el-pagination
    v-model:currentPage="currentPage"
    background
    layout="prev, pager, next"
    :total="total"
    :page-size="pageSize"
  />
  <slot />
  <el-pagination
    v-model:currentPage="currentPage"
    background
    layout="prev, pager, next"
    :total="total"
    :page-size="pageSize"
  />
</template>

<style scoped>
.el-pagination {
  display: flex !important;
  justify-content: center;
}
</style>
