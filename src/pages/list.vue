<template>
    <section>
        <el-form ref="form" label-position="right" label-width="100px">
            <el-form-item label="カード名">
                <el-input v-model="name" name="name" placeholder="カード名" v-on:change="changePage(1)"></el-input>
            </el-form-item>
            <el-form-item label="タイプ">
                <el-checkbox-group v-model="types" v-on:change="changePage(1)">
                    <el-checkbox label="0">キュート</el-checkbox>
                    <el-checkbox label="1">クール</el-checkbox>
                    <el-checkbox label="2">パッション</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="レアリティ">
                <el-checkbox-group v-model="rarities" v-on:change="changePage(1)">
                    <el-checkbox label="0">N</el-checkbox>
                    <el-checkbox label="1">N+</el-checkbox>
                    <el-checkbox label="2">R</el-checkbox>
                    <el-checkbox label="3">R+</el-checkbox>
                    <el-checkbox label="4">SR</el-checkbox>
                    <el-checkbox label="5">SR+</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="件数">
                <el-select v-model="limit" name="limit" v-on:change="changePage(1)">
                    <el-option value="25">25</el-option>
                </el-select>
            </el-form-item>
        </el-form>

        <el-pagination background layout="prev, pager, next" v-on:current-change="changePage" v-bind:total="count" v-bind:current-page.sync="page" v-bind:page-size="limit"></el-pagination>

        <el-table v-bind:data="idols">
            <el-table-column label="ID">
                <template v-slot="scope">
                    <el-link type="primary" v-bind:href="scope.row.profile_url">{{ scope.row.id }}</el-link>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="名前"></el-table-column>
            <el-table-column prop="type_text" label="タイプ"></el-table-column>
            <el-table-column prop="rarity_text" label="レアリティ"></el-table-column>
            <el-table-column prop="cost" label="コスト"></el-table-column>
                <el-table-column label="攻">
                    <template v-slot="scope">
                        <ul>
                            <li>{{ scope.row.offense }}</li>
                            <li>({{ scope.row.max_offense }})</li>
                        </ul>
                    </template>
                </el-table-column>
                <el-table-column label="守">
                    <template v-slot="scope">
                        <ul>
                            <li>{{ scope.row.defense }}</li>
                            <li>({{ scope.row.max_defense }})</li>
                        </ul>
                    </template>
                </el-table-column>
                <el-table-column prop="skill_name" label="スキル名"></el-table-column>
                <el-table-column label="トレード">
                    <template v-slot="scope">
                        <ul>
                            <li><el-link type="primary" v-bind:href="scope.row.trade_url">検索</el-link></li>
                            <li><el-link type="primary" v-bind:href="scope.row.trade_history_url">履歴</el-link></li>
                        </ul>
                    </template>
                </el-table-column>
                <el-table-column label="ホシイモノ登録">
                    <template v-slot="scope">
                        <ul>
                            <li><el-link type="primary" v-bind:href="scope.row.wish_url">通常</el-link></li>
                            <li v-if="scope.row.isSR()"><el-link type="primary" v-bind:href="scope.row.wish_premium_url">プレミアムサイン</el-link></li>
                        </ul>
                    </template>
                </el-table-column>
                <el-table-column label="カード画像">
                    <template v-slot="scope">
                        <el-button type="text" v-on:click="showViewer(scope.row)">表示</el-button>
                    </template>
                </el-table-column>
        </el-table>

        <el-pagination background layout="prev, pager, next" v-on:current-change="changePage" v-bind:total="count" v-bind:current-page.sync="page" v-bind:page-size="limit"></el-pagination>

        <el-dialog v-model="visible_viewer">
            <el-tabs v-model="active_viewer_tab" type="border-card" v-if="idol">
                <el-tab-pane label="通常" name="normal">
                    <a v-bind:href="idol.image_url"><img class="card" v-bind:src="idol.image_url" /></a>
                </el-tab-pane>
                <el-tab-pane label="枠なし" name="no_frame" v-if="idol.isSR()" >
                    <a v-bind:href="idol.no_frame_image_url"><img class="card" v-bind:src="idol.no_frame_image_url" /></a>
                </el-tab-pane>
                <el-tab-pane label="サイン" name="sign_b" v-if="idol.isSR()" >
                    <a v-bind:href="idol.sign_b_image_url"><img class="card" v-bind:src="idol.sign_b_image_url" /></a>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>
    </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from "vue"
import { useRouter } from "vue-router"
import Idol from '../components/idol';
import * as api from '../components/api';

const DEFAULT_LIMIT = 25;

export default defineComponent({
    name: "List",
    setup: () => {
        const router = useRouter();

        const name = ref("");
        const types: Ref<string[]> = ref([]);
        const rarities: Ref<string[]> = ref([]);
        const idols: Ref<Idol[]> = ref([]);
        const count = ref(0);
        const page = ref(1);
        const limit = ref(DEFAULT_LIMIT);
        const visible_viewer = ref(false);
        const active_viewer_tab = ref('normal');
        const idol: Ref<Idol|null> = ref(null);

        const setParameters = (): void => {
            const parameters: URLSearchParams = new URLSearchParams(window.location.search);
            if(parameters.has("name")) {
                name.value = decodeURIComponent(parameters.get("name")?.replace(/\+/g, " ") ?? "");
            }
            if(parameters.has("type")) {
                types.value = parameters.getAll("type");
            }
            if(parameters.has("rarity")) {
                rarities.value = parameters.getAll("rarity");
            }
            if(parameters.has("page")) {
                page.value = parseInt(parameters.get("page") ?? "1");
            }
            if(parameters.has("limit")) {
                limit.value = parseInt(parameters.get("limit") ?? DEFAULT_LIMIT.toString());
            }
        };
        const search = (offset: number = 0): void => {
            api.searchCard(
                name.value, 
                types.value.map((data) => parseInt(data)), 
                rarities.value.map((data) => parseInt(data)), 
                limit.value, 
                offset
            ).then((response) => {
                idols.value = response.results.map((data) => new Idol(data));
                count.value = response.count;
                router.replace({ query: {
                    name: name.value, 
                    type: types.value, 
                    rarity: rarities.value,
                    limit: limit.value.toString(),
                }});
            });
        };
        const changePage = (_page: number): void => {
            page.value = _page;
            search((page.value - 1) * limit.value);
        };
        const showViewer = (_idol: Idol): void => {
            idol.value = _idol;
            active_viewer_tab.value = 'normal';
            visible_viewer.value = true;
        };

        onMounted((): void => {
            setParameters();
            search((page.value - 1) * limit.value);
        });

        return {
            name,
            types,
            rarities,
            idols,
            count,
            page,
            limit,
            visible_viewer,
            active_viewer_tab,
            idol,
            changePage,
            showViewer,
        }
    }
});
</script>

<style>
    body {
        font-size: 80%;
    }
    .el-pagination {
        display: flex !important;
        justify-content: center;
    }
    .el-table {
        width: 100%;
        margin-bottom: 1em;
    }
    .el-dialog__body {
        text-align: center;
    }
    ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    img.card {
        max-width: 80%;
        background-color: black;
        object-fit: contain;
    }
</style>