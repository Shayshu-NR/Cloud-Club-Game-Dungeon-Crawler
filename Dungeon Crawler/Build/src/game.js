var maingame = {};
var BuildItems = new Items("test_items.json");
var levelCoins = new Coins("currency.json");
var enemyJson = new Enemies("ripleys_enemies.json");

//-------------------- Tile map --------------------
var map;
var ground;
var walls;
var door;

//-------------------- Player --------------------
var player;
var player_facing = 3;

//-------------------- Enemies --------------------
var lizard;
var lizard_direction = 1;
var big_guy;
var new_nme;
var shark;
var pirate;
var pirates;
var enemies;
var killCount = 0;

//-------------------- Utilities --------------------
var keyReset = false;
var cursors;
var currency_json;
var enemies_json;
var door_json;
var enemyCount = 0;

//-------------------- Weapons --------------------
var default_sword;
var weapon;
var playerWeapon;
var weapon_prj
//-------------------- Treasure --------------------
var chest;
var statics;
var icon = [];
var itemChests = [];
var coins;

//-------------------- Items -----------------------
var potion;

//-------------------- HUD -----------------------
var lastLevelPoints = 0;
var maxXpPoints = 0;
var xp_bar;
var bar;
var lvltxt1;
var lvltxt2;
var health_bars;
var ammo_bar;
var timeLimit = 0;
var activeBar = [];

maingame.test_env = function (game) {};

