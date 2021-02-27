const game = new Phaser.Game(
    800,
    600, Phaser.AUTO, '', {
        preload: preload,
        create: create,
        update: update
    }
)

function preload(){
    game.load.image('boots', '../Assets/General assets/Skill Tree/speed.png')
    game.load.image('arrow', '../Assets/General assets/Skill Tree/atks.png')
    game.load.image('backpack', '../Assets/General assets/backpack.png')
}

function create(){

    this.add.image(50,50,'backpack');

    var item = game.add.group();

    item.inputEnableChildren = true;

    var arrow = item.create(50, 50, 'arrow')
    var shoe = item.create(100,100, 'boots')
    shoe.inputEnabled = true;
    shoe.input.enableDrag();
    shoe.events.onDragStart.add(onDragStart, this);
    shoe.events.onDragStop.add(onDragStop, this);

    arrow.inputEnabled = true;
    arrow.input.enableDrag();
    arrow.events.onDragStart.add(onDragStart, this);
    arrow.events.onDragStop.add(onDragStop, this);

    // for  ( i; i < player.backpack; i++){

    // }
    function onDragStart(sprite, pointer) {
        console.log("Dragging " + sprite.key);
    }
    
    function onDragStop(sprite, pointer) {
        console.log(sprite.key + " dropped at x:" + pointer.x + " y: " + pointer.y);
    }
}
function update(){
    
}