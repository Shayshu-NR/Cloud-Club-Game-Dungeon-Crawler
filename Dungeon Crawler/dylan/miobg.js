
preload: function() {
    this.load.atlas('pirate', 
    '../Assets/General assets/Ripleys Aquarium/Pirate/pirate-atlas-sheet.png',
    '../Assets/General assets/Ripleys Aquarium/Pirate/pirate-atlast-sheet.json',

    )
    
)
}

/*
        sharky = shark.create(16, 48, 'shark', 'shark-swim-left-f1.png')
        sharky.scale.setTo(1.5)
        sharky.bounds = {
            x1: 16,
            x2: 60,
            y1: 48,
            y2: 112
        }
        sharky.inBounds = function () {

            if (this.position.x > this.bounds.x1 && this.position.x < this.bounds.x2) {
                if (this.position.y > this.bounds.y1 && this.position.y < this.bounds.y2) {
                    return true
                }
            }
            return false
        }

        */
       

//physics: pirate = game.add.physicsGroup(Phaser.Physics.ARCADE)