function enemy_init(enemy, health=3, exp=100, dmg=1) {
    enemy.body.immovable = true

    enemy.health = health
    enemy.exp = exp
    enemy.immune = false
    enemy.damage = dmg
    return enemy
}