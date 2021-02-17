function init_player(game, player) {

    player.putBackpack = function(item, quantity = 1) {
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

    player.moveBackpackToActive = function(item, index) {
        if (player.active_items.length < MAX_ACTIVE_SIZE){
            player.active_items.splice(index, 0, item);
            player.backpack.delete(item);
        } else {
            item_moved = player.active_items[index];
            player.active_items.splice(index, 1, item);
            player.backpack.delete(item);
            player.backpack[item_moved["name"]] = item_moved;
        }
    }
    player.moveActiveToBackpack = function(item, index){
        if (player.backpack.length < MAX_BACKPACK_SIZE){
            idx = player.active_items.indexOf(item);
            player.backpack[item["name"]] = item;
            player.active_items.splice(idx,1);
        } else {
            return "fail";
        }
    }
    
    player.skills = {}

    player.speed = game.playerSpeed

    player.damage = game.playerDamage

    player.attack_speed = game.playerAttackSpeed

    return player
}