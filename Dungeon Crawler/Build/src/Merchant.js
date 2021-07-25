maingame.merchant = function (game) { }

maingame.merchant.prototype = {
    preload: function () {
        this.load.image('background', '../Assets/General assets/merchant/ripleys.png')

        // Load all the item assets for that particular level
        // item1, item2... item20
        //this.load.image('item1', scr...) .. this.load.image('item3', scr...)
    },

    create: function () {
        var bck = game.add.image(0, 0, 'background');
        bck.scale.set(2)

        // Add the 3 items to the level (these should be buttons)
        /*
        foreach(item in GeneratedItems)
            game.add.button(cst + x, cst, 'item' + (1, 2, 3), function(){
                if (cost of item <= player.curreny){
                    add item to player backpack 
                    subtract currency from player
                }
            })
        */
    },

    update: function () {
        // Check when player presses esc and leave state...
        
    },

    render: function () {
    }
}