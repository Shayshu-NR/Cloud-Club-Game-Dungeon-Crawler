var cursors;

maingame.startmenu = function (game) { }

maingame.startmenu.prototype = {
    preload: function () {
        game.load.image('StartMenu', '../Assets/General assets/start-menu.png')
    },

    create: function () {
        game.add.image(0, 0, 'StartMenu')
        //game.add.button(x, y, image, function(){})
    },

    update: function () {

        if (game.input.mousePointer.x > 300 && game.input.mousePointer.x < 550) {
            if (game.input.mousePointer.y > 200 && game.input.mousePointer.y < 250) {
                if(game.input.activePointer.isDown){
                    game.state.start("Main")
                }
            }
        }

        if (game.input.mousePointer.x > 400 && game.input.mousePointer.x < 550) {
            if (game.input.mousePointer.y > 300 && game.input.mousePointer.y < 350) {
                if(game.input.activePointer.isDown){
                    window.location.href = 'https://cloudclub.ca/';
                }
            }
        }
    },

    render: function () {
    }
}

//https://cloudclub.ca/