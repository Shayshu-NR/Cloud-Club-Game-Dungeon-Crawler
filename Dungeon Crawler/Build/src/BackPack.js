var cursors
maingame.BackPack = function(game){

};

maingame.BackPack.prototype = {
        preload: function() {
                game.load.image('boots', '../Assets/General assets/Skill Tree/speed.png')
                game.load.image('arrow', '../Assets/General assets/Skill Tree/atks.png')
                game.load.image('backpack', '../Assets/General assets/backpack.png')
                game.load.image('actives', '../Assets/General assets/ActiveItems.png')
                game.load.image('button', '../Assets/General assets/Grass.png')
        },
    
        create: function() {
                cursors = game.input.keyboard.createCursorKeys()
                cursors.bckpck = game.input.keyboard.addKey(Phaser.Keyboard.B)
                button = game.add.button(500, 70, 'button', actionOnClick, this, 2, 1, 0);

                inventory = []
                actives = Array(3).fill(0);

                for(var i = 0; i < 4; i++){
                        inventory.push([])
                        for(var j = 0; j < 4; j++){
                        inventory[i][j] = 0
                        }
                }

                this.add.image(50,50,'backpack');
                this.add.image(50,400,'actives')

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
                //         player.backpack[bpList[count]]["group"].inv_x = i
                //         player.backpack[bpList[count]]["group"].inv_y = j
                //         count++;
                //     }
                // }

                //initializing active items interface 
                // for (var i = 1; i <=3; i++){
                //     player.active_items[i-1]["group"] = item.create(i*70,70*5,bpList[i-1])
                //     player.active_items[i-1]["group"].inputEnabled = true;
                //     player.active_items[i-1]["group"].input.enableDrag();
                //     player.active_items[i-1]["group"].events.onDragStart.add(onDragStart, this);
                //     player.active_items[i-1]["group"].events.onDragStop.add(onDragStop, this);
                //     player.active_items[i-1]["group"].inv_x = i
                //     player.active_items[i-1]["group"].inv_y = 5
                //     actives[i-1] = 1
                // }
                
                function actionOnClick () {
                        console.log("return to game")
                        game.state.start("Game");
                }
                function onDragStart(sprite, pointer) {
                        console.log("Dragging " + sprite.key);
                        sprite.input.enableSnap(70, 70, false, true);
                        
                }
                
                function onDragStop(sprite, pointer) {
                        var inv_x = (sprite.x / 70) - 1
                        var inv_y = (sprite.y / 70) - 1
                        console.log(sprite.x+ ", "+sprite.y);
                        console.log(inventory);
                        console.log(actives)

                        if (inv_y == 5 && inv_x >= 3 || inv_x >= 4 || inv_y >= 4 && (inv_y != 5)|| inv_x < 0 || inv_y < 0){
                                //move it back / fail
                                sprite.position.x = (sprite.inv[0] + 1)*70
                                sprite.position.y = (sprite.inv[1] + 1)*70
                                return
                        } else if (inv_y == 5){
                                act_x = inv_x;
                                if (actives[act_x] == 1){
                                        //move it back/fail
                                        sprite.position.x = (sprite.inv[0] + 1)*70
                                        sprite.position.y = (sprite.inv[1] + 1)*70
                                        return
                                } else {
                                        if (sprite.inv[1] == 5){
                                        actives[sprite.inv[0]] = 0
                                        } else {
                                        inventory[sprite.inv[1]][sprite.inv[0]] = 0
                                        }
                                        actives[act_x] = 1
                                        sprite.inv[0] = inv_x
                                        sprite.inv[1] = inv_y
                                        return
                                }
                        } else if (inventory[inv_y][inv_x] === 1){
                                //move it back / fail
                                sprite.position.x = (sprite.inv[0] + 1)*70
                                sprite.position.y = (sprite.inv[1] + 1)*70
                                return
                        } else{
                                //can move item with success
                                if (sprite.inv[1] == 5){
                                        actives[sprite.inv[0]] = 0
                                } else {
                                        inventory[sprite.inv[1]][sprite.inv[0]] = 0
                                }
                                inventory[inv_y][inv_x] = 1
                                sprite.inv[0] = inv_x
                                sprite.inv[1] = inv_y
                                return
                        }
                }
        },
    
        update: function() {
                if(cursors.bckpck.isDown){
                        game.state.start("Game");
                }

        }
    
}