var cursors;

maingame.startmenu = function (game) { }

maingame.startmenu.prototype = {
    preload: function () {
        game.load.image('StartMenu', '../Assets/General assets/start-menu.png')
    },

    create: function () {
        game.add.image(0, 0, 'StartMenu')

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
    },

    update: function () {

        if (game.input.mousePointer.x > 300 && game.input.mousePointer.x < 550) {
            if (game.input.mousePointer.y > 200 && game.input.mousePointer.y < 250) {
                if(game.input.activePointer.isDown){
                    game.state.start("CNTower")
                }
            }
        }

        if (game.input.mousePointer.x > 400 && game.input.mousePointer.x < 550) {
            if (game.input.mousePointer.y > 300 && game.input.mousePointer.y < 350) {
                if(game.input.activePointer.isDown){
                    window.location.href = 'https://cloudclub.ca/';
                }
            }
        }
    },

    render: function () {
    }
}