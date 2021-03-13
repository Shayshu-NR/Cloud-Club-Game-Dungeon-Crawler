const game = new Phaser.Game(800, 600, Phaser.AUTO, "", {
  preload: preload,
  create: create,
  update: update,
  render: render,
});
//Live Server Link: http://127.0.0.1:5500/

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

//-------------------- Utilities --------------------
var keyReset = false;
var cursors;

//-------------------- Weapons --------------------
var default_sword;
var weapon;

//-------------------- Treasure --------------------
var chest;

//-------------------- Items -----------------------
var potion;
var potion_set;

function preload() {
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

  this.load.atlas(
    "player",
    "../Assets/Example assets/legend of faune files/spritesheet.png",
    "../Assets/Example assets/legend of faune files/faun_spritesheet.json"
  );

  this.load.atlas(
    "lizard",
    "../Assets/Example assets/0x72_DungeonTilesetII_v1.3.1/Spritesheets/lizard_spritesheet.png",
    "../Assets/Example assets/0x72_DungeonTilesetII_v1.3.1/Spritesheets/lizard.json"
  );

  this.load.atlas(
    "sword",
    "../Assets/Example assets/0x72_DungeonTilesetII_v1.3.1/Spritesheets/sword_spritesheet.png",
    "../Assets/Example assets/0x72_DungeonTilesetII_v1.3.1/Spritesheets/sword.json"
  );

  this.load.atlas(
    "big_guy",
    "../Assets/Example assets/0x72_DungeonTilesetII_v1.3.1/Spritesheets/biguy_spritesheet.png",
    "../Assets/Example assets/0x72_DungeonTilesetII_v1.3.1/Spritesheets/bigguy.json"
  );

  this.load.atlas(
    "chest",
    "../Assets/Example assets/0x72_DungeonTilesetII_v1.3.1/Spritesheets/chest_spritesheet.png",
    "../Assets/Example assets/0x72_DungeonTilesetII_v1.3.1/Spritesheets/chest.json"
  );

  this.load.image(
    "heart",
    "../Assets/Example assets/0x72_DungeonTilesetII_v1.3.1/frames/ui_heart_full.png"
  );

  this.load.image(
    "potion",
    "../Assets/General assets/lesser_healing_potion.png"
  );

  this.load.atlas(
    "potion_set",
    "../Assets/General assets/Potions/potions.png",
    "../Assets/General assets/Potions/potions.json"
  );
}

