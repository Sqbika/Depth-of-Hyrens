var spells = require('./spells');

module.exports = class MageAI {

    constructor(entity) 
    {
        this.entity = entity;
    }

    update(enemies, player) {
        if (this.entity.dead) return "";
        if (this.entity.mana < this.entity._default.mana) this.entity.mana++;
        var heal = this.shouldheal(enemies);
        if (heal !== false && this.entity.hasEnoughAP(spells.heal.apcost)) return spells["heal"].effect(this.entity, heal);
        if (this.shouldZap(enemies, player) && this.entity.hasEnoughAP(spells.zap.apcost)) return spells["zap"].effect(this.entity, player);
        if (this.entity.mana >= spells["buff"].manacost && this.entity.hasEnoughAP(spells.buff.apcost)) return spells["buff"].effect(this.entity, this.getRandomEnemy(enemies));
        return "";
    }

    simulate(enemies, player) {
        if (this.entity.dead) return;
        var heal = this.shouldheal(enemies);
        if (heal !== false) return "heal"
        if (this.shouldZap(enemies, player)) return "zap"
        if (this.entity.mana >= spells["buff"].manacost) return "buff"
        return "confuse" //The game will get stuck if he doesn't have it.
    }

    shouldheal(enemies, player) {
        if (this.entity.mana < spells["heal"].manacost) return false;
        var lessthan8 = enemies.filter((ele) => ele.hp <=8 );
        if (lessthan8 > 0) {
            var lowesthpuser;
            lessthan8.forEach(ele => {
                if (lowesthpuser == undefined || lowesthpuser.hp < ele.hp) return lowesthpuser = ele;
            });
            return lowesthpuser;
        }
        return false;
    }

    shouldZap(enemies, player) {
        if (this.entity.mana < spells["zap"].manacost) return false;
        if (player.shield >= 4) return true;
        return false;
    }

    getRandomEnemy(enemies) {
        var filtered = enemies.filter(e => !e.dead && e.class=="warrior");
        if (filtered.length == 0) filtered = enemies.filter(e => !e.dead);
        var i = Math.floor(Math.random() * filtered.length);
        return filtered[i];
    }

}