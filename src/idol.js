var Idol = (function () {
    function Idol(data) {
        if (data === void 0) { data = null; }
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
        }
        else {
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
    Idol.prototype.getProfileUrl = function () {
        return Idol.getGameUrl("archive/view/" + this.hash);
    };
    Idol.prototype.getTradeUrl = function () {
        return Idol.getGameUrl("auction/search_top/0/" + this.hash);
    };
    Idol.prototype.getTradeHistoryUrl = function () {
        return Idol.getGameUrl("auction/history/" + this.hash);
    };
    Idol.prototype.getWishUrl = function () {
        return Idol.getGameUrl("wish/regist/" + this.hash + "/0}");
    };
    Idol.prototype.getImageUrl = function () {
        return Idol.getBaseUrl("image_sp/card/l/" + this.hash + ".jpg");
    };
    Idol.prototype.getNoFrameImageUrl = function () {
        var url = null;
        if (this.isSR()) {
            url = Idol.getBaseUrl("image_sp/card/l_noframe/" + this.hash + ".jpg");
        }
        return url;
    };
    Idol.prototype.getSignBImageUrl = function () {
        var url = null;
        if (this.isSR()) {
            url = Idol.getBaseUrl("image_sp/card_sign_b/l/" + this.hash + ".jpg");
        }
        return url;
    };
    Idol.prototype.getSignPImageUrl = function () {
        var url = null;
        if (this.isSR()) {
            url = Idol.getBaseUrl("image_sp/card_sign_p/l/" + this.hash + ".jpg");
        }
        return url;
    };
    Idol.prototype.isSR = function () {
        return parseInt(this.rarity) >= 4;
    };
    Idol.getBaseUrl = function (path) {
        return "http://125.6.169.35/idolmaster/" + path;
    };
    Idol.getGameUrl = function (path) {
        var url = Idol.getBaseUrl(path);
        return "http://sp.pf.mbga.jp/12008305/" + "?url=" + encodeURIComponent(url);
    };
    return Idol;
}());
export default Idol;
//# sourceMappingURL=idol.js.map