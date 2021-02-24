function enemy_init(enemy, health, exp) {
    enemy.body.immovable = true

    enemy.health = health
    enemy.exp = exp
    enemy.immune = false
    return enemy
}