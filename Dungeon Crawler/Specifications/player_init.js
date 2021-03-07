function init_player(game, player) {
    game.physics.arcade.enable(player, Phaser.Physics.ARCADE)
    player.body.immovable = true 
    player.enableBody = true

    player.putBackpack = function (item, quantity = 1) {
        index = item["name"];
        if (index in player.backpack) {
            player.backpack[index]["quantity"] += quantity;
        } else {
            if (Object.keys(player.backpack).length >= MAX_BACKPACK_SIZE) {
                return "fail";
            } else {
                player.backpack[index] = item;
            }
        }
        return "success";
    }

    //~~~~~ Switch the players current active item ~~~~~
    // [Equiped] [Active1, Active2, Active3 ...]
    // Call method!
    // [Active1] [Active2, ... Equiped]
    // Moves player.current_item to end of player.active_items
    // and moves player.active_items[0] to player.current_item
    player.switchActiveItem = function () {
        item = player.active_items[0];
        item2 = Object.keys(player.current_item)

        player.current_item[item["name"]] = item;
        player.active_items.splice(0, 1);
        player.active_items.push(item2[0])

        player.current_item.delete(item2[0])
    }

    player.moveBackpackToActive = function (item, index) {
        if (player.active_items.length < MAX_ACTIVE_SIZE) {
            player.active_items.splice(index, 0, item);
            player.backpack.delete(item);
        } else {
            item_moved = player.active_items[index];
            player.active_items.splice(index, 1, item);
            player.backpack.delete(item);
            player.backpack[item_moved["name"]] = item_moved;
        }
    }
    player.moveActiveToBackpack = function (item, index) {
        if (player.backpack.length < MAX_BACKPACK_SIZE) {
            idx = player.active_items.indexOf(item);
            player.backpack[item["name"]] = item;
            player.active_items.splice(idx, 1);
        } else {
            return "fail";
        }
    }

    // Exp(level) = 100(level)^1.5
    player.getCurrentLevel = function () {
        player.level = Math.floor(Math.pow((player.exp / 100.0), 2.0 / 3.0)) + 1
        return player.level
    }

    player.skills = {}

    player.speed = game.playerSpeed

    player.damage = game.playerDamage

    player.attack_speed = game.playerAttackSpeed

    player.exp = game.playerExp

    player.level = player.getCurrentLevel()

    player.used_skill_points = game.playerUsedSkillPoints

    player.crit_chance = game.playerCritical

    player.health = game.playerHealth

    player.defense = game.playerDefense
    
    player.knockback = false

    player.swing = false
    
    player.crit_damage = function(){
        if (probability(player.crit_chance)){
            return player.damage * player.crit_chance
        }
        return 0
    }

    return player
}