const game = new Phaser.Game(800, 600, Phaser.AUTO)
game.playerSpeed = 175
game.playerDamage = 1
game.playerAttackSpeed = 1
game.playerExp = 0
game.playerLevel = 1
game.playerUsedSkillPoints = 0
game.playerCritical = 0

game.state.add("Main", maingame.test_env)
game.state.add("Backpack", maingame.BackPack)
game.state.add("Skill tree", maingame.skill_tree)
game.state.start("Main")