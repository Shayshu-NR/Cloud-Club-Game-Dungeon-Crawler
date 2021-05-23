// If different number of health is added simply add parameter and for loop
function add_health(player, amount) {
    for (i = 0; i < amount; i++) {
        if (player.health < 10) {
            health_bars[player.health] = null
            health_bars[player.health] = bars.create(player.health * 16, 1, 'health_heart', 'heart.png')

            // health_bars[player.health].fixedToCamera = true
            player.health++
        }
        else
            break
    }
}

// Add parameter for how much ammo added
function add_ammo(player, amount) {
    for (i = 0; i < amount; i++) {
        if (player.ammo < 10) {
            ammo_bars[player.ammo] = null
            ammo_bars[player.ammo] = bars.create(player.ammo * 16, 1, 'ammo_fire', 'fire.png')
            ammo_bars[player.ammo].fixedToCamera = true
            player.ammo++
        }
    }
}

function ammo_used(player, amount) {
    if (player.ammo > 0) {
        player.ammo--
        //health_bars[player.health]
        ammo_bars[player.ammo].kill()
        console.log("ammo down")
    }
}

function add_xp(player, xp_num) {
    player.exp += xp_num
    // console.log(phaser.camera)   
}