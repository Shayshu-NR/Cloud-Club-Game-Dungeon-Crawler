


var map
var ground
var walls
var player
var cursors
var player_facing = 3
var lizard
var lizard_direction = 1
var new_nme
//~~~~~~~~~~~~~~~~~~~~~
var lastLevelPoints = 0
var maxXpPoints = 0
var xp_bar
var bar
var lvltxt1
var lvltxt2
var health_bars
var ammo_bar
//~~~~~~~~~~~~~~~~~~~~~

var maingame = {}
maingame.gabriellegame = function(game){

};

maingame.gabriellegame.prototype = {
    preload: function() {
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
    
        this.load.image('xp_bar',
        '../Gabrielle/src/Assets/bar-filler.png')

        this.load.image('bar',
        '../Gabrielle/src/Assets/Bar.png')

        this.load.image('health_heart',
        '../Gabrielle/src/Assets/heart.png')

        this.load.image('health_heart2',
        '../Gabrielle/src/Assets/heart2.png')
        this.load.image('ammo_fire',
        '../Gabrielle/src/Assets/fire.png')
        
        this.load.image('bpack',
        '../Gabrielle/src/Assets/back-pack.png')

        
    },
    
    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE)
    
        map = game.add.tilemap('example_map')
        map.addTilesetImage('dungeon', 'tiles')
    
        

        ground = map.createLayer('Ground')
        walls = map.createLayer('Walls')
        ground.scale.set(1)
        walls.scale.set(1)
        map.setCollisionBetween(1, 999, true, 'Walls')
    
        player = game.add.sprite(128, 128, 'player', 'walk-down-3.png')
    
        player.animations.add(
            'walk-down',
            Phaser.Animation.generateFrameNames(
                'walk-down-',
                1,
                8,
                '.png'
            ),
            8,
            true
        )
        player.animations.add(
            'walk-up',
            Phaser.Animation.generateFrameNames(
                'walk-up-',
                1,
                8,
                '.png'
            ),
            8,
            true
        )
        player.animations.add(
            'walk-right',
            Phaser.Animation.generateFrameNames(
                'walk-side-',
                1,
                8,
                '.png'
            ),
            8,
            true
        )
        player.animations.add(
            'walk-left',
            Phaser.Animation.generateFrameNames(
                'walk-left-',
                1,
                8,
                '.png'
            ),
            8,
            true
        )
        player.animations.add(
            'idle-down',
            Phaser.Animation.generateFrameNames(
                'walk-down-',
                3,
                3,
                '.png'
            ),
            8,
            true
        )
        player.animations.add(
            'idle-up',
            Phaser.Animation.generateFrameNames(
                'walk-up-',
                3,
                3,
                '.png'
            ),
            8,
            true
        )
        player.animations.add(
            'idle-right',
            Phaser.Animation.generateFrameNames(
                'walk-side-',
                3,
                3,
                '.png'
            ),
            8,
            true
        )
        player.animations.add(
            'idle-left',
            Phaser.Animation.generateFrameNames(
                'walk-left-',
                3,
                3,
                '.png'
            ),
            8,
            true
        )
        
        var statics = game.add.physicsGroup(Phaser.Physics.ARCADE)
        bars = game.add.physicsGroup(Phaser.Physics.ARCADE);

        var stats = statics.create(5,560,'bpack','back-pack.png')
        

        var bar_holder = statics.create(59,550,'bar','Bar.png')
        xp_bar = bars.create(67,552,'xp_bar','bar-filler.png') 
        bar_holder.fixedToCamera = true
        xp_bar.fixedToCamera = true
        player.exp = 0
        player.level = 1
        player.getCurrentLevel = function () {
            player.level = Math.floor(Math.pow((player.exp / 100.0), 2.0 / 3.0)) + 1
            return player.level
        }
        bar_holder.scale.set(8,2)
        xp_bar.scale.set(player.exp/maxXpPoints*8,2)

        

        lvltxt1 = game.add.text(59, 534,'', { fontSize: '16px', fill: '#FFFFFF' })
        lvltxt1.text = ''+player.level;

        lvltxt2 = game.add.text(690, 534,'', { fontSize: '16px', fill: '#FFFFFF' })
        lvltxt2.text = ''+(player.level+1);

        lvltxt1.fixedToCamera = true
        lvltxt2.fixedToCamera = true

        //health-bar set-up
        health_bars = [null,null,null,null,null,null,null,null,null,null,null]
        for(var i = 0; i < 10; i++){
            health_bars[i] = bars.create(i*16,1,'health_heart','heart.png')
            health_bars[i].fixedToCamera = true
            //health_bars[i].animations.add('blink', [2, 1, 2, 1, 2], 15, true) 
            
        }
        player.health = 10

        //ammo set up
        player.ammo = 10
        ammo_bars = [null,null,null,null,null,null,null,null,null,null,null]
        for(var i = 0; i < 10; i++){
            ammo_bars[i] = bars.create(i*16,20,'ammo_fire','fire.png')
            ammo_bars[i].fixedToCamera = true

        }


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
        cursors.bckpck = game.input.keyboard.addKey(Phaser.Keyboard.I)
        cursors.map = game.input.keyboard.addKey(Phaser.Keyboard.M)
        //dummy letters
        cursors.dummy = game.input.keyboard.addKey(Phaser.Keyboard.D)
        cursors.collide = game.input.keyboard.addKey(Phaser.Keyboard.C)

        maxXpPoints = 100
    },
    
    update: function() {
        game.physics.arcade.collide(player, walls)
        game.physics.arcade.collide(lizard, walls, lizard_turn_around, null, this)
        //game.physics.arcade.overlap(player, lizard, kill_player(player), null, this)
    
        var speed = 175
        idle_direction = ['idle-left', 'idle-right', 'idle-up', 'idle-down']
    
        
        
        if(cursors.bckpck.isDown){
            game.state.start("Backpack");
            console.log("in backpack state")
        }
        if(cursors.map.isDown){
            game.state.start("Map");
            console.log("In map state")
        }
        if(cursors.dummy.isDown){
            add_xp(player,1)
            //console.log("points",player.exp)
        }
        if(cursors.collide.isDown){
            kill_player(player,1)
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
        //point checking 
        if ((player.exp-lastLevelPoints) >= maxXpPoints) {
            level_up(player)
            add_health(player,3)
        }
        
       xp_bar.scale.set((player.exp-lastLevelPoints)/(maxXpPoints)*8,2) //horizontant scale by 8 and vertical by 2
        //console.log(player.exp,' ', lastLevelPoints)
        //console.log(' ',maxXpPoints)
    },
    
    render: function() {
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

function level_up(player){
    
    player.getCurrentLevel()
    
    console.log('Reached level', player.level)
    lastLevelPoints = player.exp
    maxXpPoints = 100*(player.level)^1.5 

    lvltxt1.text = ''+ player.level;
    lvltxt2.text = ''+(player.level+1);
}

function kill_player(player,amount){
    for(i=0;i<amount;i++){
        if(player.health>0)
        {
    player.health--
    //health_bars[i].animations.play('blink')
    health_bars[player.health].kill()
    console.log("health down")
        }
        
    }
}

//if different number of health is added simply add parameter and for loop
function add_health(player, amount){
    for(i = 0; i< amount;i++){
        if(player.health<10){
            health_bars[player.health] = null
            health_bars[player.health] = bars.create(player.health*16,1,'health_heart','heart.png')
        
            health_bars[player.health].fixedToCamera = true
            player.health++
        }
        else
            break
    }
}

//add parameter for how much ammo added
function add_ammo(player, amount){
    for(i = 0; i<amount;i++){
        if(player.ammo<10){
            ammo_bars[player.ammo] = null
            ammo_bars[player.ammo] = bars.create(player.ammo*16,1,'ammo_fire','fire.png')
            ammo_bars[player.ammo].fixedToCamera = true
            player.ammo++
        }
    }
}

function ammo_used(player,amount){
    if(player.ammo>0)
    {
    player.ammo--
    //health_bars[player.health]
    ammo_bars[player.ammo].kill()
    console.log("ammo down")
    }
}

function add_xp(player,xp_num){
    player.exp+=xp_num
   // console.log(phaser.camera)   
}
