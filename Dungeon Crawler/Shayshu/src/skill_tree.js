skill_modifier = {
    SpeedUp: function () {
        if (player.getCurrentLevel() - player.used_skill_points > 0) {
            player.used_skill_points += 1
            game.playerUsedSkillPoints += 1
            game.playerSpeed += 20
            console.log("Speed up", game.playerSpeed)
        }
        else {
            console.log("Not enough skill points!")
        }
    },

    DamageUp: function () {
        if (player.getCurrentLevel() - player.used_skill_points > 0) {
            player.used_skill_points += 1
            game.playerUsedSkillPoints += 1
            game.playerDamage += 1
            console.log("Damage up", game.playerDamage)
        }
        else {
            console.log("Not enough skill points!")
        }
    },

    AttackSpeedUp: function () {
        if (player.getCurrentLevel() - player.used_skill_points > 0) {
            player.used_skill_points += 1
            if (game.playerAttackSpeed > 0.05) {
                game.playerUsedSkillPoints += 1
                game.playerAttackSpeed -= 0.05
                console.log("Attack speed up", game.playerAttackSpeed)
            }
        }
        else {
            console.log("Not enough skill points!")
        }
    }
}

class SkillTree {
    constructor(value, modifier) {
        this.skill = value
        this.next = []
        this.modifier = modifier
    }
}

const root = new SkillTree('Root', function nothing(){ return null;})
const speed = new SkillTree('Speed', skill_modifier['SpeedUp'])
const dmg = new SkillTree('Damage', skill_modifier['DamageUp'])
const atks = new SkillTree('Attack Speed', skill_modifier['AttackSpeedUp'])


root.next.push(speed, dmg, atks)

maingame.skill_tree = function (game) { }

maingame.skill_tree.prototype = {
    preload: function () {
        this.load.image('dmg', '../Assets/General assets/Skill Tree/dmg.png')
        this.load.image('speed', '../Assets/General assets/Skill Tree/speed.png')
        this.load.image('atks', '../Assets/General assets/Skill Tree/atks.png')
        this.load.image('root', '../Assets/General assets/Skill Tree/root.png')
        this.load.image('background', '../Assets/General assets/Skill Tree/background.png')
    },

    create: function () {

        var tree_root = new Phaser.Circle(400, 50, 500);
        var p = new Phaser.Point()

        this.add.image(0, 0, 'background')

        const center = this.add.button(tree_root.x - 16, tree_root.y, 'root', function () { console.log("Clicked") })

        var skill_img = ['speed','dmg', 'atks']
        var skills = ['SpeedUp', 'AttackSpeedUp', 'DamageUp']
        var skill_heights = [100, 150, 200, 250]
        var skill_xpos = [[100, 200, 300]]

        
        treeTraversal(root, skill_heights, skill_xpos, skill_img)

    },

    update: function () {
        if (cursors.esc.downDuration(100)) {
            game.state.start("Main", true, false)
        }
    }
}

function treeTraversal(root, heights, xpos ,icons) {
    var i = 0
    while (i != root.next.length) {
        
        game.add.button(xpos[0][i], heights[0], icons[i], root.next[i].modifier)

        treeTraversal(root.next[i], heights.slice(1), xpos.slice(1), icons.slice(1))
        i++
    }
    return
}