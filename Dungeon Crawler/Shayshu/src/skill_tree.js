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
    constructor(value, modifier, img, x, y) {
        this.skill = value
        this.next = []
        this.modifier = modifier
        this.img = img
        this.x = x
        this.y = y
    }
}

const root = new SkillTree('Root', function nothing() { return null; }, 'root', 400 - 16, 150)
const speed = new SkillTree('Speed', skill_modifier['SpeedUp'], 'speed', 150, 200)
const dmg = new SkillTree('Damage', skill_modifier['DamageUp'], 'dmg', 384, 200)
const atks = new SkillTree('Attack Speed', skill_modifier['AttackSpeedUp'], 'atks', 618, 200)

var lines = []
root.next.push(speed, dmg, atks)

maingame.skill_tree = function (game) { }

maingame.skill_tree.prototype = {
    preload: function () {
        this.load.image('dmg', '../Assets/General assets/Skill Tree/dmg.png')
        this.load.image('speed', '../Assets/General assets/Skill Tree/speed.png')
        this.load.image('atks', '../Assets/General assets/Skill Tree/atks.png')
        this.load.image('root', '../Assets/General assets/Skill Tree/root.png')
        this.load.image('background', '../Assets/General assets/Skill Tree/background_2.png')
    },

    create: function () {

        var tree_root = new Phaser.Circle(400, 50, 500);
        var p = new Phaser.Point()

        this.add.image(0, 0, 'background')
        var root_center = tree_root.x - 16

        const center = this.add.button(400 - 16, 150, 'root', function () { console.log("Clicked") })

        var skill_img = ['speed', 'dmg', 'atks']
        var skills = ['SpeedUp', 'AttackSpeedUp', 'DamageUp']
        var skill_heights = [150, 250, 350, 450]
        var skill_xpos = [[root_center - 234, root_center, root_center + 234]]



        treeTraversal(root, skill_heights, skill_xpos, skill_img)
        line1 = new Phaser.Line(100, 200, 300, 400);

    },

    update: function () {
        if (cursors.esc.downDuration(100)) {
            game.state.start("Main", true, false)
        }
    },

    render: function () {

        for(var i = 0; i < lines.length; i++){
            game.debug.geom(lines[i]);
        }


    }
}

function treeTraversal(root) {
    var i = 0
    while (i != root.next.length) {

        game.add.button(root.next[i].x, root.next[i].y, root.next[i].img, root.next[i].modifier)
        const new_line  = new Phaser.Line(root.x, root.y, root.next[i].x, root.next[i].y)
        lines.push(new_line)


        treeTraversal(root.next[i])
        i++
    }
    return
}