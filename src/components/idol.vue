<template>
    <tr>
        <td><a v-bind:href="getProfileUrl()">{{ getId() }}</a></td>
        <td>{{ getName() }}</td>
        <td>{{ getRarity() }}</td>
        <td>{{ getCost() }}</td>
        <td>{{ getOffense() }}</td>
        <td>{{ getDefense() }}</td>
        <td>{{ getMaxOffense() }}</td>
        <td>{{ getMaxDefense() }}</td>
        <td>{{ getSkillName() }}</td>
        <td><a v-bind:href="getTradeUrl()">Link</a></td>
        <td><a v-bind:href="getTradeHistoryUrl()">Link</a></td>
        <td><a v-bind:href="getWishUrl()">Link</a></td>
        <td>
            <a v-bind:href="getImageUrl()">通常</a>
            <a v-if="isSR()" v-bind:href="getNoFrameImageUrl()">枠無し</a>
            <a v-if="isSR()" v-bind:href="getSignBImageUrl()">サイン</a>
        </td>
    </tr>
</template>

<script lang="ts">
    function getBaseUrl(path: string): string {
        return "http://125.6.169.35/idolmaster/" + path;
    }
    function getGameUrl(path: string): string {
        const url = getBaseUrl(path);
        return "http://sp.pf.mbga.jp/12008305/" + "?url=" + encodeURIComponent(url);
    }

    export default {
        props: [
            "data"
        ],
        methods: {
            getId(): String {
                return this.data.idol_id;
            },
            getName(): String {
                return this.data.name;
            },
            getRarity(): String {
                switch (parseInt(this.data.rarity)) {
                    case 0:
                        return "N";
                    case 1:
                        return "N+";
                    case 2:
                        return "R";
                    case 3:
                        return "R+";
                    case 4:
                        return "SR";
                    case 5:
                        return "SR+";
                    default:
                        return "";
                }
            }
            getCost(): String {
                return this.data.cost;
            },
            getOffense(): String {
                return this.data.offense;
            },
            getDefense(): String {
                return this.data.defense;
            },
            getMaxOffense(): String {
                return this.data.max_offense;
            },
            getMaxDefense(): String {
                return this.data.max_defense;
            },
            getSkillName(): String {
                return this.data.skill_name;
            },
            getHash(): String {
                return this.data.hash;
            },
            getProfileUrl(): string {
                return getGameUrl("archive/view/" + this.getHash());
            },
            getTradeUrl(): string {
                return getGameUrl("auction/search_top/0/" + this.getHash());
            },
            getTradeHistoryUrl(): string {
                return getGameUrl("auction/history/" + this.getHash());
            },
            getWishUrl(): string {
                return getGameUrl("wish/regist/" + this.getHash() + "/0}");
            },
            getImageUrl(): string {
                return getBaseUrl("image_sp/card/l/" + this.getHash() + ".jpg");
            },
            getNoFrameImageUrl(): string | null {
                let url: string | null =  null;
                if(this.isSR()) {
                    url = getBaseUrl("image_sp/card/l_noframe/" + this.getHash() + ".jpg");
                }
                return url;
            },
            getSignBImageUrl(): string | null {
                let url: string | null =  null;
                if(this.isSR()) {
                    url = getBaseUrl("image_sp/card_sign_b/l/" + this.getHash() + ".jpg");
                }
                return url;
            },
            getSignPImageUrl(): string | null {
                let url: string | null =  null;
                if(this.isSR()) {
                    url = getBaseUrl("image_sp/card_sign_p/l/" + this.getHash() + ".jpg");
                }
                return url;
            },
            isSR(): boolean {
                return parseInt(this.data.rarity) >= 4;
            },
        }
    };
</script>