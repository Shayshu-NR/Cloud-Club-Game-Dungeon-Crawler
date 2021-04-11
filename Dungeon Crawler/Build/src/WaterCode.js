//Code for water detection in ripley's aquarium 
var inwatertimer
var waterTimerLoop

var waterTileIndexes = [6]
var groundTileIndexes = [4]

waterDetection: function () {

    inwatertimer = game.time.create(false)
    waterTimerLoop = inwatertimer.loop(5000, function intoWater() { player.health-- }, this)
    inwatertimer.start()
    inwatertimer.pause()

    map.setTileIndexCallback(indexes = groundTileIndexes,
        callback = function () {
            if (!inwatertimer.paused) {
                inwatertimer.pause()
            }
        }, callbackContext = this, layer = ground)

    map.setTileIndexCallback(indexes = waterTileIndexes,
        callback = function () {
            if (inwatertimer.paused) {
                inwatertimer.resume()
            }
        }, callbackContext = this, layer = water);

}
