<script setup lang="ts">
import { ref, watch } from 'vue'
import Card from '@/models/card'

interface Props {
  card: Card
}
const isVisible = defineModel<boolean>({ required: true })
const props = defineProps<Props>()

const activeTab = ref('normal')

watch(props, () => {
  activeTab.value = 'normal'
})
</script>

<template>
  <el-dialog v-model="isVisible">
    <el-tabs v-model="activeTab" class="dialog-body" type="border-card">
      <el-tab-pane label="通常" name="normal">
        <a :href="card.imageUrl"><img class="card" :src="card.imageUrl" /></a>
      </el-tab-pane>
      <el-tab-pane v-if="card.isSR()" label="枠なし" name="no_frame">
        <a :href="card.noFrameImageUrl"><img class="card" :src="card.noFrameImageUrl" /></a>
      </el-tab-pane>
      <el-tab-pane v-if="card.isSR()" label="サイン" name="sign_b">
        <a :href="card.signImageUrl"><img class="card" :src="card.signImageUrl" /></a>
      </el-tab-pane>
      <el-tab-pane v-if="card.isSR()" label="プレミアムサイン" name="sign_p">
        <a :href="card.premiumSignImageUrl"><img class="card" :src="card.premiumSignImageUrl" /></a>
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
