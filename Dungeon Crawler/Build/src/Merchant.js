var merchant_items = new MerchantItems("merchant_items.json")

maingame.merchant = function (game) { };

maingame.merchant.prototype = {
  preload: function () {
    this.load.image(
      "background",
      "../Assets/General assets/Merchant/ripleys.png"
    );

    // Load all the item assets for that particular level
    // item1, item2... item20
    this.load.image("item1", "../Assets/General assets/arrow_left.png");
    this.load.image("item2", "../Assets/General assets/arrow_right.png");
    this.load.image("item3", "../Assets/General assets/ammo.png");
    this.load.image("button", "../Assets/General assets/Backbtn.png");
    this.load.image("popup", "../Assets/General assets/Concrete.png");

    this.load.atlas(
      "potion_set",
      "../Assets/General assets/Potions/potions.png",
      "../Assets/General assets/Potions/potions.json"
    );

    this.load.text("items", "./src/Items/merchant_items.json");
  },

  create: function () {
    //merchant_items = JSON.parse(game.cache.getText("items"));

    var bck = game.add.image(0, 0, "background");
    bck.scale.set(2);

    // Add back button, see Backpack.js
    button = game.add.button(30, 500, "button", returnToGame, this, 2, 1, 0);
    button.scale.setTo(2, 2);

    function returnToGame() {
      game.state.start("Game");
    } //not sure if this separate function is necessary

    // Add currency UI see game.js line 667
    var coinIcon = game.add.image(8, 25, "currency-atlas", "currency_1.png");
    coinIcon.fixedToCamera = true;
    game.moneyText = game.add.text(56, 26, String(player.money));
    game.moneyText.fill = "#FFFFFF";
    game.moneyText.fixedToCamera = true;

    // Add the 3 items to the level (these should be buttons)
    var x = 2 * 88;
    var GeneratedItems = merchant_items.genItems;
    game.merchantItems = []

    GeneratedItems.forEach(function (key, value) {

      var priceText = game.add.text(
        150 + x * value - game.cache.getImage(key.atlas).width / (2 * key.atlaswidth), 
        2 * 34 - game.cache.getImage(key.atlas).height / (2 * key.atlasheight), 
        String(key.price) + " Coins", 
        {
          font: "bold 10pt Dungeon Crawler",
          fill: "white",
        });
      
      var contextData = {
        "item" : key,
        "pricetext" : priceText,
        "item_index" : value
      }

      var newItem = game.add.button(
        167 + x * value - game.cache.getImage(key.atlas).width / (2 * key.atlaswidth),
        2 * 43 - game.cache.getImage(key.atlas).height / (2 * key.atlasheight),
        key.atlas,
        function () {
          var item = this.item

          if (player.money < item.price) {
            console.log("Player does not have enough money");
            var style = {
              font: "bold 15pt Dungeon Crawler",
              fill: "red",
            };

            var text = game.add.text(10, 0, "Not enough money", style);

            game.time.events.add(
              2000,
              function (arr) {
                game.add
                  .tween(arr[0])
                  .to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
              },
              this,
              [text]
            );
          } else {
            player.money -= item.price;
            game.merchantItems[this.item_index].kill();
            this.pricetext.kill();
            player.putBackpack(this.item)
            game.moneyText.text = player.money;
            console.log("Bought!")
          }
        },
        contextData,
        key.src,
        key.src,
        key.src,
        key.src
      );

      game.merchantItems.push(newItem)
    })

    function actionOnClick() {
      game.player_attributes = {
        backpack: backpack,
        actives: active_items,
        current: current_item,
      };

      game.playerExp = game.playerExp;
      game.current_time = timeLimit;
      game.state.start("Game");
    }
  },

  update: function () {
    // Check when player presses esc and leave state...
  },

  render: function () { },
};

function getItemsToDisplay(itemList) {
  var weights = [];
  itemList.forEach(x => weights.push(x.chance));

  var generatedItems = [];

  [1, 2, 3].forEach(x => generatedItems.push(weighted_random(itemList, weights)));
  return generatedItems;
}

function weighted_random(items, weights) {
  var i;

  for (i = 0; i < weights.length; i++) weights[i] += weights[i - 1] || 0;

  var random = Math.random() * weights[weights.length - 1];

  for (i = 0; i < weights.length; i++) if (weights[i] > random) break;

  return items[i];
}