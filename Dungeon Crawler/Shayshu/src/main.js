const game = new Phaser.Game(800, 600, Phaser.AUTO)
game.state.add("Backpack", test_backpack.backpack)
game.state.start("Backpack")