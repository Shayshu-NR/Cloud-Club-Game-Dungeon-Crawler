//~~~~~ Potion effects
function use_potion(player, potion) {
  if (potion == "Health_Potion") {
    potion_sprite = game.add.sprite(
      player.position.x + 8,
      player.position.y - 4,
      "potion_set",
      "health_pot_1.png"
    );
    potion_sprite.lifespan = 1000;
    console.log(player.health);
    console.log("Health Potion used");
    player.health = player.health + 2;
    console.log(player.health);
  }

  if (potion == "Speed_Potion") {
    potion_sprite = game.add.sprite(
      player.position.x + 8,
      player.position.y - 4,
      "potion_set",
      "speed_pot_1.png"
    );
    potion_sprite.lifespan = 1000;
    player.potion_status = "Speed Potion";
    console.log("Speed Potion Used");
    game.time.events.add(
      10000,
      function (player) {
        console.log("Getting rid of speed");
        player[0].potion_status = "default";
        console.log("No more speed");
      },
      this,
      [player]
    );
  }
  if (potion == "Attack_Potion") {
    potion_sprite = game.add.sprite(
      player.position.x + 8,
      player.position.y - 4,
      "potion_set",
      "strength_pot_1.png"
    );
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
