const game = new Phaser.Game(
    800,
    600, Phaser.AUTO, '', {
        preload: preload,
        create: create,
        update: update
    }
)

function preload(){
    game.load.image('blankSquare', '../Assets/General assets/blankSquare.png')
    game.load.image('arrow', '../Assets/General assets/arrow_left.png')
    game.load.image('backpack', '../Assets/General assets/inventory.png')
}

function create(){
    inventory = [];
    // this.add.image(50, 50, 'blankSquare');
	// this.add.image(310, 100, 'blankSquare');
	// this.add.image(520, 100, 'blankSquare');
    this.add.image(0,0,'backpack');
    //game.add.sprite(0, 0, 'blankSquare');

    var group = game.add.group();

    group.inputEnableChildren = true;

    var arrow = group.create(50, 50, 'arrow')

    arrow.inputEnabled = true;
    arrow.input.enableDrag();
    arrow.events.onDragStart.add(onDragStart, this);
    arrow.events.onDragStop.add(onDragStop, this);

    function onDragStart(sprite, pointer) {

        result = "Dragging " + sprite.key;
    
    }
    
    function onDragStop(sprite, pointer) {
    
        console.log(sprite.key + " dropped at x:" + pointer.x + " y: " + pointer.y)
    
    }
}
function update(){
    
}