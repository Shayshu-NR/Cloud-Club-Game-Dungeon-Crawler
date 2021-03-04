skill_modifier = {
    SpeedUp: function (node) {
        if (player.getCurrentLevel() - player.used_skill_points > 0) {
            player.used_skill_points += 1
            game.playerUsedSkillPoints += 1
            game.playerSpeed += 20
            console.log("Speed up", game.playerSpeed)
        }
        else {
            console.log("Not enough skill points!")
        }
        console.log(test)
    },

    DamageUp: function (node) {
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

    AttackSpeedUp: function (node) {
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
    },

    CritUp: function(node){
        if (player.getCurrentLevel() - player.used_skill_points > 0) {
            player.used_skill_points += 1
            game.playerUsedSkillPoints += 1
            game.playerCritical += 0.1
            console.log("Cirtical chance up", game.playerCritical)
        }
        else {
            console.log("Not enough skill points!")
        }
    }, 

    HealUp: function(node){
        if (player.getCurrentLevel() - player.used_skill_points > 0) {
            player.used_skill_points += 1
            game.playerUsedSkillPoints += 1
            game.playerHealth += 1
            console.log("Health up", game.playerHealth)
        }
        else {
            console.log("Not enough skill points!")
        }
    }
}

class SkillTree {
    constructor(value, modifier, img, x, y) {
        this.skill = value
        this.next = []
        this.modifier = modifier
        this.img = img
        this.x = x
        this.y = y
        this.line
    }
}

const root = new SkillTree('Root', function nothing() { return null; }, 'root', 384, 100)
const speed = new SkillTree('Speed', skill_modifier['SpeedUp'], 'speed', 150, 200)
const dmg = new SkillTree('Damage', skill_modifier['DamageUp'], 'dmg', 384, 200)
const atks = new SkillTree('Attack Speed', skill_modifier['AttackSpeedUp'], 'atks', 618, 200)
const crit = new SkillTree('Crit', skill_modifier['CritUp'], 'crit', 150 - 117, 300)
const heal = new SkillTree('Heal', skill_modifier['HealUp'], 'heal', 150 + 117, 300)
const test = new SkillTree('Damage', skill_modifier['DamageUp'], 'dmg', 384 , 400)


speed.next.push(crit, heal)
dmg.next.push(test)
root.next.push(speed, dmg, atks)

//----------- Variables ----------
var lines = []
var pairs = []
var colors = []
var graphics

maingame.skill_tree = function (game) { }

maingame.skill_tree.prototype = {
    preload: function () {
        this.load.image('dmg', '../Assets/General assets/Skill Tree/dmg.png')
        this.load.image('speed', '../Assets/General assets/Skill Tree/speed.png')
        this.load.image('atks', '../Assets/General assets/Skill Tree/atks.png')
        this.load.image('crit', '../Assets/General assets/Skill Tree/crit.png')
        this.load.image('heal', '../Assets/General assets/Skill Tree/heal.png')
        this.load.image('root', '../Assets/General assets/Skill Tree/root.png')
        this.load.image('background', '../Assets/General assets/Skill Tree/background_2.png')

    },

    create: function () {

        var tree_root = new Phaser.Circle(400, 50, 500);
        var p = new Phaser.Point()

        this.add.image(0, 0, 'background')
        var root_center = tree_root.x - 16

        const center = this.add.button(384 - 16, 100 - 16, 'root')
        

        var skill_img = ['speed', 'dmg', 'atks']
        var skills = ['SpeedUp', 'AttackSpeedUp', 'DamageUp']
        var skill_heights = [150, 250, 350, 450]
        var skill_xpos = [[root_center - 234, root_center, root_center + 234]]

        graphics = game.add.graphics(game.world.centerX, game.world.centerY)
        graphics.lineStyle(3, 0xff0000)

        treeTraversal(root, graphics, center)

        window.graphics = graphics


    },

    update: function () {

        if (cursors.esc.downDuration(100)) {
            game.state.start("Main", true, false)
        }

    },

    render: function () {
    }
}

function treeTraversal(root, graphics, btn_root) {
    var i = 0
    while (i != root.next.length) {

        const new_line  = new Phaser.Line(root.x, root.y, root.next[i].x, root.next[i].y)

        game.debug.geom(new_line, 'rgb(255, 255, 255)')
        root.next[i].line = new_line
        lines.push(new_line)
        
        const new_btn = game.add.button(root.next[i].x - 16, root.next[i].y - 16, root.next[i].img, root.next[i].modifier)
        new_btn.root = root.next[i]

        treeTraversal(root.next[i], graphics, new_btn)
        i++
    }
    return
}