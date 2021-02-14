var cursors
maingame.BackPack = function(game){

};

maingame.BackPack.prototype = {
        preload: function() {
    
        },
    
        create: function() {
                cursors = game.input.keyboard.createCursorKeys()
                cursors.map = game.input.keyboard.addKey(Phaser.Keyboard.M)
        },
    
        update: function() {
                if(cursors.map.isDown){
                        game.state.start("Game");
                    }

        }
    
}