var counter = 0;
var text;

maingame.endscreen = function (game) { }

maingame.endscreen.prototype = {
    preload: function () {
        this.load.image('endscreen', '../Assets/General assets/win-screen.png');
    },

    create: function () {
        game.add.image(0, 0, 'endscreen');
    
        this.position = new Phaser.Point();
        text = game.add.text(250, 16, '', { fill: '#ffffff' });
    },

    update: function () {
        listener()

        if (game.input.mousePointer.x > 296 && game.input.mousePointer.x < 550) {
            if (game.input.mousePointer.y > 311 && game.input.mousePointer.y < 346) {
                if (game.input.activePointer.isDown) {
                    location.reload()
                }
            }
        }
    },

    render: function () {
    }
}

function listener() {
    counter++;
    text.text = game.input.mousePointer.x + "/" + game.input.mousePointer.y;
}

/**
 * 
 * x: 296 - 550
 * y: 346 - 311
 */