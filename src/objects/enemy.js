import { init, Sprite } from '../../lib/kontra.min.mjs'
import Player from '../objects/player.js'

let { canvas } = init()

const enemyAttributes = {
  'goblin': {
    range: 300,
    speed: 1,
    projectileType: 'rock',
    castInterval: 3,
    health: 1,
    castTime: 1,
  },
  'mage': {
    range: 400,
    speed: 2,
    projectileType: 'fireball',
    castInterval: 3,
    health: 2,
    castTime: 2,
  },
  'cannoneer': {
    range: 300,
    speed: 1,
    projectileType: 'cannon',
    castInterval: 4,
    health: 3,
    castTime: 3,
  },
  'floating eye': {
    range: 200,
    speed: 3,
    projectileType: 'darkblast',
    castInterval: 1,
    health: 2,
    castTime: 1,
  },
  'archer': {
    range: 500,
    speed: 3,
    projectileType: 'arrow',
    castInterval: 2,
    health: 1,
    castTime: 1,
  },
  'necromancer': {
    range: null,
    speed: 1,
    projectileType: null,
    castInterval: 5,
    health: 2,
    castTime: 4,
  },
  'skeleton': {
    range: 100,
    speed: 4,
    projectileType: 'bone',
    castInterval: 1,
    health: 1,
    castTime: 0.5,
  },
}

const createCollider = () => Sprite({
  width: 16,
  height: 16,
  anchor: { x: 0.5, y: 0.5 },
  opacity: 0,
  color: 'red',
})

const createEnemy = (x, y, type, scene) => {
  const { range, speed, projectileType, castInterval, health, castTime } = enemyAttributes[type]
  const collider = createCollider()
  return Sprite({
    width: 32,
    height: 32,
    color: 'purple',
    x,
    y,
    anchor: { x: 0.5, y: 0.5 },
    range,
    speed,
    timeSinceAttack: 0,
    attackAnimationTime: 0,
    castTime,
    health,
    facing: null,
    scene,
    castInterval,
    children: [collider],
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
      if ((distanceToPlayer > this.range || this.timeSinceAttack < this.castInterval) && !this.attackAnimationTime) {
        // if the enemy is too close to another, try moving away from it before moving towards the player
        if (this.colliderEnemy) {
          if (this.colliderEnemy.x > this.x) {
            this.x -= 1
          } else {
            this.x += 1
          }

          if (this.colliderEnemy.y > this.y) {
            this.y -= 1
          } else {
            this.y += 1
          }

          this.colliderEnemy = null
        }

        // move towards the player position if the distance to the player position is greater than its range
        let xDiff = Player.x - this.x
        let yDiff = Player.y - this.y
        let angle = Math.atan2(yDiff, xDiff)
        this.x += Math.cos(angle) * this.speed
        this.y += Math.sin(angle) * this.speed
      } else {
        // otherwise, shoot a projectile towards current player position if timeSinceAttack > castInterval
        if (this.timeSinceAttack >= this.castInterval) {
          // start attack
          this.attackAnimationTime += dt
          // once the animation time reaches the point where the character shoots a projectile
          if (this.attackAnimationTime >= this.castTime) {
            let xOffset = this.facing === 'right' ? 24 : -24
            let yOffset = this.y < Player.y ? 24 : -24
            this.scene.shootProjectile(this.x + xOffset, this.y + yOffset, projectileType)
            this.timeSinceAttack = 0
            this.attackAnimationTime = 0
          }
        }
      }
      
    }
  })
}

export default createEnemy