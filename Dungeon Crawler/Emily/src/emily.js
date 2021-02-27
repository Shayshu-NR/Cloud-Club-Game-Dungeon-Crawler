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

    var arrow = item.create(70, 70, 'arrow')
    var shoe = item.create(140, 70, 'boots')
    shoe.inputEnabled = true;
    shoe.input.enableDrag();
    shoe.events.onDragStart.add(onDragStart, this);
    shoe.events.onDragStop.add(onDragStop, this);

    arrow.inputEnabled = true;
    arrow.input.enableDrag();
    arrow.events.onDragStart.add(onDragStart, this);
    arrow.events.onDragStop.add(onDragStop, this);

    //initializing backpack interface with items
    // bpList = Object.keys(player.backpack)
    // count = 0;
    // for  (var i = 1; i <= 4; i++){
    //     for (var j = 1; j <= 4; j++){
    //         player.backpack[bpList[count]]["group"] = item.create(i*70,j*70,bpList[count])
    //         player.backpack[bpList[count]]["group"].inputEnabled = true;
    //         player.backpack[bpList[count]]["group"].input.enableDrag();
    //         player.backpack[bpList[count]]["group"].events.onDragStart.add(onDragStart, this);
    //         player.backpack[bpList[count]]["group"].events.onDragStop.add(onDragStop, this);
    //         count++;
    //     }
    
    function onDragStart(sprite, pointer) {
        console.log("Dragging " + sprite.key);
        sprite.input.enableSnap(70, 70, false, true);
        
    }
    
    function onDragStop(sprite, pointer) {
        console.log(sprite.x+ ", "+sprite.y);
    }
}
function update(){
    
}