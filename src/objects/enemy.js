import { init, Sprite } from '../../lib/kontra.min.mjs'
import Player from '../objects/player.js'

let { canvas } = init()

const enemyAttributes = {
  'goblin': {
    range: 300,
    speed: 1,
    projectileType: 'rock',
    fireInterval: 3,
    health: 1,
  }
}

const createEnemy = (x, y, type, scene) => {
  const { range, speed, projectileType, fireInterval, health } = enemyAttributes[type]
  return Sprite({
    width: 32,
    height: 32,
    x,
    y,
    anchor: { x: 0.5, y: 0.5 },
    range,
    speed,
    timeSinceAttack: 0,
    health,
    facing: null,
    scene,
    fireInterval,
    update: function(dt) {
      this.timeSinceAttack += dt

      // update which way it's facing depending on player position
      if (Player.x > this.x) {
        this.facing = 'right'
      } else {
        this.facing = 'left'
      }
      
      let xDistance = this.x - Player.x
      let yDistance = this.y - Player.y
      let distanceToPlayer = Math.sqrt(xDistance * xDistance + yDistance * yDistance)
      if (distanceToPlayer > this.range || this.timeSinceAttack < this.fireInterval) {
        // move towards the player position if the distance to the player position is greater than its range
        let xDiff = Player.x - this.x
        let yDiff = Player.y - this.y
        let angle = Math.atan2(yDiff, xDiff)
        this.x += Math.cos(angle) * this.speed
        this.y += Math.sin(angle) * this.speed
      } else {
        // otherwise, shoot a projectile towards current player position if timeSinceAttack > fireInterval
        if (this.timeSinceAttack > this.fireInterval) {
          this.scene.shootProjectile(this.x, this.y, projectileType)
          this.timeSinceAttack = 0
        }
      }
      
    }
  })
}

export default createEnemy