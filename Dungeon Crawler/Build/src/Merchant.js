maingame.merchant = function (game) { }

maingame.merchant.prototype = {
    preload: function () {
        this.load.image('background', '../Assets/General assets/Merchant/ripleys.png')

        // Load all the item assets for that particular level
        // item1, item2... item20
        this.load.image('item1', '../Assets/General assets/arrow_left.png');
        this.load.image('item2', '../Assets/General assets/arrow_right.png');
        this.load.image('item3', '../Assets/General assets/ammo.png');

    },

    create: function () {
        var bck = game.add.image(0, 0, 'background');
        bck.scale.set(2)

        // Add back button, see Backpack.js
        // Add currency UI see game.js line 667

        // Add the 3 items to the level (these should be buttons)

        var x = 2*88;
        var GeneratedItems = ['item1', 'item2', 'item3'];

        GeneratedItems.forEach(function (key, value) {
            console.log(key, value)
            game.add.button( 167 + x * (value) - (game.cache.getImage(key).width / 2) , 2 * 43 - (game.cache.getImage(key).height / 2), key, function () {
                /* 
                if(player.money < item.price){
                    reject
                }
                else{
                    player.money -= item.price
                    item.kill()
                }
                */
            })
        });

        function actionOnClick() {
                game.player_attributes = {
                        backpack: backpack,
                        actives: active_items,
                        current: current_item,
                };
                game.current_time = timeLimit
                game.state.start("Game");
        }
    },

    update: function () {
        // Check when player presses esc and leave state...

    },

    render: function () {
    },

    
}

