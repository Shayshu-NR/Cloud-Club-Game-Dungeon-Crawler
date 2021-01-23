var config = {
    type: Phaser.AUTO,
    width: 400,
    height: 250,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    scale: { zoom: 2 }
};

var game = new Phaser.Game(config);
var cursors

function preload() {
    this.load.image('tiles', '../Assets/Example assets/0x72_DungeonTilesetII_v1.3.1/0x72_DungeonTilesetII_v1.3.png')
    this.load.tilemapTiledJSON('example_map', '../Assets/Example assets/Tiled Map/Example_tile.json')
    this.load.atlas('player',
        '../Assets/Example assets/legend of faune files/spritesheet.png',
        '../Assets/Example assets/legend of faune files/faun_spritesheet.json')
}

function create() {
    //~~~~~ Add a tilemap and tile set to the game ~~~~~
    const map = this.make.tilemap({ key: 'example_map' })
    const tileset = map.addTilesetImage('dungeon', 'tiles')
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    //~~~~~ From the tilemap create the layer called ground and walls
    map.createLayer('Ground', tileset)
    const walls = map.createLayer('Walls', tileset)
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    //~~~~~ In the walls layer make all the elements where collides was set
    // be recognizable to phaser ~~~~~
    walls.setCollisionByProperty({ collides: true })
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    //~~~~~ Add the player as a physics object ~~~~~
    this.player = this.physics.add.sprite(128, 128, 'player', 'walk-down-3.png')
    this.player.body.setSize(this.player.width / 2, this.player.height / 2)
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    //~~~~~ Add animations ~~~~~
    this.anims.create({
        key: 'idle-down',
        frames: [{ key: 'player', frame: 'walk-down-3.png' }]
    })
    this.anims.create({
        key: 'idle-up',
        frames: [{ key: 'player', frame: 'walk-up-3.png' }]
    })
    this.anims.create({
        key: 'idle-side',
        frames: [{ key: 'player', frame: 'walk-side-3.png' }]
    })
    this.anims.create({
        key: 'walk-down',
        frames: this.anims.generateFrameNames('player', { start: 1, end: 8, prefix: 'walk-down-', suffix: '.png' }, ),
        repeat: -1,
        frameRate: 8
    })
    this.anims.create({
        key: 'walk-side',
        frames: this.anims.generateFrameNames('player', { start: 1, end: 8, prefix: 'walk-side-', suffix: '.png' }, ),
        repeat: -1,
        frameRate: 8
    })
    this.anims.create({
        key: 'walk-up',
        frames: this.anims.generateFrameNames('player', { start: 1, end: 8, prefix: 'walk-up-', suffix: '.png' }, ),
        repeat: -1,
        frameRate: 8
    })
    this.player.anims.play('idle-down')
        //~~~~~~~~~~~~~~~~~~~~~~~~~~

    this.physics.add.collider(this.player, walls)

    const debugGraphics = this.add.graphics().setAlpha(0.7)
    walls.renderDebug(debugGraphics, {
        tileColor: null,
        collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
        faceColor: new Phaser.Display.Color(40, 39, 37, 255)
    })

    this.cameras.main.startFollow(this.player, true)
    cursors = this.input.keyboard.createCursorKeys()



}

function update() {
    var speed = 175
    idle_direction = ['idle-side', 'idle-side', 'idle-up', 'idle-down']


    if (cursors.left.isDown) {
        this.player.setVelocity(-speed, 0)
        this.player.scaleX = -1
        this.player.body.offset.x = 24
        this.player.anims.play('walk-side', true)

    } else if (cursors.right.isDown) {
        this.player.setVelocity(speed, 0)
        this.player.scaleX = 1
        this.player.body.offset.x = 8
        this.player.anims.play('walk-side', true)

    } else if (cursors.down.isDown) {
        this.player.setVelocity(0, speed)
        this.player.anims.play('walk-down', true)

    } else if (cursors.up.isDown) {
        this.player.setVelocity(0, -speed)
        this.player.anims.play('walk-up', true)

    } else {
        this.player.anims.play('idle-down')
        this.player.setVelocity(0, 0)

    }

}