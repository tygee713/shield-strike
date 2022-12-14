import { init, Sprite, SpriteSheet } from '../../lib/kontra.min.mjs'
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
    afterCastTime: 1/7,
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
        frames: [6, 7, 9, 10, 12, 13, 14, 15],
        frameRate: 7,
      },
      // westAfterAttack: {
      //   frames: 15,
      //   frameRate: 7,
      //   
      // },
      eastWalk: {
        frames: [3, 4, 5, 4],
        frameRate: 10,
      },
      eastIdle: {
        frames: 4,
      },
      eastAttack: {
        frames: [18, 19, 21, 22, 24, 25, 26, 27],
        frameRate: 7,
      },
      // eastAfterAttack: {
      //   frames: 27,
      //   frameRate: 10,
      //   
      // },
    },
  },
  'goblincannon': {
    range: 400,
    speed: 1,
    projectileType: 'cannonball',
    castInterval: 4,
    health: 5,
    castTime: 2,
    afterCastTime: 6/7,
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
        frames: [6, 7, 8, 9, 10, 12, 13, 14, 15, 16],
        frameRate: 7 / 2,
      },
      // westAfterAttack: {
      //   frames: [14, 15, 16],
      //   frameRate: 10,
        
      // },
      eastWalk: {
        frames: [3, 4, 5, 4],
        frameRate: 10,
      },
      eastIdle: {
        frames: 4,
      },
      eastAttack: {
        frames: [18, 19, 20, 21, 22, 24, 25, 26, 27, 28],
        frameRate: 7 / 2,
      },
      // eastAfterAttack: {
      //   frames: [26, 27, 28],
      //   frameRate: 10,
        
      // },
    },
  },
  'goblinmage': {
    range: 500,
    speed: 1.3,
    projectileType: 'fish',
    castInterval: 2,
    health: 3,
    castTime: 2,
    afterCastTime: 1,
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
        frames: [6, 7, 9, 10, 12, 13, 14, 15, 16],
        frameRate: 3,
      },
      // westAfterAttack: {
      //   frames: [13, 14, 15, 16],
      //   frameRate: 10,
        
      // },
      eastWalk: {
        frames: [3, 4, 5, 4],
        frameRate: 10,
      },
      eastIdle: {
        frames: 4,
      },
      eastAttack: {
        frames: [18, 19, 21, 22, 24, 25, 26, 27, 28],
        frameRate: 3,
      },
      // eastAfterAttack: {
      //   frames: [25, 26, 27, 28],
      //   frameRate: 10,
        
      // },
    },
  },
  'floatingeye': {
    range: 500,
    speed: 1.6,
    projectileType: 'darkmatter',
    castInterval: 2,
    health: 4,
    castTime: 1,
    afterCastTime: 3/6,
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
        frames: [6, 7, 9, 10, 12, 13, 14, 15, 16],
        frameRate: 6,
        
      },
      // westAfterAttack: {
      //   frames: [14, 15, 16],
      //   frameRate: 10,
        
      // },
      eastWalk: {
        frames: [3, 4, 5, 4],
        frameRate: 10,
      },
      eastIdle: {
        frames: 4,
      },
      eastAttack: {
        frames: [18, 19, 21, 22, 24, 25, 26, 27, 28],
        frameRate: 6,
        
      },
      // eastAfterAttack: {
      //   frames: [26, 27, 28],
      //   frameRate: 10,
        
      // },
    },
  },
  'archer': {
    range: 500,
    speed: 1.6,
    projectileType: 'arrow',
    castInterval: 1,
    health: 2,
    castTime: 1,
    afterCastTime: 3/5,
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
        frames: [6, 7, 9, 10, 12, 13, 15, 16],
        frameRate: 5,
      },
      // westAfterAttack: {
      //   frames: [13, 15, 16],
      //   frameRate: 10,
      // },
      eastWalk: {
        frames: [3, 4, 5, 4],
        frameRate: 10,
      },
      eastIdle: {
        frames: 4,
      },
      eastAttack: {
        frames: [18, 19, 21, 22, 24, 25, 27, 28],
        frameRate: 5,
        
      },
      // eastAfterAttack: {
      //   frames: [25, 27, 28],
      //   frameRate: 10,
        
      // },
    },
  },
  'skeleton': {
    range: 100,
    speed: 2.1,
    projectileType: 'bone',
    castInterval: 0.5,
    health: 1,
    castTime: 0.5,
    afterCastTime: 0.2,
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
        frames: [6, 7, 9, 10, 12, 13, 15],
        frameRate: 10,
        
      },
      // westAfterAttack: {
      //   frames: [13, 15],
      //   frameRate: 10,
        
      // },
      eastWalk: {
        frames: [3, 4, 5, 4],
        frameRate: 10,
      },
      eastIdle: {
        frames: 4,
      },
      eastAttack: {
        frames: [18, 19, 21, 22, 24, 25, 27],
        frameRate: 10,
        
      },
      // eastAfterAttack: {
      //   frames: [25, 27],
      //   frameRate: 10,
        
      // },
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
  const { range, speed, projectileType, castInterval, health, castTime, afterCastTime, imagePath, width, height, minRange, animations } = enemyAttributes[type]
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
    timeSinceAttack: 0,
    attackAnimationTime: 0,
    castTime,
    afterCastTime,
    health,
    facing: null,
    scene,
    castInterval,
    hitByProjectiles: [],
    children: [collider],
    update: function(dt) {
      this.timeSinceAttack += dt
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
      if ((distanceToPlayer > this.range || (distanceToPlayer > this.minRange && this.timeSinceAttack < this.castInterval)) && !this.attackAnimationTime) {
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
        this.playAnimation(this.facing + 'Walk')
      } else {
        // otherwise, start attack towards current player position if their cooldown is up
        if (this.timeSinceAttack >= this.castInterval) {
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
          
          this.attackAnimationTime += dt
          // once the animation time finishes, the character shoots a projectile
          if (this.attackAnimationTime >= this.castTime) {
            if (!this.attacked) {
              let xOffset = width / 2
              if (this.facing === 'west') xOffset = xOffset * -1
              this.attacked = true
              this.scene.shootProjectile(this.x + xOffset, this.y, projectileType, this)
            } else if (this.attackAnimationTime > this.castTime + this.afterCastTime) {
              this.timeSinceAttack = 0
              this.attackAnimationTime = 0
              this.attacked = false
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