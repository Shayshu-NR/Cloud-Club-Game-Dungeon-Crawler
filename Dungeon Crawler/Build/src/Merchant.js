maingame.merchant = function (game) { }

maingame.merchant.prototype = {
    preload: function () {
        this.load.image('background', '../Assets/General assets/merchant/ripleys.png')
    },

    create: function () {
        var bck = game.add.image(0, 0, 'background');
        bck.scale.set(2)
    },

    update: function () {

        
    },

    render: function () {
    }
}