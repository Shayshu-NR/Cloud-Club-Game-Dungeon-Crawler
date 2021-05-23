var map
var ground
var walls
var water
var player
var cursors
var player_facing = 3
var lizard
var lizard_direction = 1
var new_nme
//~~~~~~~~~~~~~~~~~~~~~
var lastLevelPoints = 0
var maxXpPoints = 100
var xp_bar
var bar
var lvltxt1
var lvltxt2
var health_bars
var ammo_bar
var bckpack
var inwatertimer
var waterTimerLoop
var tile
var chest
var statics
var potion
//~~~~~~~~~~~~~~~~~~~~~
var gameTimer
var gameTimerLoop

var water_counter = 0

var maingame = {}
maingame.gabriellegame = function (game) {

};

maingame.gabriellegame.prototype = {
    preload: function () {
        this.load.image('tilescon',
            '../Assets/Example assets/0x72_DungeonTilesetII_v1.3.1/0x72_DungeonTilesetII_v1.3.png')

        this.load.tilemap('example_map',
            '../Assets/Example assets/Tiled Map/Example_tile.json',
            null,
            Phaser.Tilemap.TILED_JSON)

        this.load.tilemap('cnTower',
            '../Assets/General assets/CN Tower/CNTower_Map_col_Ex.json',
            null,
            Phaser.Tilemap.TILED_JSON)

        this.load.image('cnTower_tiles',
            '../Assets/General assets/CN Tower/CNTower_StructureTileset.png'
        )

        this.load.tilemap('rpAquarium',
            '../Assets/General assets/Ripleys Aquarium/ripleys-aquarium-map.json',
            null,
            Phaser.Tilemap.TILED_JSON)

        this.load.image('rpAquarium_tiles',
            '../Assets/General assets/Ripleys Aquarium/tileset.png')

        this.load.atlas('player',
            '../Assets/Example assets/legend of faune files/spritesheet.png',
            '../Assets/Example assets/legend of faune files/faun_spritesheet.json')

        this.load.atlas('lizard',
            '../Assets/Example assets/0x72_DungeonTilesetII_v1.3.1/Spritesheets/lizard_spritesheet.png',
            '../Assets/Example assets/0x72_DungeonTilesetII_v1.3.1/Spritesheets/lizard.json')

        this.load.image('xp_bar',
            '../Gabrielle/src/Assets/bar-filler.png')

        this.load.image('bar',
            '../Gabrielle/src/Assets/Bar.png')

        this.load.image('health_heart',
            '../Gabrielle/src/Assets/heart.png')

        this.load.image('ammo_fire',
            '../Gabrielle/src/Assets/fire.png')

        this.load.image('bpack',
            '../Assets/General assets/backpack-icon.png')

        // this.load.atlas('chest',
        //     '../Assets/Example assets/0x72_DungeonTilesetII_v1.3.1/Spritesheets/chest_spritesheet.png',
        //     '../Assets/Example assets/0x72_DungeonTilesetII_v1.3.1/Spritesheets/chest.json')

        this.load.spritesheet('chest', '../Gabrielle/src/Assets/chest.png',
            32, 32);

        this.load.atlas(
            "potion_set",
            "../Assets/General assets/Potions/potions.png",
            "../Assets/General assets/Potions/potions.json"
        );
        this.load.atlas('eng',
            '../Assets/General assets/Player/main-character.png',
            '../Assets/General assets/Player/main-character.json'
        )

    },

    create: function () {

        game.physics.startSystem(Phaser.Physics.ARCADE)

        //-------------------- Add tile map and tile set --------------------
        map = game.add.tilemap('rpAquarium')
        map.addTilesetImage('ripleys', 'rpAquarium_tiles')

        // //-------------------- Create layer --------------------
        water = map.createLayer('water')
        walls = map.createLayer('wall')
        ground = map.createLayer('ground')

        game.physics.arcade.enable(ground)
        game.physics.arcade.enable(walls)
        game.physics.arcade.enable(water)

        // //-------------------- Add wall colision --------------------
        map.setCollisionBetween(1, 9999, true, walls)

        var waterTileIndexes = [6]
        var groundTileIndexes = [4]

        player = game.add.sprite(750, 850, 'eng', 'idle_down.png')
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

        statics = game.add.physicsGroup(Phaser.Physics.ARCADE)
        bars = game.add.physicsGroup(Phaser.Physics.ARCADE);

        //bckpack = game.add.button(500, 70, 'button', actionOnClick, this, 2, 1, 0);


        var bar_holder = statics.create(59, 550, 'bar', 'Bar.png')
        xp_bar = bars.create(67, 552, 'xp_bar', 'bar-filler.png')
        bar_holder.fixedToCamera = true
        xp_bar.fixedToCamera = true
        player.exp = 0
        player.level = 1
        player.inWater = false

        player.getCurrentLevel = function () {
            player.level = Math.floor(Math.pow((player.exp / 100.0), 2.0 / 3.0)) + 1
            return player.level
        }
        bar_holder.scale.set(8, 2)
        xp_bar.scale.set(player.exp / maxXpPoints * 8, 2)

        bckpack = statics.create(5, 545, 'bpack', 'backpack-icon.png')
        bckpack.scale.set(0.6, 0.6)
        bckpack.fixedToCamera = true

        bckpack.inputEnabled = true
        bckpack.events.onInputDown.add(
            function openBackPack() {
                game.state.start("Backpack")
            }, this);

        lvltxt1 = game.add.text(59, 534, '', { fontSize: '16px', fill: '#FFFFFF' })
        lvltxt1.text = '' + player.level;

        lvltxt2 = game.add.text(690, 534, '', { fontSize: '16px', fill: '#FFFFFF' })
        lvltxt2.text = '' + (player.level + 1);

        lvltxt1.fixedToCamera = true
        lvltxt2.fixedToCamera = true

        //health-bar set-up
        player.health = 10
        health_bars = [null, null, null, null, null, null, null, null, null, null, null]
        for (var i = 0; i < player.health; i++) {
            health_bars[i] = bars.create(i * 16, 5, 'health_heart', 'heart.png')
            health_bars[i].fixedToCamera = true
            //health_bars[i].animations.add('blink', [2, 1, 2, 1, 2], 15, true) 

        }
        map.setTileIndexCallback([6], function wow() { console.log('It works!') }, this, 'water')

        //ammo set up
        player.ammo = 10
        ammo_bars = [null, null, null, null, null, null, null, null, null, null, null]
        for (var i = 0; i < player.ammo; i++) {
            ammo_bars[i] = bars.create(i * 16, 25, 'ammo_fire', 'fire.png')
            ammo_bars[i].fixedToCamera = true

        }

        inwatertimer = game.time.create(false)
        waterTimerLoop = inwatertimer.loop(5000, function intoWater() { player.health-- }, this)
        inwatertimer.start()
        inwatertimer.pause()

        map.setTileIndexCallback(indexes = groundTileIndexes,
            callback = function () {
                if (!inwatertimer.paused) {
                    inwatertimer.pause()
                }
            }, callbackContext = this, layer = ground)

        map.setTileIndexCallback(indexes = waterTileIndexes,
            callback = function () {
                if (inwatertimer.paused) {
                    inwatertimer.resume()
                }
            }, callbackContext = this, layer = water);

        //~~~~~~~~~~ chest creation ~~~~~~~~~~~~~~~~
        chest = statics.create(800, 850, 'chest', 0)

        game.physics.arcade.enable(chest, Phaser.Physics.ARCADE)
        chest.body.immovable = true
        chest.enableBody = true

        chest.item = {
            "name": "HealthPotion",
            "group": potion,
            "atlas": "potion_set",
            "src": "health_pot_1.png"
        }
        chest.collide = true

        // chest.animations.add('open', [0, 1, 2, 3, 4, 5, 6, 7], 300, false)
        // chest.animations.add('close', [7, 6, 5, 4, 3, 2], 300, false)

        lizard = game.add.physicsGroup(Phaser.Physics.ARCADE);
        lizard.enableBody = true
        new_nme = lizard.create(600, 142, 'lizard', 'lizard_m_idle_anim_f0.png')
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

        game.physics.arcade.enable(player, Phaser.Physics.ARCADE)
        game.physics.arcade.enable(lizard, Phaser.Physics.ARCADE)
        game.world.setBounds(0, 0, 16 * 100, 16 * 100)
        game.camera.follow(player)

        cursors = game.input.keyboard.createCursorKeys()
        cursors.bckpck = game.input.keyboard.addKey(Phaser.Keyboard.B)
        cursors.map = game.input.keyboard.addKey(Phaser.Keyboard.M)
        cursors.dummy = game.input.keyboard.addKey(Phaser.Keyboard.D)
        cursors.collide = game.input.keyboard.addKey(Phaser.Keyboard.C)



        /*~~~~~~~~ TIMER CREATION ~~~~~~~~*/
        gamerTimer = game.time.create(false)
        gameTimerLoop = inwatertimer.loop(1000, function setTime() {
            print("Time:", gameTimer);
        }, this)
    },

    update: function () {
        game.physics.arcade.collide(player, walls)
        game.physics.arcade.collide(player, chest, openChest, null, this)


        //game.physics.arcade.overlap(player, water,inWater(player),null,this)
        //game.physics.arcade.collide(lizard, walls, lizard_turn_around, null, this)
        //game.physics.arcade.overlap(player, lizard, kill_player(player), null, this)


        //Collision for the specific type of tile
        game.physics.arcade.collide(player, water)
        game.physics.arcade.collide(player, ground)

        var speed = 175
        idle_direction = ['idle-left', 'idle-right', 'idle-up', 'idle-down']

        if (cursors.bckpck.isDown) {
            game.state.start("Backpack");
            console.log("in backpack state")

        }
        if (cursors.map.isDown) {
            game.state.start("Map");
            console.log("In map state")
        }
        if (cursors.dummy.isDown) {
            add_xp(player, 1)
            //console.log("points",player.exp)
        }
        if (cursors.collide.isDown) {
            kill_player(player, 1)
        }

        if (cursors.left.isDown) {
            player_facing = 0
            player.body.velocity.x = -speed
            player.animations.play('walk-left', true)


        } else if (cursors.right.isDown) {
            player_facing = 1
            player.body.velocity.x = speed
            player.animations.play('walk-right', true)

        } else if (cursors.down.isDown) {
            player_facing = 3
            player.body.velocity.y = speed
            player.animations.play('walk-down', true)


        } else if (cursors.up.isDown) {
            player_facing = 2
            player.body.velocity.y = -speed
            player.animations.play('walk-up', true)

            //

        } else {
            player.animations.play(idle_direction[player_facing])
            player.body.velocity.x = 0
            player.body.velocity.y = 0

        }
        // Point checking 
        if ((player.exp - lastLevelPoints) >= maxXpPoints) {
            level_up(player)
            player.health++
        }

        xp_bar.scale.set((player.exp - lastLevelPoints) / (maxXpPoints) * 8, 2) //horizontant scale by 8 and vertical by 2
        //console.log(player.exp,' ', lastLevelPoints)
        //console.log(' ',maxXpPoints)

        change_health(player)
    },

    render: function () {
        game.debug.bodyInfo(player, 32, 32);
        game.debug.body(player);
        // game.debug.body(new_nme)
    }

}
function lizard_turn_around(enemy, walls) {
    current = enemy.body.velocity.x
    lizard_direction *= -1
    enemy.body.velocity.x = -current
}

