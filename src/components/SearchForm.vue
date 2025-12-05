<script setup lang="ts">
import { computed } from 'vue'

const name = defineModel<string | undefined>('name', { required: true })
const typeList = defineModel<number[]>('typeList', { required: true })
const rarityList = defineModel<number[]>('rarityList', { required: true })
const limit = defineModel<number>('limit', { required: true })

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
</template>
