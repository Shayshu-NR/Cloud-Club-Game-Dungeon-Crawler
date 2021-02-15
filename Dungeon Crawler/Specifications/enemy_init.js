function enemy_init(enemy, health, exp) {
    enemy.health = health
    enemy.exp = exp
    enemy.immune = false
    return enemy
}