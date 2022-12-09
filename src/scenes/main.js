import { init, Scene, Sprite, GameObject, collides } from '../../lib/kontra.min.mjs'
import Player, { Shield } from '../objects/player.js'
import createEnemy from '../objects/enemy.js'
import { showEndScene } from '../game.js'

const { canvas } = init()

const levelAttributes = {
  1: {
    enemySpawnInterval: 5,
    numEnemiesToSpawn: 5,
    enemyTypes: ['goblin'],
  }
}

const createScene = () => Scene({
  id: 'main',
  level: 1,
  timeElapsed: 0,
  enemies: [],
  projectiles: [],
  objects: [Player],
  update: function(dt) {
    // loop through all the projectiles and check for collisions
    this.projectiles.forEach((projectile, i) => {
      for (let x = 0; x < this.enemies.length; x++) {
        if (collides(this.enemies[x], projectile)) {
          this.damageEnemy(x, i)
        } else if (collides(Player, projectile)) {
          this.damagePlayer(i)
        } else if (collides(Shield, projectile)) {
          if (Shield.reflect) {
            this.reflectProjectile(i)
          } else {
            this.absorbProjectile(i)
          }
        }
      }
    })
  },
  damageEnemy: function(enemyIndex, projectileIndex) {
    let enemy = this.enemies[enemyIndex]
    let projectile = this.projectiles[projectileIndex]
    enemy.health -= projectile.damage
    if (enemy.health <= 0) {
      this.enemies.splice(enemyIndex, 1)
    }
    this.projectiles.splice(projectileIndex, 1)
  },
  damagePlayer: function(projectileIndex) {
    let projectile = this.projectiles[projectileIndex]
    Player.health -= projectile.damage
    this.projectiles.splice(projectileIndex, 1)
    if (Player.health <= 0) {
      showEndScene()
    }
  },
  reflectProjectile: function(projectileIndex) {
    // Reflect the projectile's x and y velocities
    // For now, this will just reverse the dx and dy, but this should be more elaborate later
    let projectile = this.projectiles[projectileIndex]
    projectile.xDelta = -projectile.xDelta
    projectile.yDelta = -projectile.yDelta
    // Increase the shield's energy
    Shield.energy += 10
  },
  absorbProjectile: function(projectileIndex) {
    // Delete the projectile
    this.projectiles.splice(projectileIndex, 1)
    // Increase the shield's energy
    Shield.energy += 10
  },
  spawnEnemies: function() {
    // Spawn a number of enemies depending on the level
    // Choose x segments of the map at random and then spread out the spawns in those segments
  },
  shootProjectile: function() {
    // Spawn a projectile from an enemy position
    // Called from the enemy's update function
  }
})

export default createScene