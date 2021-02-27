const game = new Phaser.Game(
    800,
    600, Phaser.AUTO, '', {
        preload: preload,
        create: create,
        update: update
    }
)

var inventory

function preload(){
    game.load.image('boots', '../Assets/General assets/Skill Tree/speed.png')
    game.load.image('arrow', '../Assets/General assets/Skill Tree/atks.png')
    game.load.image('backpack', '../Assets/General assets/backpack.png')
}

function create(){

    inventory = []

    for(var i = 0; i < 4; i++){
        inventory.push([])
        for(var j = 0; j < 4; j++){
            inventory[i][j] = 0
        }
    }

    this.add.image(50,50,'backpack');

    var item = game.add.group();

    item.inputEnableChildren = true;

    var arrow = item.create(70, 70, 'arrow')
    var shoe = item.create(140, 70, 'boots')

    arrow.inv = [0, 0]
    shoe.inv = [1, 0]

    inventory[0][0] = 1
    inventory[0][1] = 1

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
        var inv_x = (sprite.x / 70) - 1
        var inv_y = (sprite.y / 70) - 1
        console.log(sprite.x+ ", "+sprite.y);

        if(inventory[inv_y][inv_x] === 1){
            sprite.position.x = (sprite.inv[0] + 1)*70
            sprite.position.y = (sprite.inv[1] + 1)*70
            return
        }
        else{
            inventory[sprite.inv[1]][sprite.inv[0]] = 0
            inventory[inv_y][inv_x] = 1

            sprite.inv[0] = inv_x
            sprite.inv[1] = inv_y
        }
        

    }
}
function update(){
    
}