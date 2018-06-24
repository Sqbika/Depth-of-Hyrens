module.exports = {
    default: {
        focus: "",
        apcost: 1,
        manacost: 0,
        effect: (source, target) => {}
    },
    hit: {
        focus: "target",
        apcost: 1,
        manacost: 0,
        effect: (source, target) => {
            return `${source.name} used Hit on ${target.name}. ${target.damage(2 + source.strength, "hit", source, target)}`
        },
        text: "Hit (1 AP) - Deal (2 + STR) Damage to an enemy."
    }, 
    lunge: {
        focus: "target",
        apcost: 2,
        manacost: 0,
        effect: (source, target) => {
            return `${source.name} used Lunge on ${target.name}. ${target.damage(6 + source.strength, "lunge", source, target)}`
        },
        text: "Lunge (2 AP) - Deal (6 + STR) Damage to an enemy."
    },
    zap: {
        focus: "target",
        apcost: 1,
        manacost: 4,
        effect: (source, target) => {
            return `${source.name} used Zap on ${target.name}. ${target.damage(2 + source.strength, "zap", source, target)}`
        },
        text: "Zap (1 AP + 4 MAN) - Deal 2 Damage to an enemy. Deals double damage towards SLD."
    },
    buff: {
        focus: "target",
        apcost: 1,
        manacost: 3,
        effect: (source, target) => {
            target.addStrength(1);
            return `${source.name} buffed ${target.name}. (+1 STR -> ${target.strength} STR)`
        },
        text: "Buff (1 AP + 3 MAN) - Give a target 1 STR."
    },
    heal: {
        focus: "target",
        apcost: 1,
        manacost: 2,
        effect: (source, target) => {
            target.heal(3)
            return `${source.name} healed ${target.name} (+3 HP -> ${target.hp} HP).`
        },
        text: "Heal (1 AP + 2 MAN) - Give a target 3 HP."
    },
    focus: {
        focus: "self",
        apcost: 2,
        manacost: 0,
        effect: (source, target) => {
            source.addFocus(1);
            return `${source.name} generated one focus. (+1 FCS -> ${source.focus})`
        },
        text: "Focus (2 AP) - Give yourself a FCS."
    },
    confuse: {
        focus: "self",
        apcost: 1,
        manacost: 0,
        effect: (source) => {return `${source.name} used confuse. It's super effective!`},
        text: "Confuse (1 AP) - Tactical no action.",
    },
    shield: {
        focus: "self",
        apcost: 1,
        manacost: 0,
        effect: (source, target) => {
            source.addShield(4);
            return `${source.name} shielded up. (+4 SLD -> ${source.shield} SLD)`
        },
        text: "Shield (1 AP) - Give yourself 4 SLD"
    },
    slam: {
        focus: "target",
        apcost: 1,
        manacost: 0,
        effect: (source, target) => {
            var amount = source.shield;
            source.shield = 0;
            return `${source.name} used Slam on ${target.name} using ${amount} SLD. ${target.damage(amount, "slam", source, target)}`
        },
        text: "Slam (1 AP) - Remove all SLD and deal the removed amount of SLD as damage to an enemy."
    },
    bolster: {
        focus: "self",
        apcost: 2,
        manacost: 0,
        effect: (source, target) => {
            var amount = source.focus;
            source.focus = 0;
            source.addShield(amount*3);
            source.buffs += "retaliate";
            return `${source.name} used bolster. (+${amount*3} SLD, -${amount} FCS, +[Retaliate] -> ${source.shield} SLD, 0 FCS)`;
        },
        text: "Bolster (2 AP) - Remove all FCS. Gain 3*removed FCS amount. Gain Retaliate until the next turn."
    },
    consume: {
        focus: "self",
        apcost: 3,
        manacost: 0,
        effect: (source, target) => {
            var amount = source.focus;
            source.focus = 0;
            source.heal(amount*2);
            source.addStrength(amount);
            return `${source.name} used consume. (+${amount*2} HP, -${amount} FCS, +${amount} STR -> ${source.hp} HP, 0 FCS, ${source.strength} STR)`;
        },
        text: "Consume (3 AP) - Remove all FCS, gain two times of the removed FCS as HP. Gain STR equal to the amount of removed FCS."
    }
}