//~~~~~ Potion effects
function use_potion(player, potion) {
    if (potion == "Health_Potion") {
        console.log(player.health)
        console.log("Health Potion used");
        player.health = player.health + 2;
        console.log(player.health)
    }

    if (potion == "Speed_Potion") {
        player.potion_status = "Speed Potion";
        console.log("Speed Potion Used");
        game.time.events.add(
            10000,
            function (player) {
                console.log("Getting rid of speed");
                player[0].potion_status = "default";
                console.log("No more speed")
            },
            this,
            [player]
        );
    }
    if (potion == "Attack_Potion") {
        player.potion_status = "Attack Potion";
        console.log("Attack Potion Used");
        game.time.events.add(
            10000,
            function (player) {
                console.log("Getting rid of attack");
                player[0].currentState = "default";
            },
            this,
            [player]
        );
    }
}