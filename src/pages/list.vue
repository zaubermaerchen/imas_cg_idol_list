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
                    <el-option value="50">50</el-option>
                    <el-option value="100">100</el-option>
                </el-select>
            </el-form-item>
        </el-form>

        <el-pagination background layout="prev, pager, next" v-on:current-change="changePage" v-bind:total="count" v-bind:current-page.sync="page" v-bind:page-size="limit"></el-pagination>

        <el-table v-bind:data="idols">
            <el-table-column label="ID">
                <template slot-scope="scope">
                    <el-link type="primary" v-bind:href="scope.row.profile_url">{{ scope.row.id }}</el-link>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="名前"></el-table-column>
            <el-table-column prop="type_text" label="タイプ"></el-table-column>
            <el-table-column prop="rarity_text" label="レアリティ"></el-table-column>
            <el-table-column prop="cost" label="コスト"></el-table-column>
            <el-table-column label="攻">
                <template slot-scope="scope">
                    <ul>
                        <li>{{ scope.row.offense }}</li>
                        <li>({{ scope.row.max_offense }})</li>
                    </ul>
                </template>
            </el-table-column>
            <el-table-column label="守">
                <template slot-scope="scope">
                    <ul>
                        <li>{{ scope.row.defense }}</li>
                        <li>({{ scope.row.max_defense }})</li>
                    </ul>
                </template>
            </el-table-column>
            <el-table-column prop="skill_name" label="スキル名"></el-table-column>
            <el-table-column label="トレード">
                <template slot-scope="scope">
                    <ul>
                        <li><el-link type="primary" v-bind:href="scope.row.trade_url">検索</el-link></li>
                        <li><el-link type="primary" v-bind:href="scope.row.trade_history_url">履歴</el-link></li>
                    </ul>
                </template>
            </el-table-column>
            <el-table-column label="ホシイモノ登録">
                <template slot-scope="scope">
                    <ul>
                        <li><el-link type="primary" v-bind:href="scope.row.wish_url">通常</el-link></li>
                        <li v-if="scope.row.isSR()"><el-link type="primary" v-bind:href="scope.row.wish_premium_url">プレミアムサイン</el-link></li>
                    </ul>
                </template>
            </el-table-column>
            <el-table-column label="カード画像">
                <template slot-scope="scope">
                    <el-button type="text" v-on:click="showViewer(scope.row)">表示</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination background layout="prev, pager, next" v-on:current-change="changePage" v-bind:total="count" v-bind:current-page.sync="page" v-bind:page-size="limit"></el-pagination>
 
        <el-dialog v-bind:visible.sync="visible_viewer">
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
    import Idol from '../components/idol.ts';
    import * as api from '../components/api.ts';

    export default {
        data: function () {
            return {
                name: "",
                types: [],
                rarities: [],
                idols: [],
                count: 0,
                page: 1,
                limit: 25,
                visible_viewer: false,
                active_viewer_tab: 'normal',
                idol: null,
            };
        },
        mounted: function (): void {
            this.setParameters();
            this.search((this.page - 1) * this.limit);
        },
        methods: {
            setParameters: function(): void {
                const parameters: URLSearchParams = new URLSearchParams(window.location.search);
                if(parameters.has("name")) {
                    this.name = decodeURIComponent(parameters.get("name").replace(/\+/g, " "));
                }
                if(parameters.has("type")) {
                    this.types = parameters.getAll("type");
                }
                if(parameters.has("rarity")) {
                    this.rarities = parameters.getAll("rarity");
                }
                if(parameters.has("page")) {
                    this.page = parseInt(parameters.get("page"));
                }
                if(parameters.has("limit")) {
                    this.limit = parseInt(parameters.get("limit"));
                }
            },
            search: function (offset: number = 0): void {
                api.searchCard(this.name, this.types, this.rarities, this.limit, offset).then((json: { [key: string]: any; }) => {
                    this.idols = json.results.map((data: { [key: string]: string; }) => new Idol(data));
                    this.count = json.count;
                    this.$router.replace({ query: {
                        name: this.name, 
                        type: this.types, 
                        rarity: this.rarities,
                        limit: this.limit.toString(),
                    }});
                })
            },
            changePage: function(page: number): void {
                this.page = page;
                this.search((page - 1) * this.limit);
            },
            showViewer: function(idol: Idol) {
                this.idol = idol;
                this.active_viewer_tab = 'normal';
                this.visible_viewer = true;
            }
        }
    };
</script>

<style>
    body {
        font-size: 80%;
    }
    .el-pagination {
        display: flex;
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