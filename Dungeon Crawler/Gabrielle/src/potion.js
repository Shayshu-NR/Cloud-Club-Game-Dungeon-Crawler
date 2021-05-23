function use_potion(player, potion) {
  player.body.velocity.x = 0;
  player.body.velocity.y = 0;
  player.swing = true;

  if (potion == "Health_Potion") {
    potion_sprite = game.add.sprite(
      player.position.x + 5,
      player.position.y - 15,
      "potion_set",
      "health_pot_1.png"
    );

    potion_sprite.animations.add(
      "health",
      Phaser.Animation.generateFrameNames("health_pot_", 1, 4, ".png"),
      10,
      true
    );

    potion_sprite.play("health", 10, true);
    potion_sprite.lifespan = 500;
    console.log(player.health);
    console.log("Health Potion used");
    player.health = player.health + 2;
    console.log(player.health);
  }

  if (potion == "Speed_Potion") {
    potion_sprite = game.add.sprite(
      player.position.x + 5,
      player.position.y - 15,
      "potion_set",
      "speed_pot_1.png"
    );

    potion_sprite.animations.add(
      "speed",
      Phaser.Animation.generateFrameNames("speed_pot_", 1, 4, ".png"),
      10,
      true
    );

    potion_sprite.play("speed", 10, true);
    potion_sprite.lifespan = 500;
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
      player.position.x + 5,
      player.position.y - 15,
      "potion_set",
      "strength_pot_1.png"
    );

    potion_sprite.animations.add(
      "strength",
      Phaser.Animation.generateFrameNames("strength_pot_", 1, 4, ".png"),
      10,
      true
    );

    potion_sprite.play("strength", 10, true);
    potion_sprite.lifespan = 500;
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
  var event = game.time.events.add(
    Phaser.Timer.SECOND * 0.5,
    potion_gone,
    this
  );
  function potion_gone() {
    player.swing = false;
  }
}

/*

    var potion = create....
    potion.item = {
      "name" : chest.potion.name,
      
    }
    
    game.time.events.add(
      10000,
      function (arr) {
        player.putBackpack(....)
        arr[0].kill()
      },
      this,
      [potion]
    );

*/