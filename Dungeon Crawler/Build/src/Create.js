function LoadEnemies(game, enemyJson, enemyMapping) {
  try {
    enemyJson.emeData.forEach(function (element, index) {
      var nmeInst;

      if (enemyMapping[element.Name] != "button" && !element.dead) {
        nmeInst = enemyMapping[element.Name].create(
          element.x,
          element.y,
          element.Atlas,
          element.Frame1
        );

        nmeInst.scale.set(element.Scale);

        nmeInst.health = element.Health;
        nmeInst.exp = element.Exp;
        nmeInst.coins = element.Coins;
        nmeInst.enableBody = true;
        nmeInst.Damage = element.Damage;
        nmeInst.immune = false;
        nmeInst.index = index;
        nmeInst.enemy = true;

        element.Animations.forEach(function (frameElement, index) {
          nmeInst.animations.add(
            frameElement.Name,
            Phaser.Animation.generateFrameNames(
              frameElement.Name + "-",
              frameElement.Start,
              frameElement.End,
              ".png"
            ),
            frameElement.FrameRate,
            true
          );
        });

        switch (element.Name) {
          case "pirate":
          case "shark":
            nmeInst.bounds = element.Extra.filter(
              (x) => Object.keys(x)[0] === "bounds"
            )[0].bounds;
            nmeInst.inBounds = function () {
              if (
                this.position.x > this.bounds.x1 &&
                this.position.x < this.bounds.x2
              ) {
                if (
                  this.position.y > this.bounds.y1 &&
                  this.position.y < this.bounds.y2
                ) {
                  return true;
                }
              }
              return false;
            };
            nmeInst.center = {
              x_cal: (nmeInst.bounds.x1 + nmeInst.bounds.x2) / 2,
              y_cal: (nmeInst.bounds.y1 + nmeInst.bounds.y2) / 2,
            };
            break;
          default:
            break;
        }

        enemyCount++;
      } else if (!element.dead) {
        var callbackFunction = element.Extra.filter(
          (x) => Object.keys(x)[0] === "callback"
        )[0].callback;

        var f = new Function(callbackFunction.arguments, callbackFunction.body);
        nmeInst = game.add.button(element.x, element.y, element.Frame1, f);
        nmeInst.scale.set(element.Scale, element.Scale);
      }
    });
  }
  catch {
    return;
  }

}

function CreateChests(game, BuildItems, statics, chestSkin = "chest", order = [0, 1, 2, 3, 4, 5, 6, 7]) {
  console.log("Create Chest: ", BuildItems)
  try {
    var itemChests = [];

    for (var i = 0; i < BuildItems.itemData.Items.length; i++) {
      var x = Number(BuildItems.itemData.Items[i].x);
      var y = Number(BuildItems.itemData.Items[i].y);
      var src = BuildItems.itemData.Items[i].src;
      var newChest;

      if (BuildItems.itemData.Items[i].chest.Opened) {
        newChest = statics.create(x, y, chestSkin, 7);
      } else {
        newChest = statics.create(x, y, chestSkin, 0);
      }

      newChest.animations.add(
        "open",
        [0, 1, 2, 3, 4, 5, 6, 7],
        10,
        false
      );
      newChest.animations.add(
        "close",
        [7, 6, 5, 4, 3, 2, 1, 0],
        10,
        false
      );

      game.physics.arcade.enable(newChest);
      newChest.body.immovable = true;
      newChest.enableBody = true;
      newChest.classPosition = i;
      newChest.item = BuildItems.itemData.Items[i].chest;
      newChest.collide = true;

      itemChests.push(newChest);
    }
    return itemChests;
  }
  catch (err) {
    console.log("Error: ", err, BuildItems)
    return [];
  }
}


function CreateDoors(door_json, door) {
  if (door_json == null) {
    return;
  }

  door_json.forEach(function (key, value) {
    var doorInstance = door.create(
      key.x + 16,
      key.y - 16,
      "door-atlas",
      key.name
    );
    doorInstance.state = key.state;
    doorInstance.body.immovable = true;
  });
}

function CreateCoins(levelCoins, coins) {

  try {
    levelCoins.itemData.forEach(function (key, value) {
      if (!key.collected) {
        var coinInstance = coins.create(
          key.x + 16,
          key.y - 16,
          "currency-atlas",
          "currency_1.png"
        );
        coinInstance.body.immovable = true;
        coinInstance.scale.set(0.65, 0.65);
        coinInstance.index = value;
        coinInstance.animations.add(
          "spin",
          Phaser.Animation.generateFrameNames("currency_", 1, 6, ".png"),
          10,
          true
        );
        coinInstance.animations.play("spin");
      }
    });
  }
  catch {
    return;
  }
}

function CreatePlayerAnimations(player) {
  player.animations.add(
    "walk_down",
    Phaser.Animation.generateFrameNames("walk_down_", 1, 7, ".png"),
    10,
    true
  );
  player.animations.add(
    "walk_up",
    Phaser.Animation.generateFrameNames("walk_up_", 1, 7, ".png"),
    10,
    true
  );
  player.animations.add(
    "walk_right",
    Phaser.Animation.generateFrameNames("walk_right_", 1, 8, ".png"),
    10,
    true
  );
  player.animations.add(
    "walk_left",
    Phaser.Animation.generateFrameNames("walk_left_", 1, 8, ".png"),
    10,
    true
  );
  player.animations.add(
    "attack_right",
    Phaser.Animation.generateFrameNames("attack_right_", 1, 4, ".png"),
    8,
    true
  );
  player.animations.add(
    "attack_left",
    Phaser.Animation.generateFrameNames("attack_left_", 1, 4, ".png"),
    8,
    true
  );
  player.animations.add(
    "attack_up",
    Phaser.Animation.generateFrameNames("attack_up_", 1, 3, ".png"),
    8,
    true
  );
  player.animations.add(
    "attack_down",
    Phaser.Animation.generateFrameNames("attack_down_", 1, 4, ".png"),
    8,
    true
  );
  player.animations.add(
    "hurt_up",
    Phaser.Animation.generateFrameNames("hurt_up_", 1, 3, ".png"),
    10,
    true
  );
  player.animations.add(
    "hurt_down",
    Phaser.Animation.generateFrameNames("hurt_down_", 1, 3, ".png"),
    10,
    true
  );
  player.animations.add(
    "hurt_left",
    Phaser.Animation.generateFrameNames("hurt_left_", 1, 4, ".png"),
    10,
    true
  );
  player.animations.add(
    "hurt_right",
    Phaser.Animation.generateFrameNames("hurt_right_", 1, 4, ".png"),
    10,
    true
  );
  player.animations.add("idle-left", ["idle_left.png"], 2, true);
  player.animations.add("idle-right", ["idle_right.png"], 2, true);
  player.animations.add("idle-down", ["idle_down.png"], 2, true);
  player.animations.add("idle-up", ["idle_up.png"], 2, true);

  return player;
}