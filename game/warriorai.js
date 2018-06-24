var spells = require('./spells');

module.exports = class WarriorAI {

    constructor(entity) 
    {
        this.entity = entity;
    }

    update(enemies, player) {
         if (this.entity.hp + this.entity.shield < 15 && this.entity.hasEnoughAP(spells.slam.apcost)) return spells.shield.effect(this.entity);
         if (this.entity.shield > 5 && this.entity.hp >= 10 && this.entity.hasEnoughAP(spells.shield.apcost)) return spells.slam.effect(this.entity, player);
         if (this.entity.hasEnoughAP(spells.hit.apcost)) return spells.hit.effect(this.entity, player);
         return "";
    }

    simulate(enemies, player) {
         if (this.entity.hp + this.entity.shield < 15) return "shield"
         if (this.entity.shield > 5 && this.entity.hp >= 10) return "slam"
         return "hit"
    }


}