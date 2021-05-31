var maingame = {};

//-------------------- Tile map --------------------
var map;
var ground;
var walls;

//-------------------- Player --------------------
var player;
var player_facing = 3;

//-------------------- Enemies --------------------
var lizard;
var lizard_direction = 1;
var big_guy;
var new_nme;
var shark

//-------------------- Utilities --------------------
var keyReset = false;
var cursors;

//-------------------- Weapons --------------------
var default_sword;
var weapon;

//-------------------- Treasure --------------------
var chest;
var statics

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

maingame.test_env = function (game) { };

maingame.test_env.prototype = {
  preload: function () {
    this.load.image('tiles',
      '../Assets/Example assets/0x72_DungeonTilesetII_v1.3.1/0x72_DungeonTilesetII_v1.3.png')

    this.load.tilemap('example_map',
      '../Assets/Example assets/Tiled Map/Example_tile.json',
      null,
      Phaser.Tilemap.TILED_JSON)

    this.load.atlas('player',
      '../Assets/Example assets/legend of faune files/spritesheet.png',
      '../Assets/Example assets/legend of faune files/faun_spritesheet.json')

    this.load.atlas('lizard',
      '../Assets/Example assets/0x72_DungeonTilesetII_v1.3.1/Spritesheets/lizard_spritesheet.png',
      '../Assets/Example assets/0x72_DungeonTilesetII_v1.3.1/Spritesheets/lizard.json')


    this.load.atlas('sword',
      '../Assets/Example assets/0x72_DungeonTilesetII_v1.3.1/Spritesheets/sword_spritesheet.png',
      '../Assets/Example assets/0x72_DungeonTilesetII_v1.3.1/Spritesheets/sword.json')

    this.load.atlas('big_guy',
      '../Assets/Example assets/0x72_DungeonTilesetII_v1.3.1/Spritesheets/biguy_spritesheet.png',
      '../Assets/Example assets/0x72_DungeonTilesetII_v1.3.1/Spritesheets/bigguy.json')

    // this.load.atlas('chest',
    //   '../Assets/Example assets/0x72_DungeonTilesetII_v1.3.1/Spritesheets/chest_spritesheet.png',
    //   '../Assets/Example assets/0x72_DungeonTilesetII_v1.3.1/Spritesheets/chest.json')
    this.load.spritesheet('chest', '../Gabrielle/src/Assets/chest.png',
      32, 32);

    this.load.image('heart',
      '../Assets/Example assets/0x72_DungeonTilesetII_v1.3.1/frames/ui_heart_full.png'
    )

    this.load.atlas('water',
      '../Assets/General assets/Ripleys Aquarium/water_atlas.png',
      '../Assets/General assets/Ripleys Aquarium/water_atlas.json',
    )

    this.load.atlas('eng',
      '../Assets/General assets/Player/main-character.png',
      '../Assets/General assets/Player/main-character.json'
    )
    this.load.atlas(
      "potion_set",
      "../Assets/General assets/Potions/potions.png",
      "../Assets/General assets/Potions/potions.json"
    );
    this.load.image('arrow', '../Assets/General assets/arrow_right.png')

    this.load.image(
      "potion",
      "../Assets/General assets/lesser_healing_potion.png"
    )

    this.load.image('xp_bar',
      '../Gabrielle/src/Assets/bar-filler.png')

    this.load.image('bar',
      '../Gabrielle/src/Assets/Bar.png')

    this.load.image('health_heart',
      '../Gabrielle/src/Assets/heart.png')

    this.load.image('ammo_fire',
      '../Assets/General assets/ammo.png')

    this.load.image('bpack',
      '../Assets/General assets/backpack-icon-cropped.png')

    this.load.image('actives', '../Assets/General assets/ActiveItems.png')
  },

  create: function () {
    //-------------------- Start physics engine --------------------
    game.physics.startSystem(Phaser.Physics.ARCADE)

    //-------------------- Add tile map and tile set --------------------
    map = game.add.tilemap('example_map')
    map.addTilesetImage('dungeon', 'tiles')

    //-------------------- Create layer --------------------
    ground = map.createLayer('Ground')
    walls = map.createLayer('Walls')

    //-------------------- Add wall colision --------------------
    map.setCollisionBetween(1, 999, true, 'Walls')

    //-------------------- Add player model --------------------
    player = game.add.sprite(128, 128, 'eng', 'idle_down.png')
    player.swing = false
    player = init_player(game, player)

    {

      player.animations.add(

        'walk_down',
        Phaser.Animation.generateFrameNames(
          'walk_down_',
          1,
          7,
          '.png'
        ),
        10,
        true
      )
      player.animations.add(
        'walk_up',
        Phaser.Animation.generateFrameNames(
          'walk_up_',
          1,
          7,
          '.png'
        ),
        10,
        true
      )
      player.animations.add(
        'walk_right',
        Phaser.Animation.generateFrameNames(
          'walk_right_',
          1,
          8,
          '.png'
        ),
        10,
        true
      )
      player.animations.add(
        'walk_left',
        Phaser.Animation.generateFrameNames(
          'walk_left_',
          1,
          8,
          '.png',
        ),
        10,
        true
      )
      player.animations.add(
        'attack_right',
        Phaser.Animation.generateFrameNames(
          'attack_right_',
          1,
          4,
          '.png'
        ),
        8,
        true
      )
      player.animations.add(
        'attack_left',
        Phaser.Animation.generateFrameNames(
          'attack_left_',
          1,
          4,
          '.png'
        ),
        8,
        true
      )
      player.animations.add(
        'attack_up',
        Phaser.Animation.generateFrameNames(
          'attack_up_',
          1,
          3,
          '.png'
        ),
        8,
        true
      )
      player.animations.add(
        'attack_down',
        Phaser.Animation.generateFrameNames(
          'attack_down_',
          1,
          4,
          '.png'
        ),
        8,
        true
      )
      player.animations.add(
        'hurt_up',
        Phaser.Animation.generateFrameNames(
          'hurt_up_',
          1,
          3,
          '.png'
        ),
        10,
        true
      )
      player.animations.add(
        'hurt_down',
        Phaser.Animation.generateFrameNames(
          'hurt_down_',
          1,
          3,
          '.png'
        ),
        10,
        true
      )
      player.animations.add(
        'hurt_left',
        Phaser.Animation.generateFrameNames(
          'hurt_left_',
          1,
          4,
          '.png'
        ),
        10,
        true
      )
      player.animations.add(
        'hurt_right',
        Phaser.Animation.generateFrameNames(
          'hurt_right_',
          1,
          4,
          '.png'
        ),
        10,
        true
      )
      player.animations.add(
        'idle-left',
        ['idle_left.png'],
        2,
        true
      )
      player.animations.add(
        'idle-right',
        ['idle_right.png'],
        2,
        true
      )
      player.animations.add(
        'idle-down',
        ['idle_down.png'],
        2,
        true
      )
      player.animations.add(
        'idle-up',
        ['idle_up.png'],
        2,
        true
      )
    }

    //-------------------- Add example weapon --------------------
    default_sword = game.add.group()
    default_sword.enableBody = true

    //-------------------- Add example enemies --------------------
    lizard = game.add.physicsGroup(Phaser.Physics.ARCADE)
    shark = game.add.physicsGroup(Phaser.Physics.ARCADE)

    lizard.enableBody = true
    shark.enableBody = true

    game.physics.arcade.enable(lizard, Phaser.Physics.ARCADE)
    game.physics.arcade.enable(shark, Phaser.Physics.ARCADE)

    new_nme = lizard.create(600, 142, 'lizard', 'lizard_m_idle_anim_f0.png')
    new_nme = enemy_init(new_nme, 10, 500)

    big_guy = lizard.create(600, 200, 'big_guy', 'big_demon_idle_anim_f3.png')
    var big_guy_tween = game.add.tween(big_guy)
    big_guy_tween.to({ x: 700, y: 200 }, 1000, null, true, 0, -1, true)
    big_guy = enemy_init(big_guy, 25, 500)

    big_guy.animations.add(
      'idle',
      Phaser.Animation.generateFrameNames(
        'big_demon_idle_anim_f',
        0,
        3,
        '.png'
      ),
      10,
      true
    )
    big_guy.animations.add(
      'run',
      Phaser.Animation.generateFrameNames(
        'big_demon_run_anim_f',
        0,
        3,
        '.png'
      ),
      10,
      true
    )
    big_guy.animations.play('run')

    new_nme.animations.add(
      'idle',
      Phaser.Animation.generateFrameNames(
        'lizard_m_idle_anim_f',
        0,
        3,
        '.png'
      ),
      10,
      true
    )
    new_nme.animations.add(
      'run',
      Phaser.Animation.generateFrameNames(
        'lizard_m_run_anim_f',
        0,
        3,
        '.png'
      ),
      10,
      true
    )

    new_nme.animations.play('run')
    new_nme.body.velocity.x = 120
    new_nme.body.bounce.set(-1)

    //-------------------- Physics engine and control setting --------------------
    game.world.setBounds(0, 0, 16 * 100, 16 * 100)
    game.camera.follow(player)

    cursors = game.input.keyboard.createCursorKeys()
    cursors.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    cursors.esc = game.input.keyboard.addKey(Phaser.Keyboard.ESC)

    //-------------------- Adding player weapons and dictionary --------------------
    player.current_item = {
      "name": "sword",
      "group": default_sword,
      "src": "../Assests/Example assets/0x72_DungeonTilesetII_v1.3.1/Spritesheets/sword_spritesheet.png",
      "dmg": 1,
      "quantity": 1
    }

    // player.backpack.potion = {
    //   "name": "potion",
    //   "group": potion,
    //   "atlas" : "potion_set",
    //   "src": "health_pot_1.png",
    //   "ai_scale" : (x, y)
    // }

    // lesser_sword = {
    //   "name" : "Lesser sword",
    //   "group" : default_sword,
    //   "src" : "weapon_regular_sword_up.png",
    //   "atlas" : "sword",
    //   "dmg" : 0.6,
    //   "quantity" : 1
    // }

    // player.backpack = {
    //   "potion": ption1,
    //   "lesser_sword" : lesser_sword
    // }

    //-------------------- Chest example --------------------
    // chest = game.add.group()
    // chest.enableBody = true

    // const new_chest = chest.create(50, 200, 'chest', 'chest_empty_open_anim_f0.png')
    // new_chest.body.immovable = true
    // new_chest.opened = false
    // new_chest.item = {
    //   "name": "potion"
    // }
    // new_chest.animations.add(
    //   'open',
    //   Phaser.Animation.generateFrameNames(
    //     'chest_empty_open_anim_f',
    //     0,
    //     2,
    //     '.png'
    //   ),
    //   10,
    //   false
    // )

    statics = game.add.physicsGroup(Phaser.Physics.ARCADE)
    bars = game.add.physicsGroup(Phaser.Physics.ARCADE);

    //~~~~~~~~~~ chest creation ~~~~~~~~~~~~~~~~

    chest = statics.create(50, 200, 'chest', 0)
    game.physics.arcade.enable(chest)
    chest.body.immovable = true
    chest.enableBody = true

    chest.item = {
      name: "HealthPotion",
      group: potion,
      atlas: "potion_set",
      src: "health_pot_1.png",
      use: function () {
        player.health += 3
        console.log("Add 3 health")
        
      },
      ai_scale : [1, 1]
    }

    chest.collide = true


    chest.animations.add('open', [0, 1, 2, 3, 4, 5, 6, 7], 300, false)
    chest.animations.add('close', [7, 6, 5, 4, 3, 2], 300, false)

    //-------------------- Added water example --------------------
    const test = game.add.sprite(100, 200, 'water', 'water_f1.png')
    test.animations.add(
      'wave',
      Phaser.Animation.generateFrameNames(
        'water_f',
        1,
        6,
        '.png'
      ),
      5,
      true
    )
    test.animations.play('wave')

    //-------------------- HUD --------------------
    var stats = game.add.button(10, 545, 'bpack',
      function () {
        game.player_attributes = {
          "backpack": player.backpack,
          "actives": player.active_items,
          "current": player.current_item,
        };
        game.current_time = timeLimit
        game.state.start("Backpack");
        console.log("in backpack state");
      })

    var bar_holder = statics.create(150, 560, 'bar', 'Bar.png')
    xp_bar = bars.create(158, 552, 'xp_bar', 'bar-filler.png')
    bar_holder.fixedToCamera = true
    xp_bar.fixedToCamera = true
    player.exp = 0
    player.level = 1
    player.getCurrentLevel = function () {
      player.level = Math.floor(Math.pow((player.exp / 100.0), 2.0 / 3.0)) + 1
      return player.level
    }
    bar_holder.scale.set(8, 2)
    xp_bar.scale.set(player.exp / maxXpPoints * 8, 2)

    lvltxt1 = game.add.text(150, 534, '', { fontSize: '16px', fill: '#FFFFFF' })
    lvltxt1.text = '' + player.level;

    lvltxt2 = game.add.text(780, 534, '', { fontSize: '16px', fill: '#FFFFFF' })
    lvltxt2.text = '' + (player.level + 1);

    lvltxt1.fixedToCamera = true
    lvltxt2.fixedToCamera = true

    //health-bar set-up
    health_bars = [null, null, null, null, null, null, null, null, null, null, null]
    for (var i = 0; i < 10; i++) {
      health_bars[i] = bars.create(8 + i * 16, 5, 'health_heart', 'heart.png')
      health_bars[i].fixedToCamera = true
      //health_bars[i].animations.add('blink', [2, 1, 2, 1, 2], 15, true) 

    }

    var actives = game.add.image(55, 550, 'actives')
    actives.scale.set(0.4, 0.4)
    activeBar = player.active_items;
    for (var i = 0; i < activeBar.length; i++) {
      if (activeBar[i] != null) {
        console.log("active item create")
        var icon = game.add.image(62 + 28 * i, 557, activeBar[i]["atlas"], activeBar[i]["src"])
        icon.scale.set(activeBar[i].ai_scale[0], activeBar[i].ai_scale[1])
      }
    }


    //ammo set up
    player.ammo = 10
    ammo_bars = [null, null, null, null, null, null, null, null, null, null, null]
    for (var i = 0; i < 10; i++) {
      ammo_bars[i] = bars.create(i * 16, 25, 'ammo_fire', 'fire.png')
      ammo_bars[i].fixedToCamera = true

    }
    maxXpPoints = 100

    //-------------------- Weapon example --------------------
    weapon = game.add.weapon(30, 'arrow')
    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS
    weapon.bulletSpeed = 400
    weapon.fireRate = 1000
    weapon.trackSprite(player, 0, 0, true)
    cursors.z = game.input.keyboard.addKey(Phaser.Keyboard.Z)
    cursors.f = game.input.keyboard.addKey(Phaser.Keyboard.F)
    cursors.bckpck = game.input.keyboard.addKey(Phaser.Keyboard.B)
    cursors.useAct1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE)
    cursors.useAct2 = game.input.keyboard.addKey(Phaser.Keyboard.TWO)
    cursors.useAct3 = game.input.keyboard.addKey(Phaser.Keyboard.THREE)

    //-------------------- Speed run timer --------------------
    timeLimit = game.current_time
    var minutes = Math.floor(timeLimit / 6000);
    var seconds = Math.floor((timeLimit - (minutes * 6000)) / 100);
    var miliseconds = timeLimit - (seconds / 100) - (minutes * 6000);
    var timeString = addZeros(minutes) + ":" + addZeros(seconds) + "." + addZeros(miliseconds);
    this.timeText = game.add.text(650, 20, timeString)
    this.timeText.fill = "#FFFFFF"
    this.timeText.fixedToCamera = true;
    this.timer = game.time.events.loop(10, tick, this)

  },

  update: function () {

    game.physics.arcade.collide(player, chest, function openChest(player) {
      if (chest.collide) {
        chest.collide = false;
        chest.animations.play('open')
        var item = statics.create(chest.position.x + 8, chest.position.y + 8, chest.item.atlas, chest.item.src)

        game.time.events.add(Phaser.Timer.SECOND * 1, function collectItemFromChest() {
          item.kill()
          player.putBackpack(chest.item)
        }, this);

      }

    }, null, this)

    //-------------------- Collision engine --------------------
    game.physics.arcade.collide(player, walls);
    game.physics.arcade.collide(player, walls);
    game.physics.arcade.collide(lizard, walls, lizard_turn_around, null, this);
    game.physics.arcade.collide(default_sword, lizard, lizard_dmg, null, this);
    // game.physics.arcade.collide(player, chest, open_chest, null, this);
    game.physics.arcade.collide(player, lizard, damage_player, null, this);

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
      swing_default_sword(player);
    }
    if (!cursors.space.isDown) {
      keyReset = false;
    }
    if (cursors.z.isDown) {
      weapon.fire();
    }

    //-------------------- Enter skill tree state --------------------
    if (cursors.esc.downDuration(100)) {
      game.current_time = timeLimit
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
        "backpack": player.backpack,
        "actives": player.active_items,
        "current": player.current_item,
      };
      game.current_time = timeLimit
      game.state.start("Backpack");
      console.log("in backpack state");
    }
    //-------------------- EXP update and HUD --------------------
    // Point checking
    if (player.exp - lastLevelPoints >= maxXpPoints) {
      level_up(player);
    }

    if (cursors.useAct1.downDuration(1000)) {
      if (player.active_items[0] !== null || player.active_items[0] !== 'undefined') {
        player.active_items[0].use()
        player.active_items[0] = null;
      }
    }
    if (cursors.useAct2.downDuration(100)) {
      if (player.active_items[1] !== null || player.active_items[1] !== 'undefined') {
        player.active_items[1].use()
        player.active_items[1] = null;
      }
    }
    if (cursors.useAct3.downDuration(100)) {
      if (player.active_items[2] !== null || player.active_items[2] !== 'undefined') {
        player.active_items[2].use()
        player.active_items[2] = null;
      }
    }

    this.timeText.x = 650 + this.camera.view.x
  }
};