function swing_default_sword(player) {
    player.body.velocity.x = 0
    player.body.velocity.y = 0
    player.swing = true

    // Left
    if (player_facing == 0) {
        weapon = default_sword.create(player.position.x - 10, player.position.y + 16, 'sword', 'weapon_regular_sword_left.png')
    }
    // Right
    else if (player_facing == 1) {
        weapon = default_sword.create(player.position.x + 22, player.position.y + 16, 'sword', 'weapon_regular_sword_right.png')
    }
    // Up
    else if (player_facing == 2) {
        weapon = default_sword.create(player.position.x + 11, player.position.y - 14, 'sword', 'weapon_regular_sword_up.png')

    }
    // Down
    else if (player_facing == 3) {
        weapon = default_sword.create(player.position.x + 11, player.position.y + 24, 'sword', 'weapon_regular_sword_down.png')
    }
    weapon.body.immovable = true

    var event = game.time.events.add(Phaser.Timer.SECOND * 0.2, sheath_sword, this, [weapon])
}

function sheath_sword(weapon) {
    weapon[0].kill()
    player.swing = false
}

function open_chest(player, chest) {
    if (!chest.opened) {
        chest.opened = true
        chest.animations.play('open')
        game.add.image(50, 200 - 15, 'heart')
    }
}