function create() {
  //-------------------- Start physics engine --------------------
  game.physics.startSystem(Phaser.Physics.ARCADE);

  //-------------------- Add tile map and tile set --------------------
  map = game.add.tilemap("example_map");
  map.addTilesetImage("dungeon", "tiles");

  //-------------------- Create layer --------------------
  ground = map.createLayer("Ground");
  walls = map.createLayer("Walls");

  //-------------------- Add wall colision --------------------
  map.setCollisionBetween(1, 999, true, "Walls");

  //-------------------- Add player model --------------------
  player = game.add.sprite(128, 128, "player", "walk-down-3.png");
  player.swing = false;
  player.health = 3;

  player.animations.add(
    "walk-down",
    Phaser.Animation.generateFrameNames("walk-down-", 1, 8, ".png"),
    8,
    true
  );
  player.animations.add(
    "walk-up",
    Phaser.Animation.generateFrameNames("walk-up-", 1, 8, ".png"),
    8,
    true
  );
  player.animations.add(
    "walk-right",
    Phaser.Animation.generateFrameNames("walk-side-", 1, 8, ".png"),
    8,
    true
  );
  player.animations.add(
    "walk-left",
    Phaser.Animation.generateFrameNames("walk-left-", 1, 8, ".png"),
    8,
    true
  );
  player.animations.add(
    "idle-down",
    Phaser.Animation.generateFrameNames("walk-down-", 3, 3, ".png"),
    8,
    true
  );
  player.animations.add(
    "idle-up",
    Phaser.Animation.generateFrameNames("walk-up-", 3, 3, ".png"),
    8,
    true
  );
  player.animations.add(
    "idle-right",
    Phaser.Animation.generateFrameNames("walk-side-", 3, 3, ".png"),
    8,
    true
  );
  player.animations.add(
    "idle-left",
    Phaser.Animation.generateFrameNames("walk-left-", 3, 3, ".png"),
    8,
    true
  );

  //-------------------- Add example weapon --------------------
  default_sword = game.add.group();
  default_sword.enableBody = true;

  //-------------------- Add example enemies --------------------
  lizard = game.add.physicsGroup(Phaser.Physics.ARCADE);
  lizard.enableBody = true;

  new_nme = lizard.create(600, 142, "lizard", "lizard_m_idle_anim_f0.png");
  new_nme.health = 3;
  big_guy = lizard.create(600, 200, "big_guy", "big_demon_idle_anim_f3.png");
  var big_guy_tween = game.add.tween(big_guy);
  big_guy_tween.to({ x: 700, y: 200 }, 1000, null, true, 0, -1, true);

  big_guy.animations.add(
    "idle",
    Phaser.Animation.generateFrameNames("big_demon_idle_anim_f", 0, 3, ".png"),
    10,
    true
  );
  big_guy.animations.add(
    "run",
    Phaser.Animation.generateFrameNames("big_demon_run_anim_f", 0, 3, ".png"),
    10,
    true
  );
  big_guy.animations.play("run");

  new_nme.animations.add(
    "idle",
    Phaser.Animation.generateFrameNames("lizard_m_idle_anim_f", 0, 3, ".png"),
    10,
    true
  );
  new_nme.animations.add(
    "run",
    Phaser.Animation.generateFrameNames("lizard_m_run_anim_f", 0, 3, ".png"),
    10,
    true
  );

  new_nme.animations.play("run");
  new_nme.body.velocity.x = 120;
  new_nme.body.bounce.set(-1);

  //-------------------- Physics engine and control setting --------------------
  game.physics.arcade.enable(player, Phaser.Physics.ARCADE);
  game.physics.arcade.enable(lizard, Phaser.Physics.ARCADE);
  game.world.setBounds(0, 0, 16 * 100, 16 * 100);
  game.camera.follow(player);

  cursors = game.input.keyboard.createCursorKeys();
  cursors.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  //Adding function key for items "F"
  cursors.f = game.input.keyboard.addKey(Phaser.Keyboard.F);

  //-------------------- Adding player weapons and dictionary --------------------
  player.current_item = {
    name: "sword",
    group: default_sword,
    src: "sword_spritesheet.png",
    dmg: 1,
    quantity: 1,
  };

  //-------------------- Chest example --------------------
  chest = game.add.group();
  chest.enableBody = true;

  const new_chest = chest.create(
    50,
    200,
    "chest",
    "chest_empty_open_anim_f0.png"
  );
  new_chest.body.immovable = true;
  new_chest.opened = false;
  new_chest.item = {
    name: "potion",
  };
  new_chest.animations.add(
    "open",
    Phaser.Animation.generateFrameNames(
      "chest_empty_open_anim_f",
      0,
      2,
      ".png"
    ),
    10,
    false
  );











  // potion_set.animations.add(
  //   "health",
  //   Phaser.Animation.generateFrameNames("health_pot_", 1, 4, ".png"),
  //   10,
  //   true
  // );
  // potion_set.animations.add(
  //   "speed",
  //   Phaser.Animation.generateFrameNames("speed_pot_", 1, 4, ".png"),
  //   10,
  //   true
  // );
  // potion_set.animations.add(
  //   "attack",
  //   Phaser.Animation.generateFrameNames("strength_pot_", 1, 4, ".png"),
  //   10,
  //   true
  // );
  potion_set = game.add.group()












}

function update() {
  //Current item is speed potions
  if (cursors.f.downDuration(1) && !keyReset) {
    keyReset = true;
    player.current_item = "Health_Potion"
    if (
      player.current_item == "Speed_Potion" ||
      player.current_item == "Health_Potion" ||
      player.current_item == "Attack_Potion"
    ) {
      use_potion(player, player.current_item);
    }
  }
  if (!cursors.f.isDown) {
    keyReset = false;
  }










  game.physics.arcade.collide(player, walls);
  game.physics.arcade.collide(lizard, walls, lizard_turn_around, null, this);
  game.physics.arcade.collide(
    default_sword,
    lizard,
    function test(default_sword, lizard) {
      if (lizard.health <= 0) {
        lizard.kill();
      }
      lizard.health -= player.current_item["dmg"];
      console.log(lizard.health);
    },
    null,
    this
  );
  game.physics.arcade.collide(player, chest, open_chest, null, this);

  var speed;
  if (player.potion_status == "Speed Potion") {
    console.log("Speed effect is active");
    speed = 500;
  } else {
    speed = 175;
    console.log("Speed is inactive");
  }
  idle_direction = ["idle-left", "idle-right", "idle-up", "idle-down"];

  if (!player.swing) {
    if (cursors.left.isDown) {
      player_facing = 0;
      player.body.velocity.x = -speed;
      player.animations.play("walk-left", true);
    } else if (cursors.right.isDown) {
      player_facing = 1;
      player.body.velocity.x = speed;
      player.animations.play("walk-right", true);
    } else if (cursors.down.isDown) {
      player_facing = 3;
      player.body.velocity.y = speed;
      player.animations.play("walk-down", true);
    } else if (cursors.up.isDown) {
      player_facing = 2;
      player.body.velocity.y = -speed;
      player.animations.play("walk-up", true);
    } else {
      player.animations.play(idle_direction[player_facing]);
      player.body.velocity.x = 0;
      player.body.velocity.y = 0;
    }
  } else {
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;
  }

  if (cursors.space.downDuration(100) && !keyReset) {
    keyReset = true;
    swing_default_sword(player);
  }
  if (!cursors.space.isDown) {
    keyReset = false;
  }
}

