module.exports = {
    retaliate: {
        name: "retaliate",
        event: "shieldDamage",
        tick: 1,
        effect: (source, target, amount) => {
            source.damage(amount);
        }
    },
    stupid: {
        name: "stupid",
        event: "attack",
        tick: -1, //We don't want to remove it
        effect: (source, target, amount) => {
            source.buffs += this.daze;
        }
    },
    daze: {
        name: "daze",
        event: "turn",
        tick: 1,
        effect: (source, target, amount) => {
            source.ap -= 1;
        }
    }
}