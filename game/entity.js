const classes = require('./classes.json');
const buffs = require('./effects');
const helper = require('../helper');
const names = require('./names.json');

module.exports = class Entity {
    constructor(classtype) {
        if (Object.keys(classes).indexOf(classtype) !== -1) {
            this._class = classtype;
            Object.assign(this, classes[classtype]);
            this._default = classes[classtype];
            this.dead = false;
            this.buffs = this.buffs.map(ele => buffs[ele]);
            this.intent = "";
            this.name = classtype == "player" ? "Player" : names[Math.floor(Math.random()*names.length)];
        } else {
            console.log(`Classtype [${classtype}] not found.`);
        }
    }

    addai(AI) {
        if (AI !== undefined) {
            this.AI = AI;
        }
        return this;
    }

    hasEnoughAP(cost) {
        return this.ap >= cost;
    }

    hasEnoughMana(cost) {
        return this.mana >= cost;
    }

    damage(amount, spell, source, target) {
        var endresult = "";
        var result = "(";
        if (this.shield !== 0) {
            if (this.spell == "zap") { amount *= 2; }
            var dmg = amount;
            this.damageShield(this.shield - amount < 0 ? this.shield : amount);
            if (source.buffs.indexOf(buffs["retaliate"]) !== -1) endresult = "\n" + source.buffs.indexOf(buffs["retaliate"]).effect(source, target);
            amount -= dmg;
            result += `-${dmg} SLD `;
        }
        if (this.hp <= amount) {
            this.setHP(0);
            result += `Died`;
        } else {
            this.setHP(this.hp - amount);
            result += `-${amount} HP`;
        }
        result += ` -> ${this.hp} HP, ${this.shield} SLD)`;
        if (source.buffs.indexOf(buffs["stupid"]) !== -1) result += "\n" + source.buffs[source.buffs.indexOf(buffs["stupid"])].effect(source) + "\n" + endresult;
        return result;
    }

    //#region Misc Funcions

    addStrength(amount) {
       this.strength += amount;
    }

    addFocus(amount) {
        this.focus += amount;
    }

    addShield(amount) {
        this.shield += amount;
    }

    damageShield(amount) {
        this.shield -= amount;
    }

    setDead() {
        this.dead = true;
    }

    setHP(amount) {
        this.hp = amount;
    }

    heal(amount) {
        if (this.hp + amount > this._default.hp)
        this.hp = this._default.hp;
        else
        this.hp += amount;
    }

    deduceAP(amount) {
        this.ap -= amount;
    }

    update(enemies, player) {
        var result = "";
        if (this._default.mana > 0) this.mana++;
        this.ap = this._default.ap;
        this.addShield(this.focus);
        this.buffs.forEach((ele) => {
            if (ele.name == "daze") result += "\n" + ele.effect(this);
            ele.tick--;
            if (ele.tick == 0) {
                helper.remove(this.buffs, ele);
                result += `\nEffect [${ele.name}] has worn off on ${this.name}.`;
            }
        });
        return result;
    }

    format() {
        return !this.dead ? `${this.name} [HP:${this.hp}${this.shield !== 0 ? `(+${this.shield} SLD)` : ''}, AP:${this.ap}${this.mana !== 0 ? `, MAN: ${this.mana}` : ''}${this.strength !== 0 ? `, STR: ${this.strength}` : ''}${this.focus !== 0 ? `, FCS: ${this.focus}` : ''}] ${this.buffs.length == 0 ? '' : `[${this.buffs.map((ele) => ele.name.charAt(0).toUpperCase() + ele.name.slice(1)).join(', ')}]`}` :
        `${this.name} [Dead]`;
    }

    //#endregion
}