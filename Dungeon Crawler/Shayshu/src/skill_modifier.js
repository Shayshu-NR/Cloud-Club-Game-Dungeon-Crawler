skill_modifier = {
    SpeedUp: function (node) {
        if (player.getCurrentLevel() - player.used_skill_points > 0 && node.root.clickable) {
            player.used_skill_points += 1
            game.playerUsedSkillPoints += 1
            game.playerSpeed += 20

            // Change tree colors
            colors[node.root.index] = 'rgb(255, 0, 0)'

            // Make next layer accesible
            node.root.makeNextLayerClickable()

            // Make this layer not clickable...
            node.root.clickable = false

            console.log("Speed up", game.playerSpeed)
        }
        else if (!node.root.clickable) {
            console.log("Not acessible yet...")
        }
        else {
            console.log("Not enough skill points!")
            var style = {
                font: 'bold 15pt Dungeon Crawler',
                fill: 'red'
            }

            var text = game.add.text(10, 10, "Not enough skill points!", style)

            game.time.events.add(
                2000,
                function (arr) {
                    game.add.tween(arr[0]).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true)
                },
                this,
                [text]
            );
        }
    },

    DamageUp: function (node) {
        if (player.getCurrentLevel() - player.used_skill_points > 0 && node.root.clickable) {
            player.used_skill_points += 1
            game.playerUsedSkillPoints += 1
            game.playerDamage += 1
            // Change tree colors
            colors[node.root.index] = 'rgb(255, 0, 0)'

            // Make next layer accesible
            node.root.makeNextLayerClickable()

            // Make this layer not clickable...
            node.root.clickable = false
            console.log("Damage up", game.playerDamage)
        }
        else if (!node.root.clickable) {
            console.log("Not acessible yet...")
        }
        else {
            console.log("Not enough skill points!")
            var style = {
                font: 'bold 15pt Dungeon Crawler',
                fill: 'red'
            }

            var text = game.add.text(10, 10, "Not enough skill points!", style)

            game.time.events.add(
                2000,
                function (arr) {
                    game.add.tween(arr[0]).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true)
                },
                this,
                [text]
            );
        }
    },

    AttackSpeedUp: function (node) {
        if (player.getCurrentLevel() - player.used_skill_points > 0 && node.root.clickable) {
            player.used_skill_points += 1
            if (game.playerAttackSpeed > 0.05) {
                game.playerUsedSkillPoints += 1
                game.playerAttackSpeed -= 0.05
                // Change tree colors
                colors[node.root.index] = 'rgb(255, 0, 0)'

                // Make next layer accesible
                node.root.makeNextLayerClickable()

                // Make this layer not clickable...
                node.root.clickable = false
                console.log("Attack speed up", game.playerAttackSpeed)
            }
        }
        else if (!node.root.clickable) {
            console.log("Not acessible yet")
        }
        else {
            console.log("Not enough skill points!")
            var style = {
                font: 'bold 15pt Dungeon Crawler',
                fill: 'red'
            }

            var text = game.add.text(10, 10, "Not enough skill points!", style)

            game.time.events.add(
                2000,
                function (arr) {
                    game.add.tween(arr[0]).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true)
                },
                this,
                [text]
            );
        }
    },

    CritUp: function (node) {
        if (player.getCurrentLevel() - player.used_skill_points > 0 && node.root.clickable) {
            player.used_skill_points += 1
            game.playerUsedSkillPoints += 1
            game.playerCritical += 0.1
            // Change tree colors
            colors[node.root.index] = 'rgb(255, 0, 0)'

            // Make next layer accesible
            node.root.makeNextLayerClickable()

            // Make this layer not clickable...
            node.root.clickable = false
            console.log("Cirtical chance up", game.playerCritical)
        }
        else if (!node.root.clickable) {
            console.log("Not acessible yet...")
        }

        else {
            console.log("Not enough skill points!")
            var style = {
                font: 'bold 15pt Dungeon Crawler',
                fill: 'red'
            }

            var text = game.add.text(10, 10, "Not enough skill points!", style)

            game.time.events.add(
                2000,
                function (arr) {
                    game.add.tween(arr[0]).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true)
                },
                this,
                [text]
            );
        }

    },

    HealUp: function (node) {
        if (player.getCurrentLevel() - player.used_skill_points > 0 && node.root.clickable) {
            player.used_skill_points += 1
            game.playerUsedSkillPoints += 1
            game.playerHealth += 1
            // Change tree colors
            colors[node.root.index] = 'rgb(255, 0, 0)'

            // Make next layer accesible
            node.root.makeNextLayerClickable()

            // Make this layer not clickable...
            node.root.clickable = false
            console.log("Health up", game.playerHealth)
        }
        else if (!node.root.clickable) {
            console.log("Not acessible yet...")
        }
        else {
            console.log("Not enough skill points!")
            var style = {
                font: 'bold 15pt Dungeon Crawler',
                fill: 'red'
            }

            var text = game.add.text(10, 10, "Not enough skill points!", style)

            game.time.events.add(
                2000,
                function (arr) {
                    game.add.tween(arr[0]).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true)
                },
                this,
                [text]
            );
        }
    },

    LuckUp: function (node) {
        if (player.getCurrentLevel() - player.used_skill_points > 0 && node.root.clickable) {
            player.used_skill_points += 1
            game.playerUsedSkillPoints += 1
            game.playerLuck += 0.1
            // Change tree colors
            colors[node.root.index] = 'rgb(255, 0, 0)'

            // Make next layer accesible
            node.root.makeNextLayerClickable()

            // Make this layer not clickable...
            node.root.clickable = false
            console.log("Luck up", game.playerLuck)
        }
        else if (!node.root.clickable) {
            console.log("Not acessible yet...")
        }
        else {
            console.log("Not enough skill points!")
            var style = {
                font: 'bold 15pt Dungeon Crawler',
                fill: 'red'
            }

            var text = game.add.text(10, 10, "Not enough skill points!", style)

            game.time.events.add(
                2000,
                function (arr) {
                    game.add.tween(arr[0]).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true)
                },
                this,
                [text]
            );
        }
    }
}

class SkillTree {
    constructor(value, modifier, img, x, y, clickable = false) {
        this.skill = value
        this.next = []
        this.modifier = modifier
        this.img = img
        this.x = x
        this.y = y
        this.line
        this.clickable = clickable
        this.lineCol = 'rgb(255, 255, 255)'
    }

    makeNextLayerClickable() {
        for (var i = 0; i < this.next.length; i++) {
            this.next[i].clickable = true;
        }
    }
}

const root = new SkillTree('Root', function nothing() { return null; }, 'root', 384, 100, true)
const speed = new SkillTree('Speed', skill_modifier['SpeedUp'], 'speed', 150, 200, true)
const dmg = new SkillTree('Damage', skill_modifier['DamageUp'], 'dmg', 384, 200, true)
const atks = new SkillTree('Attack Speed', skill_modifier['AttackSpeedUp'], 'atks', 618, 200, true)
const crit = new SkillTree('Crit', skill_modifier['CritUp'], 'crit', 150 - 117, 300)
const heal = new SkillTree('Heal', skill_modifier['HealUp'], 'heal', 150 + 117, 300)
const luck = new SkillTree('Luck', skill_modifier['LuckUp'], 'luck', 384*2, 350)
const test = new SkillTree('Damage', skill_modifier['DamageUp'], 'dmg', 384, 400)

speed.next.push(crit, heal)
dmg.next.push(test)
root.next.push(speed, dmg, atks)
atks.next.push(luck)

var colors = []