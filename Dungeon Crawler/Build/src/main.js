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
    "actives" : [],
    "x" : 128,
    "y" : 85,
    "money" : 0,
    "current" : {}
}
game.current_time = 0
game.playerMoney = 0

game.state.add("Main", maingame.test_env);

// Levels
game.state.add("Ripleys", maingame.Ripleys);

game.state.add("Backpack", maingame.BackPack);
game.state.add("Skill tree", maingame.skill_tree);
game.state.add("Game", maingame.test_env);
game.state.add("StartMenu", maingame.startmenu);
game.state.add("Merchant", maingame.merchant);
game.state.add("GameOver", maingame.gameOver);
game.state.start("StartMenu")