function openChest(player, chest) {
    if (chest.collide && chest.position.x < player.position.x) {
        chest.collide = false;
        chest.animations.play('open')
        var item = statics.create(chest.position.x + 8, chest.position.y + 8, chest.item.atlas, chest.item.src)

        game.time.events.add(Phaser.Timer.SECOND * 5, function collectItemFromChest(arr) {
            console.log(arr)
            arr[0].kill()
            player.putBackpack(chest.item)
        }, this, [item]);
    }
}

function level_up(player) {

    player.getCurrentLevel()

    console.log('Reached level', player.level)
    lastLevelPoints = player.exp
    maxXpPoints = 100 * (player.level) ^ 1.5

    lvltxt1.text = '' + player.level;
    lvltxt2.text = '' + (player.level + 1);
}


//add parameter for how much ammo added
function add_ammo(player, amount) {
    for (i = 0; i < amount; i++) {
        if (player.ammo < 10) {
            ammo_bars[player.ammo] = null
            ammo_bars[player.ammo] = bars.create(player.ammo * 16, 25, 'ammo_fire', 'fire.png')
            ammo_bars[player.ammo].fixedToCamera = true
            player.ammo++
        }
    }
}

function ammo_used(player, amount) {
    if (player.ammo > 0) {
        for (i = 0; i < amount; i++) {
            player.ammo--
            ammo_bars[player.ammo].kill()
            console.log("ammo down")
        }
    }
}

function add_xp(player, xp_num) {
    player.exp += xp_num
    // console.log(phaser.camera)   
}
function change_health(player) {
    if (player.health < 0 || player.health > 10) { //makes sure the array doesn't go out of bounds
        console.log("invalid health")
        player.health = 5
    }

    else if (health_bars[player.health] != null) { //if there is a
        for (i = player.health; i < 10; i++) {
            if (health_bars[i] != null) {
                health_bars[i].kill()
                health_bars[i] = null
            }
            // else
            //     break
        }
    }

    else {
        for (i = 0; i < player.health; i++) {
            if (health_bars[i] == null) {
                health_bars[i] = bars.create(i * 16, 5, 'health_heart', 'heart.png')
                health_bars[i].fixedToCamera = true
            }

        }
    }
}


