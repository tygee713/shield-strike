import { degToRad, imageAssets, init, initKeys, keyPressed, onKey, Sprite, SpriteSheet } from '../../lib/kontra.min.mjs'

let { canvas } = init()
initKeys()

const createCollider = () => Sprite({
  width: 40,
  height: 10,
  x: 0,
  y: 0,
  anchor: { x: 0.5, y: 0.5 },
  color: 'red',
  opacity: 0,
  update: function(dt) {
    let size = this.parent.reflect ? 16 : 10
    let distance = this.parent.reflect ? 4 : 0
    switch(this.parent.player.direction) {
      case 'east':
        this.x = distance
        this.y = 0
        this.width = size
        this.height = 40
        break
      case 'south':
        this.x = 0
        this.y = -distance
        this.width = 40
        this.height = size
        break
      case 'west':
        this.x = -distance
        this.y = 0
        this.width = size
        this.height = 40
        break
      default:
        this.x = 0
        this.y = distance
        this.width = 40
        this.height = size
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
          this.x = -4
          this.y = 0
          this.width = 44
          this.height = 50
          break
        case 'south':
          this.x = 0
          this.y = -12
          this.width = 50
          this.height = 44
          break
        case 'west':
          this.x = 4
          this.y = 0
          this.width = 44
          this.height = 50
          break
        default:
          this.x = 0
          this.y = 12
          this.width = 50
          this.height = 44
          break
      }

      this.currentAnimation && this.currentAnimation.update(dt)

      // if (this.parent.reflect && !this.currentAnimation) {
      //   this.playAnimation(this.parent.player.direction)
      // } else {
      //   this.currentAnimation = null
      // }
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
          frames: [28, 29, 30, 31, 2],
          frameRate: 10,
          loop: false,
        },
        westHeld: {
          frames: 2,
          frameRate: 10,
          loop: false,
        },
        east: {
          frames: [24, 25, 26, 27, 6],
          frameRate: 10,
          loop: false,
        },
        eastHeld: {
          frames: 6,
          frameRate: 10,
          loop: false,
        },
        north: {
          frames: [16, 17, 18, 19, 10],
          frameRate: 10,
          loop: false,
        },
        northHeld: {
          frames: 10,
          frameRate: 10,
          loop: false,
        },
        south: {
          frames: [20, 21, 22, 23, 14],
          frameRate: 10,
          loop: false,
        },
        southHeld: {
          frames: 14,
          frameRate: 10,
          loop: false,
        },
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
    collider,
    barrier,
    hitPings: [],
    children: [collider, barrier],
    update: function(dt) {
      // this.currentAnimation && this.currentAnimation.update(dt)
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
      if (this.direction !== this.player.direction && this.reflect) {
        this.changeReflect()
      }
      this.hitPings.forEach((obj, i) => {
        if (!obj.alive) {
          this.removeChild(obj)
          this.hitPings.splice(i, 1)
        }
      })

      this.children.forEach(obj => obj.update(dt))
    },
    startReflect: function() {
      this.barrier.playAnimation(this.player.direction)
      this.direction = this.player.direction
      this.reflect = true
    },
    changeReflect: function() {
      this.barrier.playAnimation(this.player.direction + 'Held')
      this.direction = this.player.direction
    },
    stopReflect: function() {
      this.reflect = false
      this.barrier.currentAnimation = null
    }
  })

  // let image = new Image()
  // image.src = 'assets/reflector_shield_cast.png'
  // image.onload = function() {
  //   let spriteSheet = SpriteSheet({
  //     image,
  //     frameWidth: 34,
  //     frameHeight: 47,
  //     animations: {
  //       west: {
  //         frames: [0, 1, 2, 2, 3, 4],
  //         frameRate: 30,
  //         loop: false,
  //       },
  //       east: {
  //         frames: [5, 6, 7, 7, 8, 9],
  //         frameRate: 30,
  //         loop: false,
  //       },
  //       north: {
  //         frames: [10, 11, 12, 12, 13, 14],
  //         frameRate: 30,
  //         loop: false,
  //       },
  //       south: {
  //         frames: [15, 16, 17, 17, 18, 19],
  //         frameRate: 30,
  //         loop: false,
  //       }
  //     }
  //   })
  //   shield.animations = spriteSheet.animations
  //   shield.currentAnimation = null
  // }
  return shield
}

export default createShield