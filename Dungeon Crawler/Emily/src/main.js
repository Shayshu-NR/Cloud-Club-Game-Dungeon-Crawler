const game = new Phaser.Game(800, 600, Phaser.AUTO)
game.state.add("Game", maingame.emilygame)

game.state.add("Backpack",maingame.BackPack)

game.state.start("Game")