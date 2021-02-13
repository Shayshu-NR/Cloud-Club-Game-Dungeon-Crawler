//~~~~~ Player experience ~~~~~~
// Integer that tracks the amount of experience
// a player has accumulated
player.exp = int

//~~~~~ The players current amount of ammo ~~~~~ 
// Integer that indicated how much ammunition a player 
// has
player.ammo = int

//~~~~~ Player potion status ~~~~~
// String that describes the players
// current potion effects/status
player.potion_status = string

//~~~~~ Currently used item ~~~~~
// Double check how map copying works in JS
// Map with meta data see backpack
// Equiped item
player.current_item = { "Sword" }

//~~~~~ Active items ~~~~~
// Array of Maps with meta data see backpack
//, max capacity of 3 items
// Items availble to be switched to 
player.active_items = [{ "Sword" }, { "Potion Strength" }...]

//~~~~~ Backpack items ~~~~~
// Dictionary/Map
// Items that are not in use but 
// can be switched out for
player.backpack = {
    "GrassBlock": {
        "name": "GrassBlock",
        "group": block,
        "src": "./Assets/....",
        "object": GrassBlock,
        "quantity": 123,
        ...
    },
    ...
}

//~~~~~ Player skill tree ~~~~~ 
// ??
player.skill_tree

//~~~~~ Get player current level ~~~~~
// Returns the players current level based
// off the player.exp and some levling function
// f(e) = 100 + 50e
player.getCurrentLevel()

//~~~~~ Switch the players current active item ~~~~~
// [Equiped] [Active1, Active2, Active3 ...]
// Call method!
// [Active1] [Active2, ... Equiped]
// Moves player.current_item to end of player.active_items
// and moves player.active_items[0] to player.current_item
player.switchActiveItem()

//~~~~~ Moves item to backpack ~~~~~
player.putBackpack(item)

//~~~~~ Moves an item from the active bar to the backpack ~~~~~
player.moveActiveToBackpack(item)

//
player.moveBackpackToActive()