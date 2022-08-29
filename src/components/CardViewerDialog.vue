<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import Idol from '@/classes/idol'

interface Props {
  modelValue: boolean
  idol: Idol
}
interface Emits {
  (e: 'update:modelValue', isVisible: boolean): string
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const activeTab = ref('normal')
const isVisible = computed({
  get: () => props.modelValue,
  set: (value) => emits('update:modelValue', value),
})

watch(props, () => {
  activeTab.value = 'normal'
})
</script>

<template>
  <el-dialog v-model="isVisible">
    <el-tabs v-model="activeTab" class="dialog-body" type="border-card">
      <el-tab-pane label="通常" name="normal">
        <a :href="idol.imageUrl"><img class="card" :src="idol.imageUrl" /></a>
      </el-tab-pane>
      <el-tab-pane v-if="idol.isSR()" label="枠なし" name="no_frame">
        <a :href="idol.noFrameImageUrl"><img class="card" :src="idol.noFrameImageUrl" /></a>
      </el-tab-pane>
      <el-tab-pane v-if="idol.isSR()" label="サイン" name="sign_b">
        <a :href="idol.signImageUrl"><img class="card" :src="idol.signImageUrl" /></a>
      </el-tab-pane>
      <el-tab-pane v-if="idol.isSR()" label="プレミアムサイン" name="sign_p">
        <a :href="idol.premiumSignImageUrl"><img class="card" :src="idol.premiumSignImageUrl" /></a>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>


<style scoped>
  .dialog-body {
    text-align: center;
  }
  img.card {
    max-width: 80%;
    background-color: black;
    object-fit: contain;
  }
</style>
