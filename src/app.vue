<template>
    <section>
        <searchform v-bind:name="name" v-bind:types="types" v-bind:rarities="rarities" v-bind:limit="limit"></searchform>
        <pager v-bind:count="count" v-bind:limit="limit" @change="changePage"></pager>
        <table id="idols">
            <tr>
                <th rowspan="2">ID</th>
                <th rowspan="2">名前</th>
                <th rowspan="2">タイプ</th>
                <th rowspan="2">レアリティ</th>
                <th rowspan="2">コスト</th>
                <th colspan="2">初期値</th>
                <th colspan="2">MAX</th>
                <th rowspan="2">スキル名</th>
                <th colspan="2">トレード</th>
                <th rowspan="2">ホシイモノ<br />登録</th>
                <th rowspan="2">カード画像</th>
            </tr>
            <tr>
                <th>攻</th>
                <th>守</th>
                <th>攻</th>
                <th>守</th>
                <th>検索</th>
                <th>履歴</th>
            </tr>
            <idol v-for="idol in idols" v-bind:data="idol"></idol>
        </table>
    </section>
</template>

<script lang="ts">
    import searchform from './components/search_form.vue';
    import idol from './components/idol.vue';
    import pager from './components/pager.vue';

    export default {
        components: {
            "searchform": searchform,
            "idol": idol,
            "pager": pager
        },
        data: function () {
            return {
                name: "",
                types: [],
                rarities: [],
                idols: [],
                count: 0,
                limit: 25,
            };
        },
        mounted: function (): void {
            this.setParameters();
            this.loadList();
        },
        methods: {
            setParameters: function(): void {
                const parameters: URLSearchParams = new URLSearchParams(window.location.search);
                if(parameters.has("name")) {
                    this.name = decodeURIComponent(parameters.get("name").replace(/\+/g, " ");
                }
                if(parameters.has("type")) {
                    this.types = parameters.getAll("type");
                }
                if(parameters.has("rarity")) {
                    this.rarities = parameters.getAll("rarity");
                }
                if(parameters.has("limit")) {
                    this.limit = parameters.get("limit");
                }
            },
            loadList: function (offset: number = 0): void {
                let data: FormData = new FormData();
                data.append("name", this.name);
                for(let i = 0; i < this.types.length; i++) {
                    data.append("type", this.types[i]);
                }
                for(let i = 0; i < this.rarities.length; i++) {
                    data.append("rarity", this.rarities[i]);
                }
                data.append("limit", this.limit);
                data.append("offset", offset.toString());
                fetch("https://zaubermaerchen.info/imas_cg/api/idol/list/", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                    },
                    body: data,
                    mode: "cors",
                    credentials: "omit"
                }).then((response) => {
                    return response.json();
                }).then((json) => {
                    this.idols = json.results;
                    this.count = json.count;
                })
            },
            changePage: function(offset: number): void {
                this.loadList(offset);
            }
        }
    };
</script>

<style>
    body {
        font-size: 80%;
    }

    table {
        margin: 1em 0;
        border-spacing: 1px;
    }
    table#idols {
        width: 100%;
    }
    table#idols th {
        color: #ffffff;
        background-color: #000000;
        padding: 2px 4px;
    }
    table#idols td {
        background-color: #cccccc;
        padding: 2px 4px;
    }
</style>