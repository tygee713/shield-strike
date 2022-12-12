import { degToRad, init, Sprite, SpriteSheet } from '../../lib/kontra.min.mjs'

let { canvas } = init()

const rotationSpeed = 2

const projectileAttributes = {
  'rock': {
    speed: 2,
    damage: 1,
    imagePath: 'assets/goblin_projectile.png',
    width: 8,
    height: 8,
    passThrough: false,
  },
  'cannonball': {
    speed: 3,
    damage: 3,
    imagePath: 'assets/goblincannon_projectile.png',
    width: 16,
    height: 16,
    passThrough: true,
  },
  'fish': {
    speed: 4,
    damage: 2,
    imagePath: 'assets/goblinmage_projectile.png',
    width: 40,
    height: 22,
    passThrough: false,
    animations: {
      travel: {
        frames: '3..5',
        framerate: 10,
      }
    }
  },
  'darkmatter': {
    speed: 4,
    damage: 2,
    imagePath: 'assets/floatingeye_projectile.png',
    width: 30,
    height: 30,
    passThrough: true,
    animations: {
      travel: {
        frames: '0..1',
        framerate: 10,
      }
    },
    rotate: true,
  },
  'arrow': {
    speed: 4,
    damage: 1,
    imagePath: 'assets/archer_projectile.png',
    width: 24,
    height: 6,
    passThrough: false,
  },
  'bone': {
    speed: 6,
    damage: 1,
    imagePath: 'assets/skeleton_projectile.png',
    width: 10,
    height: 26,
    passThrough: false,
    rotate: true,
  }
}

const createProjectile = (x, y, targetX, targetY, type, enemy) => {
  const { speed, damage, imagePath, width, height, passThrough, animations, rotate } = projectileAttributes[type]

  // Calculate the velocity
  const angle = Math.atan2(targetY - y, targetX - x)
  const xDelta = Math.cos(angle) * speed
  const yDelta = Math.sin(angle) * speed

  let projectile = Sprite({
    width,
    height,
    x,
    y,
    xDelta,
    yDelta,
    damage,
    passThrough,
    alive: true,
    reflected: false,
    rotation: angle,
    rotate,
    enemy,
    anchor: { x: 0.5, y: 0.5 },
    update: function(dt) {
      this.currentAnimation && this.currentAnimation.update(dt)
      this.x += this.xDelta
      this.y += this.yDelta
      if (this.rotate) this.rotation += degToRad(90) * dt * rotationSpeed
    }
  })

  let image = new Image()
  image.src = imagePath
  image.onload = function() {
    if (animations) {
      let spriteSheet = SpriteSheet({
        image,
        frameWidth: width,
        frameHeight: height,
        animations,
      })
      projectile.animations = spriteSheet.animations
      projectile.playAnimation('travel')
    } else {
      projectile.image = image
    }
  }
  return projectile
}

export default createProjectile