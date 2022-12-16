import { angleToTarget, degToRad, init, Sprite, SpriteSheet } from '../../lib/kontra.min.mjs'
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
    afterCastFrames: 2,
    imagePath: 'assets/goblin.png',
    width: 28,
    height: 34,
    minRange: 36,
    animations: {
      westWalk: {
        frames: [0, 1, 2, 1],
        frameRate: 10,
      },
      westIdle: {
        frames: 1,
      },
      westAttack: {
        frames: [6, 7, 9, 10, 9, 10, 9, 10, 9, 10, 12, 13, 14, 15],
        frameRate: 10,
        loop: false,
      },
      eastWalk: {
        frames: [3, 4, 5, 4],
        frameRate: 10,
      },
      eastIdle: {
        frames: 4,
      },
      eastAttack: {
        frames: [18, 19, 21, 22, 21, 22, 21, 22, 21, 22, 24, 25, 26, 27],
        frameRate: 10,
        loop: false,
      },
    },
  },
  'archer': {
    range: 500,
    speed: 1.6,
    projectileType: 'arrow',
    castInterval: 1,
    health: 2,
    castTime: 1,
    afterCastFrames: 2,
    imagePath: 'assets/archer.png',
    width: 42,
    height: 40,
    animations: {
      westWalk: {
        frames: [0, 1, 2, 1],
        frameRate: 10,
      },
      westIdle: {
        frames: 1,
      },
      westAttack: {
        frames: [6, 7, 9, 10, 9, 10, 9, 10, 9, 10, 12, 13, 15, 16],
        frameRate: 10,
        loop: false,
      },
      eastWalk: {
        frames: [3, 4, 5, 4],
        frameRate: 10,
      },
      eastIdle: {
        frames: 4,
      },
      eastAttack: {
        frames: [18, 19, 21, 22, 21, 22, 21, 22, 21, 22, 24, 25, 27, 28],
        frameRate: 10,
        loop: false,
      },
    },
  },
  'goblincannon': {
    range: 400,
    speed: 1,
    projectileType: 'cannonball',
    castInterval: 4,
    health: 5,
    castTime: 1.9,
    afterCastFrames: 3,
    imagePath: 'assets/goblincannon.png',
    width: 48,
    height: 50,
    animations: {
      westWalk: {
        frames: [0, 1, 2, 1],
        frameRate: 10,
      },
      westIdle: {
        frames: 1,
      },
      westAttack: {
        frames: [6, 7, 8, 9, 10, 9, 10, 9, 10, 9, 10, 9, 10, 9, 10, 9, 10, 9, 10, 12, 13, 14, 15, 16],
        frameRate: 10,
        loop: false,
      },
      eastWalk: {
        frames: [3, 4, 5, 4],
        frameRate: 10,
      },
      eastIdle: {
        frames: 4,
      },
      eastAttack: {
        frames: [18, 19, 20, 21, 22, 21, 22, 21, 22, 21, 22, 21, 22, 21, 22, 21, 22, 21, 22, 24, 25, 26, 27, 28],
        frameRate: 10,
        loop: false,
      },
    },
  },
  'goblinmage': {
    range: 500,
    speed: 1.3,
    projectileType: 'fish',
    castInterval: 2,
    health: 3,
    castTime: 1.6,
    afterCastFrames: 3,
    imagePath: 'assets/goblinmage.png',
    width: 50,
    height: 52,
    animations: {
      westWalk: {
        frames: [0, 1, 2, 1],
        frameRate: 10,
      },
      westIdle: {
        frames: 1,
      },
      westAttack: {
        frames: [6, 7, 9, 10, 9, 10, 9, 10, 9, 10, 9, 10, 9, 10, 9, 10, 12, 13, 14, 15, 16],
        frameRate: 10,
        loop: false,
      },
      eastWalk: {
        frames: [3, 4, 5, 4],
        frameRate: 10,
      },
      eastIdle: {
        frames: 4,
      },
      eastAttack: {
        frames: [18, 19, 21, 22, 21, 22, 21, 22, 21, 22, 21, 22, 21, 22, 21, 22, 24, 25, 26, 27, 28],
        frameRate: 10,
        loop: false,
      },
    },
  },
  'floatingeye': {
    range: 500,
    speed: 1.6,
    projectileType: 'darkmatter',
    castInterval: 2,
    health: 4,
    castTime: 1.2,
    afterCastFrames: 3,
    imagePath: 'assets/floatingeye.png',
    width: 30,
    height: 42,
    animations: {
      westWalk: {
        frames: [0, 1, 2, 1],
        frameRate: 10,
      },
      westIdle: {
        frames: 1,
      },
      westAttack: {
        frames: [6, 7, 9, 10, 9, 10, 9, 10, 9, 10, 9, 10, 12, 13, 14, 15, 16],
        frameRate: 10,
        loop: false,
      },
      eastWalk: {
        frames: [3, 4, 5, 4],
        frameRate: 10,
      },
      eastIdle: {
        frames: 4,
      },
      eastAttack: {
        frames: [18, 19, 21, 22, 21, 22, 21, 22, 21, 22, 21, 22, 24, 25, 26, 27, 28],
        frameRate: 10,
        loop: false,
      },
    },
  },
  'skeleton': {
    range: 100,
    speed: 2.1,
    projectileType: 'bone',
    castInterval: 0.5,
    health: 1,
    castTime: 0.6,
    afterCastFrames: 2,
    imagePath: 'assets/skeleton.png',
    width: 28,
    height: 34,
    minRange: 36,
    animations: {
      westWalk: {
        frames: [0, 1, 2, 1],
        frameRate: 10,
      },
      westIdle: {
        frames: 1,
      },
      westAttack: {
        frames: [6, 7, 9, 10, 9, 10, 12, 13, 15],
        frameRate: 10,
        loop: false,
      },
      eastWalk: {
        frames: [3, 4, 5, 4],
        frameRate: 10,
      },
      eastIdle: {
        frames: 4,
      },
      eastAttack: {
        frames: [18, 19, 21, 22, 21, 22, 24, 25, 27],
        frameRate: 10,
        loop: false,
      },
    },
  },
}

