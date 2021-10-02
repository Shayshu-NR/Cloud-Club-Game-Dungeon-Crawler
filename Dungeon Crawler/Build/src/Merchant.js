var merchant_items;

maingame.merchant = function (game) { }

maingame.merchant.prototype = {
    preload: function () {
        this.load.image('background', '../Assets/General assets/Merchant/ripleys.png')

        // Load all the item assets for that particular level
        // item1, item2... item20
        this.load.image('item1', '../Assets/General assets/arrow_left.png');
        this.load.image('item2', '../Assets/General assets/arrow_right.png');
        this.load.image('item3', '../Assets/General assets/ammo.png');
        this.load.image('button', '../Assets/General assets/Backbtn.png');
        this.load.image('popup', '../Assets/General assets/Concrete.png');

        this.load.atlas(
            "potion_set",
            "../Assets/General assets/Potions/potions.png",
            "../Assets/General assets/Potions/potions.json"
        )

        this.load.text('items', "./src/Items/merchant_items.json")
    },

    create: function () {
        merchant_items = JSON.parse(game.cache.getText('items'));
        var bck = game.add.image(0, 0, 'background');
        bck.scale.set(2)

        // Add back button, see Backpack.js
        button = game.add.button(30, 500, 'button', returnToGame, this, 2, 1, 0);
        button.scale.setTo(2, 2)

        function returnToGame() {
            game.state.start("Game");
        } //not sure if this separate function is necessary

        // Add currency UI see game.js line 667
        var coinIcon = game.add.image(8, 25, 'currency-atlas', 'currency_1.png');
        coinIcon.fixedToCamera = true;
        game.moneyText = game.add.text(56, 26, String(player.money));
        game.moneyText.fill = "#FFFFFF";
        game.moneyText.fixedToCamera = true;

        // Add the 3 items to the level (these should be buttons)

        var x = 2 * 88;
        var GeneratedItems = ['item1', 'item2', 'item3'];

        GeneratedItems.forEach(function (key, value) {
            console.log(key, value)
            game.add.button(167 + x * (value) - (game.cache.getImage(key).width / 2), 2 * 43 - (game.cache.getImage(key).height / 2), key, function () {

                if (player.money < item.price) {

                    console.log("Player does not have enough money")
                    var popup = game.add.button(240, 140, 'popup', function () {
                        game.state.start("Merchant");
                    })
                    popup.scale.set(10, 10);

                }
                else {
                    player.money -= item.price;
                    item.kill();
                }

            })
        });

        function actionOnClick() {
            game.player_attributes = {
                backpack: backpack,
                actives: active_items,
                current: current_item
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

