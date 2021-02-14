const game = new Phaser.Game(800, 600, Phaser.AUTO)
game.state.add("Game", maingame.gabriellegame)

game.state.add("Contents",maingame.BackPack)
game.state.start("Game")