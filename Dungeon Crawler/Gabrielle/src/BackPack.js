var cursors
const MAX_BACKPACK_SIZE = 16
maingame.BackPack = function (game) {

};

maingame.BackPack.prototype = {
        preload: function () {

        },

        create: function () {
                cursors = game.input.keyboard.createCursorKeys()
                cursors.bckpck = game.input.keyboard.addKey(Phaser.Keyboard.B)
        },

        update: function () {
                if (cursors.bckpck.isDown) {
                        game.state.start("Game");
                }

        }

}