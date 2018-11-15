<template>
    <form>
        <table>
            <tr>
                <th>名前</th>
                <td>
                    <input type="search" name="name" v-bind:value="name"/>
                </td>
            </tr>
            <tr>
                <th>タイプ</th>
                <td>
                    <input type="checkbox" name="type" id="type_cute" value="0" v-bind:checked="isCheckedType(0)" onchange="this.form.submit()">
                    <label for="type_cute">キュート</label>
                    <input type="checkbox" name="type" id="type_cool" value="1" v-bind:checked="isCheckedType(1)" onchange="this.form.submit()">
                    <label for="type_cool">クール</label>
                    <input type="checkbox" name="type" id="type_passion" value="2" v-bind:checked="isCheckedType(2)" onchange="this.form.submit()">
                    <label for="type_passion">パッション</label>
                </td>
            </tr>
            <tr>
                <th>レアリティ</th>
                <td>
                    <input type="checkbox" name="rarity" id="rarity_normal" value="0" v-bind:checked="isCheckedRarity(0)" onchange="this.form.submit()">
                    <label for="rarity_normal">N</label>
                    <input type="checkbox" name="rarity" id="rarity_normal_plus" value="1" v-bind:checked="isCheckedRarity(1)" onchange="this.form.submit()">
                    <label for="rarity_normal_plus">N+</label>
                    <input type="checkbox" name="rarity" id="rarity_rare" value="2" v-bind:checked="isCheckedRarity(2)" onchange="this.form.submit()">
                    <label for="rarity_rare">R</label>
                    <input type="checkbox" name="rarity" id="rarity_rare_plus" value="3" v-bind:checked="isCheckedRarity(3)" onchange="this.form.submit()">
                    <label for="rarity_rare_plus">R+</label>
                    <input type="checkbox" name="rarity" id="rarity_super_rare" value="4" v-bind:checked="isCheckedRarity(4)" onchange="this.form.submit()">
                    <label for="rarity_super_rare">SR</label>
                    <input type="checkbox" name="rarity" id="rarity_super_rare_plus" value="5" v-bind:checked="isCheckedRarity(5)" onchange="this.form.submit()">
                    <label for="rarity_super_rare_plus">SR+</label>
                </td>
            </tr>
            <tr>
                <th>件数</th>
                <td>
                    <select name="limit" onchange="this.form.submit()">
                        <option value="25" v-bind:selected="isSelectedLimit(25)">25</option>
                        <option value="50" v-bind:selected="isSelectedLimit(50)">50</option>
                        <option value="100" v-bind:selected="isSelectedLimit(100)">100</option>
                    </select>
                </td>
            </tr>
        </table>
    </form>
</template>

<script lang="ts">
    export default {
        props: [
            "name",
            "types",
            "rarities",
            "limit"
        ],
        methods: {
            isCheckedType(type: number): boolean {
                return this.types.indexOf(type.toString()) != -1;
            },
            isCheckedRarity(rarity: number): boolean {
                return this.rarities.indexOf(rarity.toString()) != -1;
            },
            isSelectedLimit(limit: number): boolean {
                return this.limit == limit.toString();
            }
        }
    }
</script>

<style scoped>
    input[type="search"] {
         padding: 0.5em 2px;
         width: 30em;
     }
</style>