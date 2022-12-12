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
    imagePath: 'assets/goblin.png',
    width: 28,
    height: 34,
    animations: {
      westWalk: {
        frames: [0, 1, 2, 1],
        frameRate: 10,
      },
      westIdle: {
        frames: 1,
      },
      westAttack: {
        frames: [6, 7, 9, 10, 12, 13, 14],
        frameRate: 7,
      },
      westAfterAttack: {
        frames: 15,
      },
      eastWalk: {
        frames: [3, 4, 5, 4],
        frameRate: 10,
      },
      eastIdle: {
        frames: 4,
      },
      eastAttack: {
        frames: [18, 19, 21, 22, 24, 25, 26],
        frameRate: 7,
      },
      eastAfterAttack: {
        frames: 27,
      },
    },
  },
  'goblincannon': {
    range: 400,
    speed: 1,
    projectileType: 'cannonball',
    castInterval: 4,
    health: 5,
    castTime: 2,
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
        frames: [6, 7, 8, 9, 10, 12, 13],
        frameRate: 7 / 2,
      },
      westAfterAttack: {
        frames: [14, 15, 16],
        frameRate: 3,
      },
      eastWalk: {
        frames: [3, 4, 5, 4],
        frameRate: 10,
      },
      eastIdle: {
        frames: 4,
      },
      eastAttack: {
        frames: [18, 19, 20, 21, 22, 24, 25],
        frameRate: 7 / 2,
      },
      eastAfterAttack: {
        frames: [26, 27, 28],
        frameRate: 3,
      },
    },
  },
  'goblinmage': {
    range: 400,
    speed: 1.3,
    projectileType: 'fish',
    castInterval: 2,
    health: 3,
    castTime: 2,
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
        frames: [6, 7, 9, 10, 12],
        frameRate: 5 / 2,
      },
      westAfterAttack: {
        frames: [13, 14, 15, 16],
        frameRate: 4,
      },
      eastWalk: {
        frames: [3, 4, 5, 4],
        frameRate: 10,
      },
      eastIdle: {
        frames: 4,
      },
      eastAttack: {
        frames: [18, 19, 21, 22, 24],
        frameRate: 5 / 2,
      },
      eastAfterAttack: {
        frames: [25, 26, 27, 28],
        frameRate: 4,
      },
    },
  },
  'floatingeye': {
    range: 500,
    speed: 1.6,
    projectileType: 'darkmatter',
    castInterval: 2,
    health: 4,
    castTime: 1,
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
        frames: [6, 7, 9, 10, 12, 13],
        frameRate: 6,
      },
      westAfterAttack: {
        frames: [14, 15, 16],
        frameRate: 3,
      },
      eastWalk: {
        frames: [3, 4, 5, 4],
        frameRate: 10,
      },
      eastIdle: {
        frames: 4,
      },
      eastAttack: {
        frames: [18, 19, 21, 22, 24, 25],
        frameRate: 6,
      },
      eastAfterAttack: {
        frames: [26, 27, 28],
        frameRate: 3,
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
        frames: [6, 7, 9, 10, 12],
        frameRate: 5,
      },
      westAfterAttack: {
        frames: [13, 15, 16],
        frameRate: 3,
      },
      eastWalk: {
        frames: [3, 4, 5, 4],
        frameRate: 10,
      },
      eastIdle: {
        frames: 4,
      },
      eastAttack: {
        frames: [18, 19, 21, 22, 24],
        frameRate: 5,
      },
      eastAfterAttack: {
        frames: [25, 27, 28],
        frameRate: 3,
      },
    },
  },
  'skeleton': {
    range: 100,
    speed: 2.5,
    projectileType: 'bone',
    castInterval: 0.5,
    health: 1,
    castTime: 0.5,
    imagePath: 'assets/skeleton.png',
    width: 28,
    height: 34,
    animations: {
      westWalk: {
        frames: [0, 1, 2, 1],
        frameRate: 10,
      },
      westIdle: {
        frames: 1,
      },
      westAttack: {
        frames: [6, 7, 9, 10, 12],
        frameRate: 10,
      },
      westAfterAttack: {
        frames: [13, 15],
        frameRate: 4,
      },
      eastWalk: {
        frames: [3, 4, 5, 4],
        frameRate: 10,
      },
      eastIdle: {
        frames: 4,
      },
      eastAttack: {
        frames: [18, 19, 21, 22, 24],
        frameRate: 10,
      },
      eastAfterAttack: {
        frames: [25, 27],
        frameRate: 4,
      },
    },
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
  const { range, speed, projectileType, castInterval, health, castTime, imagePath, width, height, animations } = enemyAttributes[type]
  const collider = createCollider()
  let enemy = Sprite({
    width,
    height,
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
        this.playAnimation(this.facing + 'Walk')
      } else {
        // otherwise, shoot a projectile towards current player position if timeSinceAttack > castInterval
        if (this.timeSinceAttack >= this.castInterval) {
          // start attack
          this.playAnimation(this.facing + 'Attack')
          this.attackAnimationTime += dt
          // once the animation time finishes, the character shoots a projectile
          if (this.attackAnimationTime >= this.castTime) {
            this.playAnimation(this.facing + 'AfterAttack')
            let xOffset = width / 2
            if (this.facing === 'west') xOffset = xOffset * -1
            this.scene.shootProjectile(this.x + xOffset, this.y, projectileType, this)
            this.timeSinceAttack = 0
            this.attackAnimationTime = 0
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