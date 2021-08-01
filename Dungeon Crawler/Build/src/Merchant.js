maingame.merchant = function (game) { }

maingame.merchant.prototype = {
    preload: function () {
        this.load.image('background', '../Assets/General assets/Merchant/ripleys.png')

        // Load all the item assets for that particular level
        // item1, item2... item20
        this.load.image('item1','../Assets/General assets/arrow_left.png');
        this.load.image('item2','../Assets/General assets/arrow_right.png');
        this.load.image('item3','../Assets/General assets/ammo.png');
        
    },

    create: function () {
        var bck = game.add.image(0, 0, 'background');
        bck.scale.set(2)
    
        // Add the 3 items to the level (these should be buttons)

        var x = 84;
        
        foreach(item in GeneratedItems){
            game.add.button(x , 44, 'item' + (1, 2, 3), function(){
                // if (cost of item <= player.currency){
                //     add item to player backpack 
                //     subtract currency from player
                // }
            })
            x += 85;
        }
            
    
    },

    update: function () {
        // Check when player presses esc and leave state...
        
    },

    render: function () {
    }
}