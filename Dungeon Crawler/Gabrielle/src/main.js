const game = new Phaser.Game(800, 600, Phaser.AUTO)
game.state.add("Game", maingame.gabriellegame)

game.state.add("Backpack",maingame.BackPack)
game.state.add("Map",maingame.Map)

game.state.start("Game")