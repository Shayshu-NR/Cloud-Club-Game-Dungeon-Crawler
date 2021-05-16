const game = new Phaser.Game(800, 600, Phaser.AUTO)
game.playerSpeed = 175
game.playerDamage = 1
game.playerAttackSpeed = 1
game.playerExp = 0
game.playerLevel = 1
game.playerUsedSkillPoints = 0
game.playerCritical = 0
game.playerHealth = 10
game.playerDefense = 1
game.playerLuck = 0
game.player_attributes = {
    "backpack" : {},
    "actives" : []
}
game.current_time = 0

game.state.add("Game", maingame.gabriellegame)

game.state.add("Backpack",maingame.BackPack)
game.state.add("Map",maingame.Map)

game.state.start("Game")