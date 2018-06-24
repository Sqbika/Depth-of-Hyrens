module.exports = {
    retaliate: {
        name: "retaliate",
        event: "shieldDamage",
        tick: 1,
        effect: (source, target, amount) => {
            return `${source.name} attacked ${target.name} while he had [retaliate]! ${source.damage(amount)} -> ${source.hp} HP, ${source.shield} SLD)`;
        }
    },
    stupid: {
        name: "stupid",
        event: "attack",
        tick: -1, //We don't want to remove it
        effect: (source, target, amount) => {
            source.buffs = source.buffs.concat(module.exports['daze']);
            return `${source.name} is stupid. He is now [dazed].`;
        }
    },
    daze: {
        name: "daze",
        event: "turn",
        tick: 1,
        effect: (source, target, amount) => {
            source.ap -= 1;
            return `${source.name} got his [daze] penalty applied. (-1 AP -> ${source.ap} AP)`
        }
    }
}