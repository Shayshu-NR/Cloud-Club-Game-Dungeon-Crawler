//----------- Variables ----------
var lines = []
var pairs = []
var graphics

maingame.skill_tree = function (game) { }

maingame.skill_tree.prototype = {
    preload: function () {
        this.load.image('dmg', '../Assets/General assets/Skill Tree/dmg_dylan.png')
        this.load.image('speed', '../Assets/General assets/Skill Tree/speed_yixin.png')
        this.load.image('atks', '../Assets/General assets/Skill Tree/damage speed.png')
        this.load.image('crit', '../Assets/General assets/Skill Tree/crit_dylan.png')
        this.load.image('heal', '../Assets/General assets/Skill Tree/heal_yixin.png')
        this.load.image('root', '../Assets/General assets/Skill Tree/root.png')
        this.load.image('luck', '../Assets/General assets/Skill Tree/luck.png')
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
        lines = []

        treeTraversal(root, graphics, center)

        window.graphics = graphics

        //-------------------- Speed run timer --------------------
        timeLimit = game.current_time
        var minutes = Math.floor(timeLimit / 6000);
        var seconds = Math.floor((timeLimit - (minutes * 6000)) / 100);
        var miliseconds = timeLimit - (seconds / 100) - (minutes * 6000);
        var timeString = addZeros(minutes) + ":" + addZeros(seconds) + "." + addZeros(miliseconds);
        this.timeText = game.add.text(650, 20, timeString)
        this.timeText.fill = "#FFFFFF"
        this.timeText.fixedToCamera = true;
        this.timer = game.time.events.loop(10, tick, this)

    },

    update: function () {

        if (cursors.esc.downDuration(100)) {
            game.current_time = timeLimit
            game.state.start("Main", true, false)
        }

        for (var i = 0; i < lines.length; i++) {
            game.debug.geom(lines[i], colors[i])
        }
    },

    render: function () {
    }
}

function treeTraversal(root, graphics, btn_root) {
    var i = 0
    while (i != root.next.length) {

        const new_line = new Phaser.Line(root.x, root.y + 20, root.next[i].x, root.next[i].y - 20)

        game.debug.geom(new_line, 'rgb(255, 255, 255)')
        root.next[i].line = new_line
        lines.push(new_line)

        if (root.next[i].index == null) {
            root.next[i].index = lines.length - 1
            colors.push('rgb(255, 255, 255)')
        }


        const new_btn = game.add.button(root.next[i].x - 16, root.next[i].y - 16, root.next[i].img, root.next[i].modifier)
        new_btn.root = root.next[i]
        new_btn.root.btn = new_btn

        treeTraversal(root.next[i], graphics, new_btn)
        i++
    }
    return
}