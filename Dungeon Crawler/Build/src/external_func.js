// ~~~~~
function lizard_turn_around(enemy, walls) {
    current = enemy.body.velocity.x
    lizard_direction *= -1
    enemy.body.velocity.x = -current
}

// Use the currently equipped weapon
function use_current_weapon() {

    if (player.current_item.weapon_type === "melee") {
        player.body.velocity.x = 0
        player.body.velocity.y = 0
        player.swing = true

        // Left
        if (player_facing == 0) {
            weapon = default_sword.create(player.position.x - 10, player.position.y + 16, player.current_item.atlas, player.current_item.frames[0]);
        }
        // Right
        else if (player_facing == 1) {
            weapon = default_sword.create(player.position.x + 22, player.position.y + 16, 'sword', player.current_item.frames[1]);
        }
        // Up
        else if (player_facing == 2) {
            weapon = default_sword.create(player.position.x + 11, player.position.y - 14, 'sword', player.current_item.frames[2]);
        }
        // Down
        else if (player_facing == 3) {
            weapon = default_sword.create(player.position.x + 11, player.position.y + 24, 'sword', player.current_item.frames[3]);
        }
        weapon.body.immovable = true

        var event = game.time.events.add((Phaser.Timer.SECOND * player.current_item.frequency) * player.attack_speed, sheath_sword, this, [weapon])
    }
    else if (player.current_item.weapon_type === "projectile") {

    }
    else {
        return;
    }
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

    var event = game.time.events.add((Phaser.Timer.SECOND * player.current_item.frequency) * player.attack_speed, sheath_sword, this, [weapon])
}

function throw_projectile(player) {
    if (player.current_item.group == "projectile" && player.current_item.in_progress == false && player.current_item.amount != 0) {
        player.current_item.in_progress = true
        var statics
        var projectile = statics.create(player.position.x, player.position.y, player.current_item.src)
        player.current_item.amount -= 1 //amount of the ammo the player has because there cannot be infinate arrows
        console.log(player.current_item.amount)

        if ((player.body.velocity.x && player.body.velocity.y) != 0) {
            var v1, v2;
            v1 = player.body.velocity.x
            v2 = player.body.velocity.y
            var speed = ((v1 ^ 2 + v2 ^ 2)) ^ (1 / 2)

            projectile.body.velocity.x = (v1 / speed) * player.current_item.speed
            projectile.body.velocity.y = (v2 / speed) * player.current_item.speed
        }
        else {
            if (player_facing == 0) {
                projectile.body.velocity.x = -player.current_item.speed
                projectile.body.velocity.y = 0
            }
            else if (player_facing == 1) {
                projectile.body.velocity.x = player.current_item.speed
                projectile.body.velocity.y = 0
            }
            else if (player_facing == 2) {
                projectile.body.velocity.x = 0
                projectile.body.velocity.y = player.current_item.speed
            }
            else {
                projectile.body.velocity.x = 0
                projectile.body.velocity.y = -player.current_item.speed
            }
        }

        /*
        if the projectile collides with a wall or enemy we want the projectile to die/explode/restart?
        */
        setTimeout(function kill_projectile() {
            projectile.kill()
            player.current_item.in_progress = false
        }, player.current_item.frequency);
    }
}


