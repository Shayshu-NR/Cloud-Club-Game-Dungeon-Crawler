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
var xpBarScale = 8;

maingame.QueensPark = function (game) { };

maingame.QueensPark.prototype = {
  preload: function () {

    this.load.tilemap(
      "queenspark",
      "../Assets/General assets/Queens Park/queenspark.json",
      null,
      Phaser.Tilemap.TILED_JSON
    );

    this.load.image(
      "queenspark_tiles",
      "../Assets/General assets/Queens Park/tileset.png"
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

    game.load.text("currency", "./src/Currency/queenspark_currency.json");
    game.load.text("enemies", "./src/Enemies/queenspark_enemies.json");
    game.load.text("doors", "./src/Doors/queenspark_doors.json");
  },

  create: function () {
    enemyCount = 0;
    //-------------------- Load Currency --------------------
    BuildItems = new Items("queenspark_items.json");
    levelCoins = new Coins("queenspark_currency.json");
    enemyJson = new Enemies("queenspark_enemies.json");
    currency_json = JSON.parse(game.cache.getText("currency"));
    enemies_json = JSON.parse(game.cache.getText("enemies"));
    door_json = JSON.parse(game.cache.getText("doors"));

    //-------------------- Start physics engine --------------------
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //-------------------- Add tile map and tile set --------------------
    map = game.add.tilemap("queenspark");
    map.addTilesetImage("queenspark", "queenspark_tiles");

    //-------------------- Create layer --------------------
    map.createLayer("ground");
    walls = map.createLayer("walls");
    map.createLayer("decorations");

    //-------------------- Add wall colision --------------------
    //map.setCollisionBetween(1, 999, true, "walls");
    map.setCollisionBetween(1, 999, true, "decorations")

    //-------------------- Add example weapon --------------------
    default_sword = game.add.group();
    default_sword.enableBody = true;

    weapon = game.add.physicsGroup(Phaser.Physics.ARCADE);
    weapon.enableBody = true;

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
    CreateDoors(door_json, door);

    //-------------------- Add Currency --------------------
    coins = game.add.group();
    coins.enableBody = true;
    CreateCoins(levelCoins, coins);

    player = CreatePlayerAnimations(player);

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

    //-------------------- Enemy Creation Script --------------------
    LoadEnemies(game, enemyJson, enemyMapping);

    //-------------------- Physics engine and control setting --------------------
    game.world.setBounds(0, 0, 16 * 100, 16 * 100);
    game.camera.follow(player);

    cursors = game.input.keyboard.createCursorKeys();
    cursors.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    cursors.esc = game.input.keyboard.addKey(Phaser.Keyboard.ESC);

    statics = game.add.physicsGroup(Phaser.Physics.ARCADE);
    bars = game.add.physicsGroup(Phaser.Physics.ARCADE);

    //~~~~~~~~~~ chest creation ~~~~~~~~~~~~~~~~
    itemChests = CreateChests(game, BuildItems, statics);

    //-------------------- HUD --------------------
    var stats = game.add.button(10, 545, "bpack", function () {
      game.player_attributes = {
        backpack: player.backpack,
        actives: player.active_items,
        current: player.current_item,
        x: player.body.position.x,
        y: player.body.position.y,
        money: player.money,
        state: "QueensPark"
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
    bar_holder.scale.set(8, 2);

    maxXpPoints = 100 * (Math.pow(player.getCurrentLevel(), 3.0 / 2.0))
    xp_bar.scale.set(((player.exp - lastLevelPoints) / (maxXpPoints - lastLevelPoints)) * (8), 2);

    lvltxt1 = game.add.text(150, 534, String(player.getCurrentLevel()), {
      fontSize: "16px",
      fill: "#FFFFFF",
    });

    lvltxt2 = game.add.text(780, 534, String(player.getCurrentLevel() + 1), {
      fontSize: "16px",
      fill: "#FFFFFF",
    });

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
    for (var i = 0; i < player.health; i++) {
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


    //-------------------- Weapon -------------------------
    weapon = this.game.plugins.add(Phaser.Weapon)//game.add.weapon(30, 'arrow')
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
  },

  update: function () {
    pirate.children.forEach((x) => pirate_track(x));
    shark.children.forEach((x) => shark_track(x));

    player.moveCurrentToBackpack();
    if (cursors.startMenu.downDuration(100)) {
      game.state.start("StartMenu");
    }

    try {
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
    }
    catch {

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
    game.physics.arcade.collide(player.current_item.group, pirate, lizard_dmg, null, this);
    game.physics.arcade.collide(player.current_item.group, shark, lizard_dmg, null, this);
    game.physics.arcade.overlap(weapon.bullets, shark, lizard_dmg);
    game.physics.arcade.overlap(weapon.bullets, pirate, lizard_dmg);
    game.physics.arcade.collide(player, door, open_door, null, this);
    game.physics.arcade.collide(player, coins, add_coins, null, this);
    game.physics.arcade.collide(
      player.current_item,
      enemies,
      knockback_enemies,
      null,
      this
    );
    xp_bar.scale.set(((player.exp - lastLevelPoints) / (maxXpPoints - lastLevelPoints)) * xpBarScale, 2);

    //-------------------- Movement --------------------
    var speed = player.speed;
    potion_set = game.add.group();
    if (player.potion_status == "Speed Potion") {
      speed = speed * 1.5;
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
      use_current_weapon();
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
        state: "QueensPark"
      };

      game.playerExp = player.exp;
      game.current_time = timeLimit;
      game.state.start("Skill tree");
    }
    //-------------------- EXP update and HUD --------------------
    // Point checking
    if (player.exp >= maxXpPoints) {
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
        state: "QueensPark"
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
      //console.log("LEVEL DONE");
    }
  },

  render: function () {
    game.debug.bodyInfo(player, 32, 32);

    //game.debug.body(player);

    game.debug.body(player.current_item.group);
  }
};
