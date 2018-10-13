export default class Idol {
    id: string;
    type: string;
    rarity: string;
    name: string;
    cost: string;
    offense: string;
    defense: string;
    max_offense: string;
    max_defense: string;
    skill_name: string;
    hash: string;

    constructor(data: { [index: string]: string; } | null = null) {
        if (data) {
            this.id = data["idol_id"];
            this.type = data["type"];
            this.rarity = data["rarity"];
            this.name = data["name"];
            this.cost = data["cost"];
            this.offense = data["offense"];
            this.defense = data["defense"];
            this.max_offense = data["max_offense"];
            this.max_defense = data["max_defense"];
            this.skill_name = data["skill_name"];
            this.hash = data["hash"];
        } else {
            this.id = "0";
            this.type = "0";
            this.rarity = "0";
            this.name = "";
            this.cost = "0";
            this.offense = "0";
            this.defense = "0";
            this.max_offense = "0";
            this.max_defense = "0";
            this.skill_name = "";
            this.hash = "";
        }
    }
    getProfileUrl(): string {
        return Idol.getGameUrl("archive/view/" + this.hash);
    }
    getTradeUrl(): string {
        return Idol.getGameUrl("auction/search_top/0/" + this.hash);
    }
    getTradeHistoryUrl(): string {
        return Idol.getGameUrl("auction/history/" + this.hash);
    }
    getWishUrl(): string {
        return Idol.getGameUrl("wish/regist/" + this.hash + "/0}");
    }
    getImageUrl(): string {
        return Idol.getBaseUrl("image_sp/card/l/" + this.hash + ".jpg");
    }
    getNoFrameImageUrl(): string | null {
        let url: string | null =  null;
        if(this.isSR()) {
            url = Idol.getBaseUrl("image_sp/card/l_noframe/" + this.hash + ".jpg");
        }
        return url;
    }
    getSignBImageUrl(): string | null {
        let url: string | null =  null;
        if(this.isSR()) {
            url = Idol.getBaseUrl("image_sp/card_sign_b/l/" + this.hash + ".jpg");
        }
        return url;
    }
    getSignPImageUrl(): string | null {
        let url: string | null =  null;
        if(this.isSR()) {
            url = Idol.getBaseUrl("image_sp/card_sign_p/l/" + this.hash + ".jpg");
        }
        return url;
    }
    isSR(): boolean {
        return parseInt(this.rarity) >= 4;
    }

    static getBaseUrl(path: string): string {
        return "http://125.6.169.35/idolmaster/" + path;
    }
    static getGameUrl(path: string): string {
        const url = Idol.getBaseUrl(path);
        return "http://sp.pf.mbga.jp/12008305/" + "?url=" + encodeURIComponent(url);
    }
}
