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
                    <a v-bind:href="scope.row.profile_url">{{ scope.row.id }}</a>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="名前"></el-table-column>
            <el-table-column prop="type_text" label="タイプ"></el-table-column>
            <el-table-column prop="rarity_text" label="レアリティ"></el-table-column>
            <el-table-column prop="cost" label="コスト"></el-table-column>
            <el-table-column prop="offense" label="初期値攻"></el-table-column>
            <el-table-column prop="defense" label="初期値守"></el-table-column>
            <el-table-column prop="max_offense" label="MAX攻"></el-table-column>
            <el-table-column prop="max_defense" label="MAX守"></el-table-column>
            <el-table-column prop="skill_name" label="スキル名"></el-table-column>
            <el-table-column label="トレード">
                <template slot-scope="scope">
                    <a v-bind:href="scope.row.trade_url">検索</a>
                    <a v-bind:href="scope.row.trade_history_url">履歴</a>
                </template>
            </el-table-column>
            <el-table-column label="ホシイモノ">
                <template slot-scope="scope">
                    <a v-bind:href="scope.row.wish_url" target="_blunk">登録</a>
                </template>
            </el-table-column>
            <el-table-column label="カード画像">
                <template slot-scope="scope">
                    <a v-bind:href="scope.row.image_url">通常</a>
                    <a v-if="scope.row.isSR()" v-bind:href="scope.row.no_frame_image_url">枠無し</a>
                    <a v-if="scope.row.isSR()" v-bind:href="scope.row.sign_b_image_url">サイン</a>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination background layout="prev, pager, next" v-on:current-change="changePage" v-bind:total="count" v-bind:current-page.sync="page" v-bind:page-size="limit"></el-pagination>

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
</style>