maingame.test_env.prototype = {
  preload: function () {
    this.load.image(
      "tiles",
      "../Assets/Example assets/0x72_DungeonTilesetII_v1.3.1/0x72_DungeonTilesetII_v1.3.png"
    );

    this.load.tilemap(
      "example_map",
      "../Assets/Example assets/Tiled Map/Example_tile.json",
      null,
      Phaser.Tilemap.TILED_JSON
    );

    this.load.tilemap(
      "ripleys",
      "../Assets/General assets/Ripleys Aquarium/ripleys-aquarium-map-old.json",
      null,
      Phaser.Tilemap.TILED_JSON
    );

    this.load.image(
      "ripleys_tiles",
      "../Assets/General assets/Ripleys Aquarium/tileset.png"
    );

    this.load.atlas(
      "player",
      "../Assets/Example assets/legend of faune files/spritesheet.png",
      "../Assets/Example assets/legend of faune files/faun_spritesheet.json"
    );

    this.load.atlas(
      "sword",
      "../Assets/Example assets/0x72_DungeonTilesetII_v1.3.1/Spritesheets/sword_spritesheet.png",
      "../Assets/Example assets/0x72_DungeonTilesetII_v1.3.1/Spritesheets/sword.json"
    );

    this.load.spritesheet("chest", "../Gabrielle/src/Assets/chest.png", 32, 32);

    this.load.spritesheet(
      "LevelUp",
      "../Assets/General assets/LevelUp.png",
      100,
      25,
      9
    );

    this.load.image(
      "heart",
      "../Assets/Example assets/0x72_DungeonTilesetII_v1.3.1/frames/ui_heart_full.png"
    );

    this.load.atlas(
      "water",
      "../Assets/General assets/Ripleys Aquarium/water_atlas.png",
      "../Assets/General assets/Ripleys Aquarium/water_atlas.json"
    );

    this.load.atlas(
      "eng",
      "../Assets/General assets/Player/main-character.png",
      "../Assets/General assets/Player/main-character.json"
    );

    this.load.atlas(
      "potion_set",
      "../Assets/General assets/Potions/potions.png",
      "../Assets/General assets/Potions/potions.json"
    );

    this.load.atlas(
      "pirate_walk",
      "../Assets/General assets/Ripleys Aquarium/Pirate/pirate-atlas-sheet.png",
      "../Assets/General assets/Ripleys Aquarium/Pirate/pirate-atlas-sheet.json"
    );

    this.load.atlas(
      "full_pirate",
      "../Assets/General assets/Ripleys Aquarium/Pirate/pirate-atlas-sheet.png",
      "../Assets/General assets/Ripleys Aquarium/Pirate/pirate-atlas-sheet.json"
    );

    this.load.atlas(
      "shark",
      "../Assets/General assets/Ripleys Aquarium/shark-swim/Shark_atlas_sheet.png",
      "../Assets/General assets/Ripleys Aquarium/shark-swim/Shark_atlas_js.json"
    );

    this.load.image("arrow", "../Assets/General assets/arrow_right.png");

    this.load.image(
      "potion",
      "../Assets/General assets/lesser_healing_potion.png"
    );

    this.load.image("xp_bar", "../Gabrielle/src/Assets/bar-filler.png");

    this.load.image("bar", "../Gabrielle/src/Assets/Bar.png");

    this.load.image("health_heart", "../Gabrielle/src/Assets/heart.png");

    this.load.image("ammo_fire", "../Assets/General assets/ammo.png");

    this.load.image(
      "bpack",
      "../Assets/General assets/backpack-icon-cropped.png"
    );

    this.load.image("actives", "../Assets/General assets/ActiveItems.png");

    this.load.image(
      "merchant",
      "../Assets/Example assets/0x72_DungeonTilesetII_v1.3.1/frames/wizzard_f_hit_anim_f0.png"
    );
    this.load.image("laser", "../Assets/General assets/CN Tower/Laser.png");

    this.load.atlas(
      "currency-atlas",
      "../Assets/General assets/currency.png",
      "../Assets/General assets/currency.json"
    );

    this.load.atlas(
      "door-atlas",
      "../Assets/General assets/Ripleys Aquarium/door-atlas.png",
      "../Assets/General assets/Ripleys Aquarium/door-atlas.json"
    );

    game.load.text("currency", "../Specifications/currency.json");
    game.load.text("enemies", "./src/Enemies/ripleys_enemies.json");
    game.load.text("doors", "../Specifications/door.json");
  },

  create: function () {
    enemyCount = 0;
    //-------------------- Load Currency --------------------
    currency_json = JSON.parse(game.cache.getText("currency"));
    enemies_json = JSON.parse(game.cache.getText("enemies"));
    door_json = JSON.parse(game.cache.getText("doors"));

    //-------------------- Start physics engine --------------------
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //-------------------- Add tile map and tile set --------------------
    map = game.add.tilemap("ripleys");
    map.addTilesetImage("ripleys", "ripleys_tiles");

    //-------------------- Create layer --------------------
    map.createLayer("ground");
    map.createLayer("water");
    map.createLayer("rocks");
    walls = map.createLayer("wall");
    map.createLayer("glass");
    map.createLayer("kelp");
    map.createLayer("decoration");
    map.createLayer("decoration-2");

    //-------------------- Add wall colision --------------------
    map.setCollisionBetween(1, 999, true, "wall");

    //-------------------- Add player model --------------------
    console.log(game.player_attributes.x, game.player_attributes.y);
    player = game.add.sprite(
      game.player_attributes.x,
      game.player_attributes.y,
      "eng",
      "idle_down.png"
    );
    player.swing = false;
    player = init_player(game, player);

    //-------------------- Add Doors --------------------
    door = game.add.group();
    door.enableBody = true;

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

    //-------------------- Add Currency --------------------
    coins = game.add.group();
    coins.enableBody = true;

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

    {
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
    }

    //-------------------- Add example weapon --------------------
    default_sword = game.add.group();
    default_sword.enableBody = true;

    playerWeapon = game.add.physicsGroup(Phaser.Physics.ARCADE);
    playerWeapon.enableBody = true;

    //-------------------- Add example enemies --------------------
    lizard = game.add.physicsGroup(Phaser.Physics.ARCADE);
    shark = game.add.physicsGroup(Phaser.Physics.ARCADE);
    pirate = game.add.physicsGroup(Phaser.Physics.ARCADE);
    enemies = game.add.physicsGroup(Phaser.Physics.ARCADE);

    lizard.enableBody = true;
    shark.enableBody = true;
    pirate.enableBody = true;

    game.physics.arcade.enable(lizard, Phaser.Physics.ARCADE);
    game.physics.arcade.enable(shark, Phaser.Physics.ARCADE);
    game.physics.arcade.enable(pirate, Phaser.Physics.ARCADE);

    var enemyMapping = {
      merchant: "button",
      pirate: pirate,
      shark: shark,
    };
    //----------- Dummy Variable ----------------------------
    player.lazer = {
      amount: 5,
      damage: 1,
      frequency: 1,
      group: undefined,
      speed: 3,
      name: "lazer_beam",
      quantity: 1,
      src: "Laser.png",
      weapon_type: "projectile",
    };

    //-------------------- Enemy Creation Script --------------------
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

    //-------------------- Physics engine and control setting --------------------
    game.world.setBounds(0, 0, 16 * 100, 16 * 100);
    game.camera.follow(player);

    cursors = game.input.keyboard.createCursorKeys();
    cursors.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    cursors.esc = game.input.keyboard.addKey(Phaser.Keyboard.ESC);

    statics = game.add.physicsGroup(Phaser.Physics.ARCADE);
    bars = game.add.physicsGroup(Phaser.Physics.ARCADE);

    //~~~~~~~~~~ chest creation ~~~~~~~~~~~~~~~~
    itemChests = [];

    for (var i = 0; i < BuildItems.itemData.Items.length; i++) {
      console.log("Making chest", i);
      var x = Number(BuildItems.itemData.Items[i].x);
      var y = Number(BuildItems.itemData.Items[i].y);
      var src = BuildItems.itemData.Items[i].src;

      var newChest;
      if (BuildItems.itemData.Items[i].chest.Opened) {
        newChest = statics.create(x, y, "chest", 5);
      } else {
        newChest = statics.create(x, y, "chest", 0);
        newChest.animations.add("open", [0, 1, 2, 3, 4, 5, 6, 7], 300, false);
      }

      newChest.collide = true;
      game.physics.arcade.enable(newChest);
      newChest.body.immovable = true;
      newChest.enableBody = true;
      newChest.classPosition = i;

      newChest.item = BuildItems.itemData.Items[i].chest;

      console.log(newChest.position.x);
      itemChests.push(newChest);

      itemChests[i].collide = true;
      itemChests[i].animations.add(
        "open",
        [0, 1, 2, 3, 4, 5, 6, 7],
        300,
        false
      );
      itemChests[i].animations.add("close", [7, 6, 5, 4, 3, 2], 300, false);
    }

    //-------------------- HUD --------------------
    var stats = game.add.button(10, 545, "bpack", function () {
      game.player_attributes = {
        backpack: player.backpack,
        actives: player.active_items,
        current: player.current_item,
        x: player.body.position.x,
        y: player.body.position.y,
        money: player.money,
      };

      game.playerExp = player.exp;
      game.current_time = timeLimit;
      game.state.start("Backpack");
      console.log("in backpack state");
    });
    stats.fixedToCamera = true;

    var bar_holder = statics.create(150, 560, "bar");
    xp_bar = bars.create(158, 562, "xp_bar");
    bar_holder.fixedToCamera = true;
    xp_bar.fixedToCamera = true;
    player.level = 1;
    player.getCurrentLevel = function () {
      player.level = Math.floor(Math.pow(player.exp / 100.0, 2.0 / 3.0)) + 1;
      return player.level;
    };
    bar_holder.scale.set(8, 2);
    xp_bar.scale.set((player.exp / maxXpPoints) * 8, 2);

    lvltxt1 = game.add.text(150, 534, "", {
      fontSize: "16px",
      fill: "#FFFFFF",
    });
    lvltxt1.text = "" + player.level;

    lvltxt2 = game.add.text(780, 534, "", {
      fontSize: "16px",
      fill: "#FFFFFF",
    });
    lvltxt2.text = "" + (player.level + 1);

    lvltxt1.fixedToCamera = true;
    lvltxt2.fixedToCamera = true;

    //health-bar set-up
    health_bars = [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ];
    for (var i = 0; i < 10; i++) {
      health_bars[i] = bars.create(8 + i * 16, 5, "health_heart");
      health_bars[i].fixedToCamera = true;
    }

    var actives = game.add.image(55, 550, "actives");
    actives.fixedToCamera = true;
    actives.scale.set(0.4, 0.4);
    activeBar = player.active_items;

    for (var i = 0; i < activeBar.length; i++) {
      if (activeBar[i] != null) {
        console.log("active item create");
        icon[i] = game.add.image(
          62 + 28 * i,
          557,
          activeBar[i]["atlas"],
          activeBar[i]["src"]
        );
        icon[i].scale.set(activeBar[i].ai_scale[0], activeBar[i].ai_scale[1]);
      }
    }

    //ammo set up
    var coinIcon = game.add.image(8, 25, "currency-atlas", "currency_1.png");
    coinIcon.fixedToCamera = true;
    game.moneyText = game.add.text(56, 26, String(player.money));
    game.moneyText.fill = "#FFFFFF";
    game.moneyText.fixedToCamera = true;

    maxXpPoints = 100;

    //-------------------- Weapon -------------------------
    weapon = game.add.weapon(30, 'arrow')
    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    weapon.bulletSpeed = 400;
    weapon.fireRate = 1000;
    weapon.trackSprite(player, 0, 0, true);

    cursors.z = game.input.keyboard.addKey(Phaser.Keyboard.Z)
    cursors.f = game.input.keyboard.addKey(Phaser.Keyboard.F)
    cursors.bckpck = game.input.keyboard.addKey(Phaser.Keyboard.B)
    cursors.useAct1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE)
    cursors.useAct2 = game.input.keyboard.addKey(Phaser.Keyboard.TWO)
    cursors.useAct3 = game.input.keyboard.addKey(Phaser.Keyboard.THREE)
    cursors.startMenu = game.input.keyboard.addKey(Phaser.Keyboard.P)

    //-------------------- Speed run timer --------------------
    timeLimit = game.current_time;
    var minutes = Math.floor(timeLimit / 6000);
    var seconds = Math.floor((timeLimit - minutes * 6000) / 100);
    var miliseconds = timeLimit - seconds / 100 - minutes * 6000;
    var timeString =
      addZeros(minutes) + ":" + addZeros(seconds) + "." + addZeros(miliseconds);
    this.timeText = game.add.text(650, 20, timeString);
    this.timeText.fill = "#FFFFFF";
    this.timeText.fixedToCamera = true;
    this.timer = game.time.events.loop(10, tick, this);

    itemChests[0].animations.play("open");
  },

  update: function () {
    pirate.children.forEach((x) => pirate_track(x));
    shark.children.forEach((x) => shark_track(x));

    player.moveCurrentToBackpack();
    if (cursors.startMenu.downDuration(100)) {
      game.state.start("StartMenu");
    }

    for (var i = 0; i < BuildItems.itemData.Items.length; i++) {
      game.physics.arcade.collide(
        player,
        itemChests[i],
        function openChest(player) {
          if (itemChests[i].collide) {
            //so that the chest doesnt open and close
            itemChests[i].animations.play("open");
            itemChests[i].collide = false;

            if (!BuildItems.itemData.Items[i].chest.Taken) {
              BuildItems.itemData.Items[i].chest.Taken = true;
              BuildItems.itemData.Items[i].chest.Opened = true;

              var item = statics.create(
                itemChests[i].position.x + 8,
                itemChests[i].position.y + 8,
                itemChests[i].item.atlas,
                itemChests[i].item.src
              );
              item.info = itemChests[i].item; //itemChests[i].item doesn't work inside the collectItemFromChest function
              console.log(itemChests);

              game.time.events.add(
                Phaser.Timer.SECOND * 1,
                function collectItemFromChest() {
                  console.log(item.info);
                  player.putBackpack(item.info);
                  item.kill();
                  // Set item taken flag
                },
                this
              );
            }
          }
        }
      );
    }

    //-------------------- Collision engine --------------------
    game.physics.arcade.collide(player, walls);
    game.physics.arcade.collide(pirate, walls);
    game.physics.arcade.collide(shark, walls);

    game.physics.arcade.collide(lizard, walls, lizard_turn_around, null, this);
    game.physics.arcade.collide(default_sword, lizard, lizard_dmg, null, this);
    game.physics.arcade.collide(player, lizard, damage_player, null, this);
    game.physics.arcade.collide(player, pirate, damage_player, null, this);
    game.physics.arcade.collide(player, shark, damage_player, null, this);
    game.physics.arcade.collide(playerWeapon, pirate, lizard_dmg, null, this);
    game.physics.arcade.collide(playerWeapon, shark, lizard_dmg, null, this);
    game.physics.arcade.collide(player, door, open_door, null, this);
    game.physics.arcade.collide(player, coins, add_coins, null, this);
    game.physics.arcade.collide(
      player.current_item,
      enemies,
      knockback_enemies,
      null,
      this
    );

    //-------------------- Movement --------------------
    var speed = player.speed;
    potion_set = game.add.group();
    if (player.potion_status == "Speed Potion") {
      speed = 350;
    } else {
      speed = 175;
    }

    idle_direction = ["idle-left", "idle-right", "idle-up", "idle-down"];

    if (!player.knockback) {
      if (!player.swing) {
        if (cursors.left.isDown) {
          player_facing = 0;
          player.body.velocity.x = -speed;
          player.animations.play("walk_left", true);
        } else if (cursors.right.isDown) {
          player_facing = 1;
          player.body.velocity.x = speed;
          player.animations.play("walk_right", true);
        } else if (cursors.down.isDown) {
          player_facing = 3;
          player.body.velocity.y = speed;
          player.animations.play("walk_down", true);
        } else if (cursors.up.isDown) {
          player_facing = 2;
          player.body.velocity.y = -speed;
          player.animations.play("walk_up", true);
        } else {
          player.animations.play(idle_direction[player_facing]);
          player.body.velocity.x = 0;
          player.body.velocity.y = 0;
        }
      } else {
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;
      }
    }

    if (cursors.space.downDuration(100) && !keyReset) {
      keyReset = true;
      swing_melee(player, player.current_item);
    }
    if (!cursors.space.isDown) {
      keyReset = false;
    }

    //-------------------- Enter skill tree state --------------------
    if (cursors.esc.downDuration(100)) {
      game.player_attributes = {
        backpack: player.backpack,
        actives: player.active_items,
        current: player.current_item,
        x: player.body.position.x,
        y: player.body.position.y,
        money: player.money,
      };

      game.playerExp = player.exp;
      game.current_time = timeLimit;
      game.state.start("Skill tree");
    }
    //-------------------- EXP update and HUD --------------------
    // Point checking
    if (player.exp - lastLevelPoints >= maxXpPoints) {
      level_up(player);
      add_health(player, 3);
    }

    if (cursors.bckpck.isDown) {
      game.player_attributes = {
        backpack: player.backpack,
        actives: player.active_items,
        current: player.current_item,
        x: player.body.position.x,
        y: player.body.position.y,
        money: player.money,
      };

      game.playerExp = player.exp;
      game.current_time = timeLimit;
      game.state.start("Backpack");
      console.log("in backpack state");
    }

    //-------------------- EXP update and HUD --------------------
    // Point checking
    if (player.exp - lastLevelPoints >= maxXpPoints) {
      level_up(player);
    }

    if (cursors.useAct1.downDuration(100)) {
      if (
        player.active_items[0] !== null &&
        typeof player.active_items[0] == "object"
      ) {
        eval(player.active_items[0].use); //changes the string for function into a function
        player.active_items[0] = null;
        icon[0].kill();
      }
    }
    if (cursors.useAct2.downDuration(100)) {
      if (
        player.active_items[1] !== null &&
        typeof player.active_items[1] == "object"
      ) {
        eval(player.active_items[1].use); //changes the string for function into a function
        player.active_items[1] = null;
        icon[1].kill();
      }
    }
    if (cursors.useAct3.downDuration(100)) {
      if (
        player.active_items[2] !== null &&
        typeof player.active_items[2] == "object"
      ) {
        eval(player.active_items[2].use); //changes the string for function into a function
        player.active_items[2] = null;
        icon[2].kill();
      }
    }

    this.timeText.x = 650 + this.camera.view.x;
    player.healthchange();
    game.playerHealth = player.health;

    if (player.health <= 0) {
      game.state.start("GameOver");
    }

    if (killCount == enemyCount) {
      console.log("LEVEL DONE");
    }
  },

  render: function() {
    game.debug.bodyInfo(player, 32, 32);
  }
};
