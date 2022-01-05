//~~~~~
function lizard_turn_around(enemy, walls) {
    current = enemy.body.velocity.x
    lizard_direction *= -1
    enemy.body.velocity.x = -current
}

function use_current_weapon() {

    if (player.current_item.weapon_type === "melee") {
        swing_melee(player, player.current_item)
    }
    else if (player.current_item.weapon_type === "projectile") {
        throw_projectile(player, player.current_item);
    }
    else {
        return;
    }
}

function swing_default_sword(player) {
    player.body.velocity.x = 0
    player.body.velocity.y = 0
    player.swing = true
    var melee;

    // Left
    if (player_facing == 0) {
        melee = default_sword.create(player.position.x - 10, player.position.y + 16, 'tiles', 'weapon_rusty_sword.png')
    }
    // Right
    else if (player_facing == 1) {
        melee = default_sword.create(player.position.x + 22, player.position.y + 16, 'sword', 'weapon_regular_sword_left.png')
        melee.rotation += Math.PI
    }
    // Up
    else if (player_facing == 2) {
        melee = default_sword.create(player.position.x + 11, player.position.y - 14, 'sword', 'weapon_regular_sword_left.png')
        melee.rotation += Math.PI / 2
    }
    // Down
    else if (player_facing == 3) {
        melee = default_sword.create(player.position.x + 11, player.position.y + 24, 'sword', 'weapon_regular_sword_left.png')
        melee.rotation += Math.PI * 1.5
    }
    melee.body.immovable = true

    var event = game.time.events.add((Phaser.Timer.SECOND * player.current_item.frequency) * player.attack_speed, sheath_sword, this, [melee])
}

function swing_melee(player, current_item) {
    console.log("swinging")
    player.body.velocity.x = 0
    player.body.velocity.y = 0
    player.swing = true
    var melee;

    // Left
    if (player_facing == 0) {
        melee = current_item.group.create(player.position.x - 10, player.position.y + 16, current_item.atlas, 'weapon_rusty_sword.png')
    }
    // Right
    else if (player_facing == 1) {
        melee = current_item.group.create(player.position.x + 22, player.position.y + 16, current_item.atlas, current_item.frames[1])
    }
    // Up
    else if (player_facing == 2) {
        melee = current_item.group.create(player.position.x + 8, player.position.y - 14, current_item.atlas, current_item.frames[2])
    }
    // Down
    else if (player_facing == 3) {
        melee = current_item.group.create(player.position.x + 8, player.position.y + 24, current_item.atlas, current_item.frames[3])
    }
    melee.body.immovable = true
    console.log("swinging")
    let event = game.time.events.add((Phaser.Timer.SECOND * current_item.frequency) * current_item.attack_speed, sheath_sword, this, [melee])
}

function knockback_enemies(currentWep, enemy) {

    var velocity = {
        x: enemy.body.velocity.x,
        y: enemy.body.velocity.y,
    }

    velocity.z = (velocity.y ** 2 + velocity.x ** 2) ** (1 / 2);

    enemy.body.velocity.x = -velocity.x / velocity.z * currentWep.knockback
    enemy.body.velocity.y = -velocity.y / velocity.z * currentWep.knockback

    game.time.events.add(
        (Phaser.Timer.SECOND * 10 * currentWep.knockback / currentWep.attack_speed),
        function set_to_original(nmeInfo) {
            nmeInfo[0].body.velocity.x = -nmeInfo[1].x / nmeInfo[1].z * nmeInfo[2].knockback,
                nmeInfo[0].body.velocity.y = -nmeInfo[1].y / nmeInfo[1].z * nmeInfo[2].knockback
        },
        this,
        [enemy, velocity, currentWep]
    )
    console.log(enemy, velocity, currentWep);
}

function throw_projectile(player, current_item) {

    let projectile;
    projectile = game.add.weapon(30, current_item.atlas)
    projectile.bulletKillType = current_item.projectileKillType;
    projectile.bulletSpeed = current_item.speed
    projectile.fireRate = current_item.frequency;
    projectile.fireAngle = player.body.angle * 180 / Math.PI

    if (player.body.facing == 1)
        projectile.trackSprite(player, 0 + 32, 0 + 16, false);

    else if (player.body.facing == 3)
        projectile.trackSprite(player, 0 + 12, 0 + 36, false);

    else if (player.body.facing == 2)
        projectile.trackSprite(player, 0 + 12, 0 - 16, false);

    else
        projectile.trackSprite(player, 0 - 8, 0 + 16, false);

    projectile.fire()

}

function add_coins(player, coin) {
    console.log("add coins", coin);

    if(typeof coin.enemy == 'undefined'){
        levelCoins.itemData[coin.index].collected = true;
        coin.kill();
        player.money += 10;
    }
    else {
        player.money += enemyJson.emeData[coin.index].Coins
    }

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

function lizard_dmg(weapon, enemy) {

    console.log(weapon);
    if (enemy.health <= 0) {
        enemyJson.emeData[enemy.index].dead = true;

        enemy.kill()
        player.exp += enemy.exp
        add_coins(player, enemy);
        game.playerExp = player.exp
        killCount++;
    }
    if (!enemy.immune) {
        var damage = player.current_item["damage"] + player.damage + player.crit_damage();

        show_dmg(damage, enemy);

        enemy.health -= damage;

        // make the enemy knockback...
        knockback_enemies(player.current_item, enemy);

        enemy.immune = true;

        setTimeout(function () {
            enemy.immune = false
        }, player.attack_speed * 2000);
    }
}

function show_dmg(damage, enemy) {
    var x_pos = enemy.position.x + (enemy.width / 2.0)
    var y_pos = enemy.position.y - (enemy.height / 2) - 2
    var style = {
        font: 'bold 20pt Dungeon Crawler',
        fill: (enemy.hasOwnProperty('current_item') ? 'white' : 'red')
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
    console.log("Damage player")

    if (!player.knockback) {

        var dmg_dealt = enemy.Damage * player.defense
        show_dmg(dmg_dealt, player);
        kill_player(player, dmg_dealt);
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
            (Phaser.Timer.SECOND * 0.5),
            function () {
                console.log("Player knock back done");
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

        game.physics.arcade.moveToObject(enemy, player, 29)

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
    // add level up text 
    var lvlUpText = statics.create(375, 525, 'LevelUp', 0);
    lvlUpText.fixedToCamera = true;
    lvlUpText.scale.setTo(2, 2);
    lvlUpText.animations.add("lvlup", [0, 1, 2, 3, 4, 5, 6, 7, 8], 10, true);
    lvlUpText.animations.play("lvlup");

    game.time.events.add((Phaser.Timer.SECOND * 5), function (lvluptxt) { lvluptxt[0].kill(); }, this, [lvlUpText])

    player.getCurrentLevel();

    console.log("Reached level", player.level);
    lastLevelPoints = player.exp;
    maxXpPoints = (100 * player.level) ** 1.5;

    lvltxt1.text = "" + player.level;
    lvltxt2.text = "" + (player.level + 1);
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

    try {
        playerX = player.body.position.x;
        playerY = player.body.position.y;
        bpck = player.backpack;
        activeItems = player.activeItems;
        currentItem = player.current_item;
    }
    catch (error) {
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