function add_coins(player, coin) {
    player.money += 10;

    levelCoins.itemData[coin.index].collected = true;

    coin.kill();
    game.moneyText.text = player.money;
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

function lizard_dmg(default_sword, enemy) {
    if (enemy.health <= 0) {
        enemy.kill()
        player.exp += enemy.exp
        game.playerExp = player.exp
    }
    if (!enemy.immune) {
        var damage = player.current_item["damage"] + player.damage + player.crit_damage();
        show_dmg(damage, enemy);

        enemy.health -= damage
        console.log(enemy.health)
        enemy.immune = true
        setTimeout(function () {
            enemy.immune = false
        }, player.attack_speed * 2000)
    }
}

function show_dmg(damage, enemy) {
    var x_pos = enemy.position.x + (enemy.width / 2.0)
    var y_pos = enemy.position.y - (enemy.height / 2) - 2
    var style = {
        font: 'bold 20pt Dungeon Crawler',
        fill: 'red'
    }

    var text = game.add.text(x_pos, y_pos, String(damage), style)

    game.time.events.add(
        250,
        function (arr) {
            console.log("Getting rid of dmg text");
            arr[0].kill()
        },
        this,
        [text]
    );
}

function probability(n) {
    return !!n && Math.random() <= n;
}

function shark_track(enemy) {

    if (Phaser.Math.distance(enemy.position.x, enemy.position.y, player.position.x, player.position.y) < 150) {

        game.physics.arcade.moveToObject(enemy, player, 60, 1000)

        if (enemy.body.velocity.x > enemy.body.velocity.y) {
            if (enemy.body.velocity.x > 0) {
                enemy.animations.play('swim_right')
            }
            else {
                enemy.animations.play('swim_left')
            }
        }
        else {
            if (enemy.body.velocity.y > 0) {
                enemy.animations.play('swim_down')
            }
            else {
                enemy.animations.play('swim_up')
            }
        }
    }
}

function damage_player(player, enemy) {
    // Deal damage to a player and knock them back in 
    // the opposite direction they're facing

    if (!player.knockback) {
        var dmg_dealt = enemy.damage * player.defense
        kill_player(player, dmg_dealt)
    }

    if (player.body.touching["left"]) {
        player.animations.play('hurt_left')
        player.body.velocity.x = 135
    }
    if (player.body.touching["right"]) {
        player.animations.play('hurt_right')
        player.body.velocity.x = -135
    }
    if (player.body.touching["down"]) {
        player.animations.play('hurt_down')
        player.body.velocity.y = -110
    }
    if (player.body.touching["up"]) {
        player.animations.play('hurt_up')
        player.body.velocity.y = 110
    }

    if (!player.knockback) {

        player.knockback = true

        game.time.events.add(
            500,
            function () {
                player.knockback = false
            },
            this
        )
    }
}

function open_door(player, door) {
    if (door.state == "Closed") {
        var door_name = door.animations.currentFrame.name;
        // Add timed event!
        door.loadTexture('door-atlas', door_name.substring(0, door_name.length - 4) + "_open.png")
        door.body.destroy();
        door.state = "Open";
    }
}

function kill_player(player, amount) {
    for (i = 0; i < amount; i++) {
        if (player.health > 0) {
            player.health--
            //health_bars[i].animations.play('blink')
            health_bars[player.health].kill()
            console.log("health down")
        }

    }
}

function pirate_track(enemy) {
    if (Phaser.Math.distance(enemy.position.x, enemy.position.y, player.position.x, player.position.y) < 50) {
        game.physics.arcade.moveToObject(enemy, player, 40)
        if (Math.abs(enemy.body.velocity.x) > Math.abs(enemy.body.velocity.y)) {
            if (enemy.body.velocity.x > 0) {
                enemy.animations.play('attack-right')
            }
            else {
                enemy.animations.play('attack-left')
            }
        }
        else {
            if (enemy.body.velocity.y > 0) {
                enemy.animations.play('attack-down')
            }
            else {
                enemy.animations.play('attack-up')
            }
        }
    }

    else if (enemy.inBounds() & Phaser.Math.distance(enemy.position.x, enemy.position.y, player.position.x, player.position.y) < 100) {

        game.physics.arcade.moveToObject(enemy, player, 40)

        if (Math.abs(enemy.body.velocity.x) > Math.abs(enemy.body.velocity.y)) {
            if (enemy.body.velocity.x > 0) {
                enemy.animations.play('walk-right')
            }
            else {
                enemy.animations.play('walk-left')
            }
        }
        else {
            if (enemy.body.velocity.y > 0) {
                enemy.animations.play('walk-down-')
            }
            else {
                enemy.animations.play('walk-up-')
            }
        }
    }
    // Move it to the center of the room
    else {
        x_cal = (enemy.bounds.x1 + enemy.bounds.x2) / 2
        y_cal = (enemy.bounds.y1 + enemy.bounds.y2) / 2
        var center = {
            x: x_cal,
            y: y_cal
        }
        game.physics.arcade.moveToObject(enemy, center, 100, 1000)

        if (Math.abs(enemy.body.velocity.x) > Math.abs(enemy.body.velocity.y)) {
            if (enemy.body.velocity.x > 0) {
                enemy.animations.play('walk-right')
            }
            else {
                enemy.animations.play('walk-left')
            }
        }
        else {
            if (enemy.body.velocity.y > 0) {
                enemy.animations.play('walk-down')
            }
            else {
                enemy.animations.play('walk-up-')
            }
        }
    }
}

function level_up(player) {
    console.log("LEVEL");
    player.getCurrentLevel();

    console.log("Reached level", player.level);
    lastLevelPoints = player.exp;
    maxXpPoints = (100 * player.level) ^ 1.5;

    lvltxt1.text = "" + player.level;
    lvltxt2.text = "" + (player.level + 1);
    //xp_bar.scale.set((player.exp / maxXpPoints) * 8, 2);
}

var tick = function () {
    timeLimit++;
    var minutes = Math.floor(timeLimit / 6000);
    var seconds = Math.floor((timeLimit - (minutes * 6000)) / 100);
    var miliseconds = timeLimit - (seconds * 100) - (minutes * 6000)
    var timeString = addZeros(minutes) + ":" + addZeros(seconds) + "." + addZeros(miliseconds);
    this.timeText.text = timeString;
};

var addZeros = function (num) {
    if (num < 10) {
        num = "0" + num;
    }
    return num;
};

function moveState(state) {
    var playerX;
    var playerY;
    var bpck;
    var activeItems;
    var currentItem;

    try{
        playerX = player.body.position.x;
        playerY = player.body.position.y;
        bpck = player.backpack;
        activeItems = player.activeItems;
        currentItem = player.current_item;
    }
    catch(error){
        playerX = xpos;
        playerY = ypos;
        bpck = backpack;
    }

    game.player_attributes = {
        "backpack": bpck,
        "actives": activeItems,
        "current": currentItem,
        "x": playerX,
        "y": playerY,
        "money": player.money
    };

    game.playerExp = player.exp;
    game.current_time = timeLimit
    game.state.start(state);
}
//~~~~~