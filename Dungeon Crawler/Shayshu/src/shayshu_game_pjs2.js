const game = new Phaser.Game(
    800,
    600, Phaser.AUTO, '', {
        preload: preload,
        create: create,
        update: update,
        render: render
    }
)


var map
var ground
var walls
var player
var cursors
var player_facing = 3
var lizard
var lizard_direction = 1
var new_nme


function preload() {
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

    // this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    // this.game.scale.setUserScale(2, 2);
}

function create() {
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
}

function update() {
    game.physics.arcade.collide(player, walls)
    game.physics.arcade.collide(lizard, walls, lizard_turn_around, null, this)
    game.physics.arcade.collide(player, lizard, function test(player, lizard) { console.log('player x lizard collision') }, null, this)

    var speed = 175
    idle_direction = ['idle-left', 'idle-right', 'idle-up', 'idle-down']


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

    } else {
        player.animations.play(idle_direction[player_facing])
        player.body.velocity.x = 0
        player.body.velocity.y = 0

    }

}

function render() {
    game.debug.bodyInfo(player, 32, 32);
    game.debug.body(player);
    // game.debug.body(new_nme)
}

function lizard_turn_around(enemy, walls) {
    current = enemy.body.velocity.x
    if (lizard_direction == 1) {
        enemy.scale.setTo(-1, 1)
        enemy.body.offset.x = -16
    } else {
        enemy.scale.setTo(1, 1)
        enemy.body.offset.x = 0
    }
    lizard_direction *= -1
    enemy.body.velocity.x = -current
}