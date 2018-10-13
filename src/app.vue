<template>
    <section>
        <table>
            <tr>
                <th>タイプ</th>
                <td>
                    <select name="type" v-model="type" v-on:change="loadList">
                        <option value="0" selected="selected">キュート</option>
                        <option value="1">クール</option>
                        <option value="2">パッション</option>
                    </select>
                </td>
            </tr>
            <tr>
                <th>レアリティ</th>
                <td>
                    <select name="rarity" v-model="rarity" v-on:change="loadList">
                        <option value="0" selected="selected">ノーマル</option>
                        <option value="1">ノーマル+</option>
                        <option value="2">レア</option>
                        <option value="3">レア+</option>
                        <option value="4">Sレア</option>
                        <option value="5">Sレア+</option>
                    </select>
                </td>
            </tr>
        </table>
        <table>
            <tr>
                <th rowspan="2">ID</th>
                <th rowspan="2">名前</th>
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
            <tr v-for="idol in idols">
                <td><a v-bind:href="idol.getProfileUrl()">{{ idol.id }}</a></td>
                <td>{{ idol.name }}</td>
                <td>{{ idol.cost }}</td>
                <td>{{ idol.offense }}</td>
                <td>{{ idol.defense }}</td>
                <td>{{ idol.max_offense }}</td>
                <td>{{ idol.max_defense }}</td>
                <td>{{ idol.skill_name }}</td>
                <td><a v-bind:href="idol.getTradeUrl()">Link</a></td>
                <td><a v-bind:href="idol.getTradeHistoryUrl()">Link</a></td>
                <td><a v-bind:href="idol.getWishUrl()">Link</a></td>
                <td>
                    <a v-bind:href="idol.getImageUrl()">通常</a>
                    <a v-if="idol.isSR()" v-bind:href="idol.getNoFrameImageUrl()">枠無し</a>
                    <a v-if="idol.isSR()" v-bind:href="idol.getSignBImageUrl()">サイン</a>
                </td>
            </tr>
        </table>
    </section>
</template>

<script lang="ts">
    import Idol from './idol.ts';
    export default {
        data: function () {
            return {
                type: "0",
                rarity: "0",
                idols: []
            };
        },
        mounted: function (): void {
            this.loadList();
        },
        methods: {
            loadList: function (): void {
                let data: FormData = new FormData();
                data.append("type", this.type);
                data.append("rarity", this.rarity);
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
                    let idols: Idol[] = [];
                    for (const key in json) {
                        idols.push(new Idol(json[key]));
                    }
                    this.idols = idols;
                })
            }

        }
    };
</script>