import { degToRad, imageAssets, init, initKeys, keyPressed, onKey, Sprite, SpriteSheet } from '../../lib/kontra.min.mjs'

let { canvas } = init()
initKeys()

const createCollider = () => Sprite({
  width: 48,
  height: 20,
  x: 0,
  y: 0,
  anchor: { x: 0.5, y: 0.5 },
  opacity: 0,
  color: 'red',
  update: function(dt) {
    switch(this.parent.player.direction) {
      case 'east':
        this.x = 0
        this.y = 0
        this.width = 20
        this.height = 48
        break
      case 'south':
        this.x = 0
        this.y = 0
        this.width = 48
        this.height = 20
        break
      case 'west':
        this.x = 0
        this.y = 0
        this.width = 20
        this.height = 48
        break
      default:
        this.x = 0
        this.y = 0
        this.width = 48
        this.height = 20
        break
    }
  }
})

const createBarrier = () => {
  let barrier = Sprite({
    width: 50,
    height: 44,
    x: 0,
    y: 0,
    anchor: { x: 0.5, y: 0.5 },
    update: function(dt) {
      switch(this.parent.player.direction) {
        case 'east':
          this.x = 0
          this.y = 0
          this.width = 44
          this.height = 50
          break
        case 'south':
          this.x = 0
          this.y = 0
          this.width = 50
          this.height = 44
          break
        case 'west':
          this.x = 0
          this.y = 0
          this.width = 44
          this.height = 50
          break
        default:
          this.x = 0
          this.y = 0
          this.width = 50
          this.height = 44
          break
      }

      if (this.parent.reflect) {
        this.playAnimation(this.parent.player.direction)
      } else {
        this.currentAnimation = null
      }
    }
  })

  let image = new Image()
  image.src = 'assets/reflector_shield_honeycomb_held.png'
  image.onload = function() {
    let spriteSheet = SpriteSheet({
      image,
      frameWidth: 50,
      frameHeight: 44,
      animations: {
        west: {
          frames: 2,
        },
        east: {
          frames: 6,
        },
        north: {
          frames: 10,
        },
        south: {
          frames: 14,
        }
      }
    })
    barrier.animations = spriteSheet.animations
    barrier.currentAnimation = null
  }
  return barrier
}

const createShield = (player) => {
  const collider = createCollider()
  const barrier = createBarrier()
  let shield = Sprite({
    width: 48,
    height: 40,
    x: player.x,
    y: player.y - 16,
    anchor: { x: 0.5, y: 0.5 },
    reflect: false,
    energy: 0,
    player,
    children: [collider, barrier],
    update: function(dt) {
      console.log(this.currentAnimation)
      this.currentAnimation && this.currentAnimation.update(dt)
      // change position based on player's direction
      switch(this.player.direction) {
        case 'east':
          this.x = this.player.x + 16
          this.y = this.player.y
          break
        case 'south':
          this.x = this.player.x
          this.y = this.player.y + 16
          break
        case 'west':
          this.x = this.player.x - 16
          this.y = this.player.y
          break
        default:
          this.x = this.player.x
          this.y = this.player.y - 16
          break
      }

      this.children.forEach(obj => obj.update(dt))
    },
    startReflect: function() {
      if (!this.reflect) {
        this.reflect = true
        this.playAnimation(this.player.direction)
      }
    },
    stopReflect: function() {
      this.reflect = false
      this.currentAnimation = null
    }
  })

  let image = new Image()
  image.src = 'assets/reflector_shield_cast.png'
  image.onload = function() {
    let spriteSheet = SpriteSheet({
      image,
      frameWidth: 34,
      frameHeight: 47,
      animations: {
        west: {
          frames: [0, 1, 2, 2, 3, 4],
          frameRate: 30,
          loop: false,
        },
        east: {
          frames: [5, 6, 7, 7, 8, 9],
          frameRate: 30,
          loop: false,
        },
        north: {
          frames: [10, 11, 12, 12, 13, 14],
          frameRate: 30,
          loop: false,
        },
        south: {
          frames: [15, 16, 17, 17, 18, 19],
          frameRate: 30,
          loop: false,
        }
      }
    })
    shield.animations = spriteSheet.animations
    shield.currentAnimation = null
  }
  return shield
}

export default createShield