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

root.next.push(speed, dmg, atks)

maingame.skill_tree = function(game) {}

maingame.skill_tree.prototype = {
    preload: function() {
        this.load.image('dmg', '../Assets/General assets/Skill Tree/dmg.png')
        this.load.image('speed', '../Assets/General assets/Skill Tree/speed.png')
        this.load.image('atks', '../Assets/General assets/Skill Tree/atks.png')
        this.load.image('root', '../Assets/General assets/Skill Tree/root.png')
    },

    create: function() {


        var tree_root = new Phaser.Circle(400, 300, 500);
        var p = new Phaser.Point()

        //  And display our circle on the top
        var graphics = game.add.graphics(0, 0);
        graphics.lineStyle(1, 0x00ff00, 1);
        graphics.drawCircle(tree_root.x, tree_root.y, tree_root.diameter);


        const center = this.add.button(tree_root.x - 16, tree_root.y, 'root', function() { console.log("Clicked") })

        for (var i = 0; i < 3; i++) {
            tree_root.random(p)
            p.floor()

            const leaf = this.add.button(p.x, p.y, 'dmg', function() { console.log("Clicked") })
            const line = new Phaser.Line(tree_root.x, tree_root.y, p.x - 16, p.y)
            console.log(line.angle)
            graphics.drawLine
        }


    },

    update: function() {
        if (cursors.esc.downDuration(100)) {
            game.state.start("Main")
        }
    }
}