function render() {
  game.debug.bodyInfo(player, 32, 32);
  // game.debug.body(player);
  game.debug.body(new_nme);
  if (weapon) {
    game.debug.body(weapon);
  }
}
// ~~~~~
function lizard_turn_around(enemy, walls) {
  current = enemy.body.velocity.x;
  lizard_direction *= -1;
  enemy.body.velocity.x = -current;
}

function swing_default_sword(player) {
  player.body.velocity.x = 0;
  player.body.velocity.y = 0;
  player.swing = true;

  // Left
  if (player_facing == 0) {
    weapon = default_sword.create(
      player.position.x - 10,
      player.position.y + 16,
      "sword",
      "weapon_regular_sword_left.png"
    );
  }
  // Right
  else if (player_facing == 1) {
    weapon = default_sword.create(
      player.position.x + 22,
      player.position.y + 16,
      "sword",
      "weapon_regular_sword_right.png"
    );
  }
  // Up
  else if (player_facing == 2) {
    weapon = default_sword.create(
      player.position.x + 11,
      player.position.y - 14,
      "sword",
      "weapon_regular_sword_up.png"
    );
  }
  // Down
  else if (player_facing == 3) {
    weapon = default_sword.create(
      player.position.x + 11,
      player.position.y + 24,
      "sword",
      "weapon_regular_sword_down.png"
    );
  }
  weapon.body.immovable = true;

  var event = game.time.events.add(
    Phaser.Timer.SECOND * 0.2,
    sheath_sword,
    this,
    [weapon]
  );
}

function sheath_sword(weapon) {
  weapon[0].kill();
  player.swing = false;
}

function open_chest(player, chest) {
  if (!chest.opened) {
    chest.opened = true;
    chest.animations.play("open");
    game.add.image(50, 200 - 15, "heart");
  }
}










//~~~~~ Potion effects

function use_potion(player, potion) {
  player.body.velocity.x = 0;
  player.body.velocity.y = 0;
  player.swing = true;

  if (potion == "Health_Potion") {
    potion_sprite = game.add.sprite(
      player.position.x + 8,
      player.position.y - 4,
      "potion_set",
      "health_pot_1.png"
    );

    potion_sprite.animations.add(
      "health",
      Phaser.Animation.generateFrameNames("health_pot_", 1, 4, ".png"),
      10,
      true
    );

    potion_sprite.play('health', 10, true);

    potion_sprite.lifespan = 500;
    console.log(player.health);
    console.log("Health Potion used");
    player.health = player.health + 2;
    console.log(player.health);
  }



  if (potion == "Speed_Potion") {
    potion_sprite = game.add.sprite(
      player.position.x + 8,
      player.position.y - 4,
      "potion_set"
    );

    potion_sprite.animations.add('speed');
    potion_sprite.play('speed', 10, true);


    potion_sprite.lifespan = 500;
    player.potion_status = "Speed Potion";
    console.log("Speed Potion Used");
    game.time.events.add(
      10000,
      function (player) {
        console.log("Getting rid of speed");
        player[0].potion_status = "default";
        console.log("No more speed");
      },
      this,
      [player]
    );
  }
  if (potion == "Attack_Potion") {
    potion_sprite = game.add.sprite(
      //.animations.play('animation key')
      player.position.x + 8,
      player.position.y - 4,
      "potion_set",
      "strength_pot_1.png"
    );
    potion_sprite.animations.add('attack');
    potion_sprite.play('attack', 10, true);

    potion_sprite.lifespan = 500;
    player.potion_status = "Attack Potion";
    console.log("Attack Potion Used");
    game.time.events.add(
      10000,
      function (player) {
        console.log("Getting rid of attack");
        player[0].currentState = "default";
      },
      this,
      [player]
    );
  }
  var event = game.time.events.add(
    Phaser.Timer.SECOND * 0.5,
    potion_gone,
    this
  );
  function potion_gone() {
    player.swing = false;
  }
}
