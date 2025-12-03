<script setup lang="ts">
interface Props {
  total: number
  pageSize: number
}

const currentPage = defineModel<number>({ required: true })
defineProps<Props>()
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
