<script setup lang="ts">
import Idol from '@/models/idol'

interface Props {
  idols: Idol[]
}
interface Emits {
  (e: 'click', idol: Idol): string
}

defineProps<Props>()
const emits = defineEmits<Emits>()

const click = (idol: Idol) => {
  emits('click', idol)
}
</script>

<template>
  <el-table :data="idols">
    <el-table-column label="ID">
      <template #default="scope">
        <el-link type="primary" :href="scope.row.profileUrl">{{ scope.row.id }}</el-link>
      </template>
    </el-table-column>
    <el-table-column prop="name" label="名前" />
    <el-table-column prop="typeText" label="タイプ" />
    <el-table-column prop="rarityText" label="レアリティ" />
    <el-table-column prop="cost" label="コスト" />
    <el-table-column label="攻">
      <template #default="scope">
        <ul>
          <li>{{ scope.row.offense }}</li>
          <li>({{ scope.row.maxOffense }})</li>
        </ul>
      </template>
    </el-table-column>
    <el-table-column label="守">
      <template #default="scope">
        <ul>
          <li>{{ scope.row.defense }}</li>
          <li>({{ scope.row.maxDefense }})</li>
        </ul>
      </template>
    </el-table-column>
    <el-table-column prop="skillName" label="スキル名" />
    <el-table-column label="トレード">
      <template #default="scope">
        <ul>
          <li><el-link type="primary" :href="scope.row.tradeUrl">検索</el-link></li>
          <li><el-link type="primary" :href="scope.row.tradeHistoryUrl">履歴</el-link></li>
        </ul>
      </template>
    </el-table-column>
    <el-table-column label="ホシイモノ登録">
      <template #default="scope">
        <ul>
          <li><el-link type="primary" :href="scope.row.wishUrl">通常</el-link></li>
          <li v-if="scope.row.isSR()">
            <el-link type="primary" :href="scope.row.wishPremiumSignUrl">プレミアムサイン</el-link>
          </li>
        </ul>
      </template>
    </el-table-column>
    <el-table-column label="カード画像">
      <template #default="scope">
        <el-link type="primary" @click="click(scope.row)">表示</el-link>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>
.el-table {
  margin-bottom: 1em;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