const defaultMinRange = 100

const createCollider = () => Sprite({
  width: 16,
  height: 16,
  anchor: { x: 0.5, y: 0.5 },
  opacity: 0,
  color: 'red',
})

const createEnemy = (x, y, type, scene) => {
  const { range, speed, projectileType, castInterval, health, afterCastFrames, imagePath, width, height, minRange, animations } = enemyAttributes[type]
  const collider = createCollider()
  let enemy = Sprite({
    width,
    height,
    x,
    y,
    anchor: { x: 0.5, y: 0.5 },
    range,
    speed,
    minRange: minRange || defaultMinRange,
    timeSinceLastAttack: 0,
    attacking: false,
    afterCastFrames,
    health,
    scene,
    castInterval,
    hitByProjectiles: [],
    children: [collider],
    update: function(dt) {
      if (this.opacityFrames && this.opacityFrames > 0) {
        if (this.opacityFrames > 2 || this.opacityFrames <= 1) {
          this.opacity = .25
        } else {
          this.opacity = .5
        }
        this.opacityFrames -= dt * 12
      } else {
        this.opacity = 1
      }

      // If the enemy is being booped, send them in the opposite direction of the player
      if (this.boopTime && this.boopTime > 0) {
        this.x += Math.cos(angleToTarget(Player.initialPosition, this.initialPosition) - degToRad(90)) * (this.speed + 1)
        this.y += Math.sin(angleToTarget(Player.initialPosition, this.initialPosition) - degToRad(90)) * (this.speed + 1)
        this.boopTime -= dt
        return
      }

      this.timeSinceLastAttack += dt
      this.currentAnimation && this.currentAnimation.update(dt)

      // update which way it's facing depending on player position
      if (Player.x > this.x) {
        this.facing = 'east'
      } else {
        this.facing = 'west'
      }
      
      let xDistance = this.x - Player.x
      let yDistance = this.y - Player.y
      let distanceToPlayer = Math.sqrt(xDistance * xDistance + yDistance * yDistance)
      // if the enemy is too close to the player, do not move
      if ((distanceToPlayer > this.range || (distanceToPlayer > this.minRange && this.timeSinceLastAttack < this.castInterval)) && !this.attacking) {
        // move towards the player position if the distance to the player position is greater than its range
        let xDiff = Player.x - this.x
        let yDiff = Player.y - this.y
        let angle = Math.atan2(yDiff, xDiff)
        this.x += Math.cos(angle) * this.speed
        this.y += Math.sin(angle) * this.speed
        this.playAnimation(this.facing + 'Walk')
      } else {
        // otherwise, start attack towards current player position if their cooldown is up
        if (this.timeSinceLastAttack >= this.castInterval) {
          this.attacking = true
          // set initial direction the attack is facing, in case enemy switches their direction during
          if (!this.attackingDirection) {
            this.attackingDirection = this.facing
            const newAnimation = this.animations[this.attackingDirection + 'Attack'].clone()
            const newAnimationName = this.attackingDirection + 'Attack' + 'Clone'
            this.animations[newAnimationName] = newAnimation
            this.playAnimation(newAnimationName)
          }
          
          if (this.facing !== this.attackingDirection) {
            this.currentAnimation.frames = [...this.animations[this.facing + 'Attack'].frames]
          }

          let lastAnimationFrame = this.currentAnimation.frames.length - 1

          if (this.currentAnimation._f >= lastAnimationFrame - this.afterCastFrames) {
            if (!this.attacked) {
              let xOffset = width / 2
              if (this.facing === 'west') xOffset = xOffset * -1
              this.attacked = true
              this.scene.shootProjectile(this.x + xOffset, this.y, projectileType, this)
            } else if (this.currentAnimation._f == lastAnimationFrame) {
              this.timeSinceLastAttack = 0
              this.attacked = false
              this.attacking = false
              this.attackingDirection = null
            }
          }
        } else {
          this.playAnimation(this.facing + 'Idle')
        }
      }
      
    }
  })

  let image = new Image()
  image.src = imagePath
  image.onload = function() {
    let spriteSheet = SpriteSheet({
      image,
      frameWidth: width,
      frameHeight: height,
      animations,
    })
    enemy.animations = spriteSheet.animations
    enemy.currentAnimation = null
  }
  return enemy
}

export default createEnemy