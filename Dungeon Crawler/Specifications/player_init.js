function init_player(player) {

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

    player.moveBackpackToActive = function() {

    }

    player.skills = {}

    return player
}