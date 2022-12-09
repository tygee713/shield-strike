import { init, Scene, Sprite, GameObject, collides } from '../../lib/kontra.min.mjs'
import Player, { Shield } from '../objects/player.js'
import createEnemy from '../objects/enemy.js'
import { showEndScene } from '../game.js'

const { canvas } = init()

const levelAttributes = {
  1: {
    enemySpawnInterval: 5,
    numEnemiesToSpawn: 3,
    enemyTypes: ['goblin'],
  }
}

const mapSegments = [
  {
    // top
    xMin: 0,
    xMax: canvas.width,
    yMin: -20,
    yMax: 0,
  },
  {
    // right
    xMin: canvas.width,
    xMax: canvas.width + 20,
    yMin: 0,
    yMax: canvas.height,
  },
  {
    // bottom
    xMin: 0,
    xMax: canvas.width,
    yMin: canvas.height,
    yMax: canvas.height + 20,
  },
  {
    // left
    xMin: -20,
    xMax: 0,
    yMin: 0,
    yMax: canvas.height,
  },
]

const createScene = () => Scene({
  id: 'main',
  level: 1,
  timeSinceSpawn: 0,
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

    // Spawn enemies if at the time interval
    this.timeSinceSpawn += dt
    if (this.timeSinceSpawn >= levelAttributes[this.level].enemySpawnInterval) {
      this.spawnEnemies()
      this.timeSinceSpawn = 0
    }
  },
  damageEnemy: function(enemyIndex, projectileIndex) {
    let enemy = this.enemies[enemyIndex]
    let projectile = this.projectiles[projectileIndex]
    enemy.health -= projectile.damage
    if (enemy.health <= 0) this.enemies.splice(enemyIndex, 1)
    if (!projectile.passThrough) this.projectiles.splice(projectileIndex, 1)
  },
  damagePlayer: function(projectileIndex) {
    let projectile = this.projectiles[projectileIndex]
    Player.health -= projectile.damage
    this.projectiles.splice(projectileIndex, 1)
    if (Player.health <= 0) showEndScene()
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
    let { numEnemiesToSpawn, enemyTypes } = levelAttributes[this.level]
    for (let x = 0; x < numEnemiesToSpawn; x++) {
      let { xMin, xMax, yMin, yMax } = mapSegments[Math.floor(Math.random() * mapSegments.length)]
      let xValue = Math.floor(Math.random() * (xMax - xMin + 1)) + xMin
      let yValue = Math.floor(Math.random() * (yMax - yMin + 1)) + yMin
      createEnemy(xValue, yValue, enemyTypes[0])
    }
  },
  shootProjectile: function() {
    // Spawn a projectile from an enemy position
    // Called from the enemy's update function
  }
})

export default createScene