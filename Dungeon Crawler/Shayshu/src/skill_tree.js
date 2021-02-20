class SkillTree {
    constructor(value) {
        this.skill = value
        this.next = []
    }
}

const root = new SkillTree('Root')
const speed = new SkillTree('Speed')
const dmg = new SkillTree('Damage')
const atks = new SkillTree('Attack Speed')

skill_modifier = {
    SpeedUp: function () {
        if (player.getCurrentLevel() - player.used_skill_points > 0) {
            player.used_skill_points += 1
            game.playerUsedSkillPoints += 1
            game.playerSpeed += 20
            console.log("Speed up", game.playerSpeed)
        }
        else{
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
        else{
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
        else{
            console.log("Not enough skill points!")
        }
    }
}

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

        var tree_root = new Phaser.Circle(400, 300, 500);
        var p = new Phaser.Point()

        this.add.image(0, 0, 'background')

        //  And display our circle on the top
        var graphics = game.add.graphics(0, 0);
        graphics.lineStyle(1, 0xDC143C, 1);
        graphics.drawCircle(tree_root.x, tree_root.y, tree_root.diameter);

        const center = this.add.button(tree_root.x - 16, tree_root.y, 'root', function () { console.log("Clicked") })

        var skill_img = ['speed', 'atks', 'dmg']
        var skills = ['SpeedUp', 'AttackSpeedUp', 'DamageUp']

        for (var i = 0; i < 3; i++) {
            const leaf = this.add.button(400 - 16 - 250 * Math.cos((2 * i * Math.PI / 3) + Math.PI / 2),
                300 - 16 - 250 * Math.sin((2 * i * Math.PI / 3) + Math.PI / 2),
                skill_img[i],
                skill_modifier[skills[i]])

        }
    },

    update: function () {
        if (cursors.esc.downDuration(100)) {
            game.state.start("Main")
        }
    }
}