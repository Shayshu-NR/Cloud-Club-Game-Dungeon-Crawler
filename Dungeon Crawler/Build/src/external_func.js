// ~~~~~
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

    var event = game.time.events.add(Phaser.Timer.SECOND * player.attack_speed, sheath_sword, this, [weapon])
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

function lizard_dmg(default_sword, lizard) {
    if (lizard.health <= 0) {
        lizard.kill()
        player.exp += lizard.exp
        game.playerExp = player.exp
    }
    if (!lizard.immune) {
        var damage = player.current_item["dmg"] + player.damage + player.crit_damage()
        show_dmg(damage, lizard)

        lizard.health -= damage
        console.log(lizard.health)
        lizard.immune = true
        setTimeout(function () {
            lizard.immune = false
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
        player.body.velocity.x = 125
    }
    if (player.body.touching["right"]) {
        player.animations.play('hurt_right')
        player.body.velocity.x = -125
    }
    if (player.body.touching["down"]) {
        player.animations.play('hurt_down')
        player.body.velocity.y = -100
    }
    if (player.body.touching["up"]) {
        player.animations.play('hurt_up')
        player.body.velocity.y = 100
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

function shark_track(enemy) {

    if (enemy.inBounds() & Phaser.Math.distance(enemy.position.x, enemy.position.y, player.position.x, player.position.y) < 150) {

        game.physics.arcade.moveToObject(enemy, player, 60, 1000)

        if (Math.abs(enemy.body.velocity.x) > Math.abs(enemy.body.velocity.y)) {
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
    // Move it to the center of the room
    else {
        x_cal = (enemy.bounds.x1 + enemy.bounds.x2) / 2
        y_cal = (enemy.bounds.y1 + enemy.bounds.y2) / 2
        var center = {
            x: x_cal,
            y: y_cal
        }
        game.physics.arcade.moveToObject(enemy, center, 10, 5000)

        if (Math.abs(enemy.body.velocity.x) > Math.abs(enemy.body.velocity.y)) {
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
/*
function pirate_track(enemy) {

    if (enemy.inBounds() & Phaser.Math.distance(enemy.position.x, enemy.position.y, player.position.x, player.position.y) < 150) {

        game.physics.arcade.moveToObject(enemy, player, 60, 1000)

        if (Math.abs(enemy.body.velocity.x) > Math.abs(enemy.body.velocity.y)) {
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
    // Move it to the center of the room
    else {
        x_cal = (enemy.bounds.x1 + enemy.bounds.x2) / 2
        y_cal = (enemy.bounds.y1 + enemy.bounds.y2) / 2
        var center = {
            x: x_cal,
            y: y_cal
        }
        game.physics.arcade.moveToObject(enemy, center, 10, 5000)

        if (Math.abs(enemy.body.velocity.x) > Math.abs(enemy.body.velocity.y)) {
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
enemy.body.acceleration.x = ?
enemy.body.acceleration.y = ?
enemy.body.maxVelocity.x = ?
enemy.body.maxVelocity.y = ?
*/
function level_up(player) {
    player.getCurrentLevel();

    console.log("Reached level", player.level);
    lastLevelPoints = player.exp;
    maxXpPoints = (100 * player.level) ^ 1.5;

    lvltxt1.text = "" + player.level;
    lvltxt2.text = "" + (player.level + 1);
}

var tick = function() {
    timeLimit++;
    var minutes = Math.floor(timeLimit / 6000);
    var seconds = Math.floor((timeLimit - (minutes * 6000)) / 100);
    var miliseconds = timeLimit - (seconds * 100) - (minutes * 6000)
    var timeString = addZeros(minutes) + ":" + addZeros(seconds) + "." + addZeros(miliseconds);
    this.timeText.text = timeString;
};

var addZeros = function(num) {
    if (num < 10) {
        num = "0" + num;
    }
    return num;
};
//~~~~~