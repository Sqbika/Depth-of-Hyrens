const entity = require('./game/entity');
const actions = require('./game/spells');

module.exports = class Game {
    constructor() {
        this.enemies = [new entity("warrior"), 
                        new entity("warrior"), 
                        new entity("mage"), 
                        new entity("mage"), 
                        Math.random() > 0.5 ? 
                            new entity("warrior") : 
                            new entity("mage")];
        this.player = new entity("player");

        this.commands =  {
            status: () => { return this.player.format() + "\nvs\n" + this.enemies.map(ele => ele.format()).join('\n')},
            help: (arg) => {
                console.log(arg); 
                if (arg == '') {
                    return "Avaliable commands: status, help, " + Object.keys(actions).join(', ');
                }
                return actions[arg.toLowerCase()].text; 
            }
        }
    }

    parse(text) {
        if (this.player.dead) return "You are dead. Please refresh the page to play.";
        var command = text.split(' ')[0].toLowerCase();
        var arg = text.split(' ').slice(1).join(' ');
        if (this.commands[command] !== undefined) return this.commands[command](arg);
        return this.action(command, arg);
    }

    action(command, arg) {
        var result = "";
        var action = actions[command];
        if (action == undefined) return "Command not found.";
        if (this.player.hasEnoughAP(action.apcost)) {
            if (action.focus == "target")
            {
                var target = this.findEnemy(arg);
                if (target == undefined) {
                    return "Enemy not found.";
                } else {
                    result += action.effect(this.player, target);
                    this.player.deduceAP(action.apcost);
                    result += this.checkdead();                    
                }
            } else {
                result += action.effect(this.player);
            }
            if (this.player.ap == 0) {
                result += "\nEnemies turn.";
                result += this.update();
                result += this.checkdead();
                result += "\nYour turn.";
                this.player.ap = this.player._default.ap;
            } else {
                result += `\nYou have ${this.player.ap} AP left.`;
            }
            return result;
        } else return "Not enough AP for this action.";
    }

    checkdead() {
        var result = "";
        this.enemies.forEach((ele) => {
            if (ele.hp <= 0) {
                ele.dead = true;
                result += `${ele.name} has died.`
            }
        });
        if (this.player.hp <= 0) {
            this.player.dead = true;
            return "You are dead. Please refresh the page to play again.";
        }
        return result;
    }

    findEnemy(name) {
        return this.enemies.find((ele) => ele.name.toLowerCase() == name.toLowerCase());
    }

    update() {
        var result = "";
        this.enemies.forEach((ele) => {
            result += ele.update() + "\n";
        });
        return result;
    }
}