import { init, Scene, Sprite, GameObject, collides } from '../../lib/kontra.min.mjs'
import Player, { Shield } from '../objects/player.js'
import createEnemy from '../objects/enemy.js'
import { showEndScene } from '../game.js'
import createProjectile from '../objects/projectile.js'
import createPowerup from '../objects/powerup.js'

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
  timeSincePowerup: 0,
  enemies: [],
  projectiles: [],
  powerups: [],
  objects: [Player],
  update: function(dt) {
    // loop through all the projectiles and check for collisions
    this.projectiles.forEach((projectile, i) => {
      if (projectile.alive) {
        for (let x = 0; x < this.enemies.length; x++) {
          if (collides(this.enemies[x], projectile)) {
            this.damageEnemy(x, i)
          }
          if (collides(this.enemies[x], Player)) {
            // TODO: function that handles this
          }
        }
        if (collides(Shield, projectile)) {
          if (Shield.reflect) {
            this.reflectProjectile(i)
          } else {
            this.absorbProjectile(i)
          }
        } else if (collides(Player, projectile)) {
          this.damagePlayer(i)
        } 
      }
    })

    for (let x = 0; x < this.powerups.length; x++) {
      if (collides(this.powerups[x], Player)) {
        this.gainPowerup(x)
      }
    }

    // Spawn enemies if at the time interval
    this.timeSinceSpawn += dt
    if (this.timeSinceSpawn >= levelAttributes[this.level].enemySpawnInterval) {
      this.spawnEnemies()
      this.timeSinceSpawn = 0
    }

    this.timeSincePowerup += dt

    this.objects.forEach((obj) => obj.update(dt))
  },
  damageEnemy: function(enemyIndex, projectileIndex) {
    let enemy = this.enemies[enemyIndex]
    let projectile = this.projectiles[projectileIndex]
    if (!projectile.alive) return
    enemy.health -= projectile.damage
    if (enemy.health <= 0) {
      if (this.timeSincePowerup >= 10) {
        let powerup = createPowerup(enemy)
        this.powerups.push(powerup)
        this.add(powerup)
        this.timeSincePowerup = 0
      }
      this.enemies.splice(enemyIndex, 1)
      this.remove(enemy)
    }
    if (!projectile.passThrough) {
      // this.projectiles.splice(projectileIndex, 1)
      projectile.alive = false
      this.remove(projectile)
    }
  },
  damagePlayer: function(projectileIndex) {
    let projectile = this.projectiles[projectileIndex]
    if (!projectile.alive) return
    Player.health -= projectile.damage
    // this.projectiles.splice(projectileIndex, 1)
    projectile.alive = false
    this.remove(projectile)
    if (Player.health <= 0) showEndScene()
  },
  reflectProjectile: function(projectileIndex) {
    // Reflect the projectile's x and y velocities
    // For now, this will just reverse the dx and dy, but this should be more elaborate later
    let projectile = this.projectiles[projectileIndex]
    if (!projectile.alive || projectile.reflected) return
    projectile.xDelta = -projectile.xDelta
    projectile.yDelta = -projectile.yDelta
    // Increase the shield's energy
    Shield.energy += 10
    projectile.reflected = true
  },
  absorbProjectile: function(projectileIndex) {
    // Delete the projectile
    let projectile = this.projectiles[projectileIndex]
    if (!projectile.alive) return
    // this.projectiles.splice(projectileIndex, 1)
    projectile.alive = false
    this.remove(projectile)
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
      let enemy = createEnemy(xValue, yValue, enemyTypes[0], this)
      this.enemies.push(enemy)
      this.add(enemy)
    }
  },
  shootProjectile: function(originX, originY, type) {
    // Spawn a projectile from an enemy position
    // Called from the enemy's update function
    let projectile = createProjectile(originX, originY, Player.x, Player.y, type)
    this.projectiles.push(projectile)
    this.add(projectile)
  },
  gainPowerup: function(powerupIndex) {
    // TODO: take action depending on powerup type
    let powerup = this.powerups[powerupIndex]
    this.powerups.splice(powerupIndex, 1)
    this.remove(powerup)
  },
})

export default createScene