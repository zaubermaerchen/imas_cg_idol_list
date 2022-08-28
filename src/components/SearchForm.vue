<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  modelValue: SearchCondition
}
interface Emits {
  (e: 'update:modelValue', condition: SearchCondition): void
}
const props = defineProps<Props>();
const emits = defineEmits<Emits>()

const condition = computed({
  get: () => props.modelValue,
  set: (value) => emits('update:modelValue', value),
});
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
      <el-select v-model="condition.limit" name="limit">
        <el-option value="10">10</el-option>
        <el-option value="25">25</el-option>
        <el-option value="50">50</el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>
