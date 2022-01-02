export default class Idol {
    id: number;
    name: string;
    type: number;
    rarity: number;
    cost: number;
    offense: number;
    defense: number;
    max_offense: number;
    max_defense: number;
    skill_name: string;
    hash: string;

    public constructor(data: { [key: string]: string; }) {
        this.id = parseInt(data.idol_id);
        this.name = data.name;
        this.type = parseInt(data.type);
        this.rarity = parseInt(data.rarity);
        this.cost = parseInt(data.cost);
        this.offense = parseInt(data.offense);
        this.defense = parseInt(data.defense);
        this.max_offense = parseInt(data.max_offense);
        this.max_defense = parseInt(data.max_defense);
        this.skill_name = data.skill_name;
        this.hash = data.hash;
    }
    private static getBaseUrl(path: string): string {
        return "http://mobamas.net/idolmaster/" + path;
    }
    private static getGameUrl(path: string): string {
        const url = Idol.getBaseUrl(path);
        return "http://sp.pf.mbga.jp/12008305/" + "?url=" + encodeURIComponent(url);
    }

    public get type_text(): String {
        switch (this.type) {
            case 0:
                return "Cu";
            case 1:
                return "Co";
            case 2:
                return "Pa";
            default:
                return "";
        }
    }

    public get rarity_text(): String {
        switch (this.rarity) {
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
    public get profile_url(): string {
        return Idol.getGameUrl("archive/view/" + this.hash);
    }
    public get trade_url(): string {
        return Idol.getGameUrl("auction/search_top/0/" + this.hash);
    }
    public get trade_history_url(): string {
        return Idol.getGameUrl("auction/history/" + this.hash);
    }
    public get wish_url(): string {
        return Idol.getGameUrl("wish/regist/" + this.hash + "/0/0/");
    }
    public get wish_premium_url(): string | undefined {
        let url: string | undefined =  undefined;
        if(this.isSR()) {
            url = Idol.getGameUrl("wish/regist/" + this.hash + "/0/1/");
        }
        return url;
    }
    public get image_url(): string {
        return Idol.getBaseUrl("image_sp/card/l/" + this.hash + ".jpg");
    }
    public get no_frame_image_url(): string | undefined {
        let url: string | undefined =  undefined;
        if(this.isSR()) {
            url = Idol.getBaseUrl("image_sp/card/l_noframe/" + this.hash + ".jpg");
        }
        return url;
    }
    public get sign_b_image_url(): string | undefined {
        let url: string | undefined =  undefined;
        if(this.isSR()) {
            url = Idol.getBaseUrl("image_sp/card_sign_b/l/" + this.hash + ".jpg");
        }
        return url;
    }
    public get sign_p_image_url(): string | undefined {
        let url: string | undefined =  undefined;
        if(this.isSR()) {
            url = Idol.getBaseUrl("image_sp/card_sign_p/l/" + this.hash + ".jpg");
        }
        return url;
    }
    public isSR(): boolean {
        return this.rarity >= 4;
    }
}