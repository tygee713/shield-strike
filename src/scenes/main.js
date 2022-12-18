import { init, Scene, Sprite, collides, degToRad } from '../../lib/kontra.min.mjs'
import Player from '../objects/player.js'
import createEnemy from '../objects/enemy.js'
import { showEndScene } from '../game.js'
import createProjectile from '../objects/projectile.js'
import createPowerup from '../objects/powerup.js'
import createShield from '../objects/shield.js'
import MeterBar from '../objects/meterBar.js'
import HealthBar from '../objects/healthBar.js'
import Timer from '../objects/timer.js'
import createWaveDisplay from '../objects/wave.js'
import createHitPing from '../objects/hitPing.js'

const { canvas } = init()

// testing controls
const toggleHUD = false

const levelAttributes = {
  1: {
    enemySpawnInterval: 5,
    enemies: [{
      amount: 3,
      type: 'goblin',
    }]
  },
  2: {
    enemySpawnInterval: 5,
    enemies: [{
      amount: 2,
      type: 'goblin',
    }, {
      amount: 2,
      type: 'archer',
    }, {
      amount: 1,
      type: 'goblinmage',
    }]
  },
  3: {
    enemySpawnInterval: 5,
    enemies: [{
      amount: 2,
      type: 'goblin',
    }, {
      amount: 1,
      type: 'archer',
    }, {
      amount: 2,
      type: 'goblinmage',
    }, {
      amount: 1,
      type: 'goblincannon',
    }]
  },
  4: {
    enemySpawnInterval: 5,
    enemies: [{
      amount: 5,
      type: 'skeleton',
    }, {
      amount: 2,
      type: 'goblincannon',
    }]
  },
  5: {
    enemySpawnInterval: 5,
    enemies: [{
      amount: 2,
      type: 'goblin',
    }, {
      amount: 2,
      type: 'goblinmage',
    }, {
      amount: 1,
      type: 'goblincannon',
    }, {
      amount: 1,
      type: 'floatingeye',
    }]
  },
  6: {
    enemySpawnInterval: 5,
    enemies: [{
      amount: 3,
      type: 'goblin',
    }, {
      amount: 2,
      type: 'archer',
    }, {
      amount: 1,
      type: 'goblinmage',
    }, {
      amount: 2,
      type: 'floatingeye',
    }]
  },
  7: {
    enemySpawnInterval: 5,
    enemies: [{
      amount: 2,
      type: 'goblin',
    }, {
      amount: 2,
      type: 'archer',
    }, {
      amount: 1,
      type: 'goblinmage',
    }, {
      amount: 2,
      type: 'floatingeye',
    }, {
      amount: 2,
      type: 'goblincannon',
    }, {
      amount: 3,
      type: 'skeleton',
    }]
  },
  // 8: {
  //   enemySpawnInterval: 5,
  //   enemies: [{
  //     amount: 3,
  //     type: 'goblin',
  //   }]
  // },
  // 9: {
  //   enemySpawnInterval: 5,
  //   enemies: [{
  //     amount: 3,
  //     type: 'goblin',
  //   }]
  // },
  // 10: {
  //   enemySpawnInterval: 5,
  //   enemies: [{
  //     amount: 3,
  //     type: 'goblin',
  //   }]
  // },
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

const Background = Sprite({
  x: 0,
  y: 0,
  width: canvas.width,
  height: canvas.height
})

let image = new Image()
image.src = 'assets/background.png'
image.onload = function() {
  // Background.image = image
}

const createScene = () => Scene({
  id: 'main',
  level: 1,
  timeElapsed: 0,
  timeSinceSpawn: 0,
  timeSincePowerup: 0,
  enemies: [],
  projectiles: [],
  powerups: [],
  hitPings: [],
  objects: [Timer, Background, HealthBar, Player, MeterBar],
  render: function() {
    Background.render()
    this.powerups.forEach(obj => obj.render())
    this.enemies.forEach(obj => obj.render())
    this.projectiles.forEach(obj => obj.alive && obj.render())
    if (Player.direction == 'north') {
      !Player.dead && this.shield.render()
      Player.render()
    } else {
      Player.render()
      !Player.dead && this.shield.render()
    }
    this.hitPings.forEach(obj => obj.render())
    Player.meter < 3 && !Player.dead && MeterBar.render()
    HealthBar.render()
    if (toggleHUD) {
      Timer.render()
      this.wave.render()
    }
  },
  onShow: function() {
    HealthBar.reset()
    Player.reset()
    MeterBar.reset()
    if (toggleHUD) {
      Timer.reset()
      this.wave = createWaveDisplay(this)
      this.add(this.wave)
    }
    this.shield = createShield(Player)
    Player.shield = this.shield
    Player.scene = this
    this.add(this.shield)
    this.spawnEnemies()
  },
  update: function(dt) {
    this.timeElapsed += dt
    // If the player has died, let player animation play out then show end screen
    if (this.timeSinceEnded && this.timeSinceEnded > 0) {
      this.timeSinceEnded -= dt

      // If we want everything to freeze around the player
      Player.update(dt)
      HealthBar.update(dt)
      this.shield.update(dt)

      // If we want to have enemies and projectiles continue behavior as normal after death
      // this.objects.forEach((obj) => obj.update(dt))

      if (this.timeSinceEnded <= 0) { showEndScene(false) }
      return
    }
    let newLevel = Math.floor(this.timeElapsed / 15) + 1
    if (newLevel > 7) showEndScene(true)
    if (newLevel > this.level) this.level = newLevel

    // loop through all the projectiles and check for collisions
    this.projectiles.forEach((projectile, i) => {
      if (projectile.alive) {
        for (let x = 0; x < this.enemies.length; x++) {
          // Prevents enemy from hitting themselves instantly and also prevents passthrough damage from same projectile multiple times
          if (collides(this.enemies[x], projectile) && (projectile.reflected || projectile.enemy != this.enemies[x]) && !this.enemies[x].hitByProjectiles.includes(i)) {
            this.damageEnemy(x, i)
          }
          if (collides(this.enemies[x], Player)) {
            // TODO: function that handles this
          }
        }
        if (collides(this.shield.collider, projectile) && !projectile.reflected) {
          if (this.shield.reflect) {
            this.reflectProjectile(i)
          } else {
            this.absorbProjectile(i)
          }
        } else if (collides(Player, projectile)) {
          this.damagePlayer(i)
        } 
      }
    })
    

    // Check that player picked up a powerup
    for (let x = 0; x < this.powerups.length; x++) {
      if (collides(this.powerups[x], Player)) {
        this.gainPowerup(x)
      }
    }

    
    for (let x = 0; x < this.enemies.length; x++) {
      // Check that enemies collide with the player
      // If the shield is reflecting, boop the enemy
      if (Player.boopEnemies && collides(this.enemies[x], this.shield.collider) && (!this.enemies[x].boopTime || this.enemies[x].boopTime < 0)) {
        Player.initialPosition = { x: Player.x, y: Player.y }
        this.enemies[x].initialPosition = { x: this.enemies[x].x, y: this.enemies[x].y }
        this.enemies[x].boopTime = 0.3
      }

      // If the player body is colliding with the enemy body, move it away
      if (collides(this.enemies[x].children[0], Player)) {
        if (Player.x > this.enemies[x].x) {
          this.enemies[x].x -= .5
        } else {
          this.enemies[x].x += .5
        }

        if (Player.y > this.enemies[x].y) {
          this.enemies[x].y -= .5
        } else {
          this.enemies[x].y += .5
        }
      }

      for (let y = 0; y < this.enemies.length; y++) {
        // Check that enemies collide with each other
        if (!this.enemies[x]) break
        if (!this.enemies[y]) continue
        if (x != y && collides(this.enemies[x].children[0], this.enemies[y].children[0])) {
          if (this.enemies[y].x > this.enemies[x].x) {
            this.enemies[x].x -= .5
          } else {
            this.enemies[x].x += .5
          }

          if (this.enemies[y].y > this.enemies[x].y) {
            this.enemies[x].y -= .5
          } else {
            this.enemies[x].y += .5
          }
        }
      }
    }
    Player.boopEnemies = false

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
    enemy.hitByProjectiles.push(projectileIndex)
    if (enemy.health <= 0) {
      if (this.timeSincePowerup >= 20) {
        let powerup = createPowerup(enemy)
        this.powerups.push(powerup)
        this.add(powerup)
        this.timeSincePowerup = 0
      }
      this.enemies.splice(enemyIndex, 1)
      this.remove(enemy)
    } else {
      enemy.opacityFrames = 3
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
    let projectileType = projectile.type
    projectile.alive = false
    this.remove(projectile)
    if (Player.health <= 0) {
      this.timeSinceEnded = 3
      Player.dead = true
      Player.playAnimation('death')
    } else {
      if (projectileType == 'darkmatter' && !Player.shockFrames) {
        Player.shockFrames = 4
      } else {
        Player.opacityFrames = 3
      }
    }
  },
  reflectProjectile: function(projectileIndex) {
    // Reflect the projectile's x and y velocities
    // For now, this will just reverse the dx and dy, but this should be more elaborate later
    let projectile = this.projectiles[projectileIndex]
    if (!projectile.alive || projectile.reflected) return
    projectile.xDelta = -projectile.xDelta
    projectile.yDelta = -projectile.yDelta
    if (Player.perfectFrames > 0) {
      projectile.xDelta = projectile.xDelta * 1.5
      projectile.yDelta = projectile.yDelta * 1.5
    }
    // Increase the shield's energy
    this.shield.energy += 10
    projectile.rotation += degToRad(180)
    projectile.reflected = true
    let hitPing = createHitPing('reflect')
    this.shield.addChild(hitPing)
    this.shield.hitPings.push(hitPing)
    // if (Player.reflectDouble) {
    //   let projectile2 = createProjectile(projectile.x, projectile.y, null, null, projectile.type, projectile.enemy)
    //   let newAngle = projectile.angle + degToRad(90)
    //   projectile2.angle = newAngle
    //   projectile2.xDelta = Math.cos(newAngle) * projectile.speed
    //   projectile2.yDelta = Math.sin(newAngle) * projectile.speed
    //   this.projectiles.push(projectile2)
    //   this.add(projectile2)
    // }
  },
  absorbProjectile: function(projectileIndex) {
    // Delete the projectile
    let projectile = this.projectiles[projectileIndex]
    if (!projectile.alive) return
    // this.projectiles.splice(projectileIndex, 1)
    let hitPing = createHitPing('normal')
    this.shield.addChild(hitPing)
    this.shield.hitPings.push(hitPing)
    projectile.alive = false
    this.remove(projectile)
    // Increase the shield's energy
    this.shield.energy += 10
  },
  spawnEnemies: function() {
    // Spawn a number of enemies depending on the level
    // Choose x segments of the map at random and then spread out the spawns in those segments
    let enemies = levelAttributes[this.level].enemies
    for (let x = 0; x < enemies.length; x++) {
      let { amount, type } = enemies[x]

      for (let y = 0; y < amount; y++) {
        let { xMin, xMax, yMin, yMax } = mapSegments[Math.floor(Math.random() * mapSegments.length)]
        let xValue = Math.floor(Math.random() * (xMax - xMin + 1)) + xMin
        let yValue = Math.floor(Math.random() * (yMax - yMin + 1)) + yMin
        let enemy = createEnemy(xValue, yValue, type, this)
        this.enemies.push(enemy)
        this.add(enemy)
      }
    }
  },
  shootProjectile: function(originX, originY, type, enemy) {
    // Spawn a projectile from an enemy position
    // Called from the enemy's update function
    let projectile = createProjectile(originX, originY, Player.x, Player.y, type, enemy)
    this.projectiles.push(projectile)
    this.add(projectile)
  },
  gainPowerup: function(powerupIndex) {
    let powerup = this.powerups[powerupIndex]
    if (powerup.type == 'speedUp') {
      Player.speed += 0.5
    // } else if (powerup.type == 'reflectUp') {
    //   Player.reflectDouble = true
    // }
    }
    Player.powerUpTime = 10
    this.powerups.splice(powerupIndex, 1)
    this.remove(powerup)
  },
})

export default createScene