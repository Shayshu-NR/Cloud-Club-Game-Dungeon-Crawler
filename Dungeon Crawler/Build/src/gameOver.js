maingame.gameOver = function (game) { }

maingame.gameOver.prototype = {
    preload: function () {
        this.load.image("retryBtn", "../Assets/General assets/RetryBtn.png");
        this.load.image("gameOverScreen", "../Assets/General assets/GameOver.png");
    },

    create: function () {
        let background =  game.add.image(0, 0, 'gameOverScreen');
        background.scale.set(2, 2);

        let button = game.add.button(350, 300, 'retryBtn', function(){
            game.state.start("StartMenu");
        });
    },

    update: function () {

    },

    render: function () {
    }
}